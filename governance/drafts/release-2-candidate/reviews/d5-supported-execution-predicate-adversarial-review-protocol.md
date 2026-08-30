# R2-D5 supported-execution predicate candidate adversarial review protocol

## Commission

Perform an independent, adversarial, delta-scoped review of the Release 2 paired-t
supported-execution predicate candidate. The review target is the implementation
commit identified below. The review must decide whether that exact commit may remain
in the repository as non-authoritative R2-D5 decision-preparation material.

This is not a review of a selected supported-execution predicate, a supported
runtime or platform, an enforced process profile, a selected resource bound, a
supported df range, or Release 2 publication. A `GO` permits merge only while every
support, platform, profile-enforcement, matrix-completion, and authority claim
remains false.

## Independence and source boundary

The reviewer must be independent of the implementation authoring context and must
work from a genuine fresh clone. Do not use a private repository, private package,
unpublished implementation, or author-only scratch artifact. Repository tests may
be used as regression evidence, but every decision-bearing claim below also
requires reviewer-owned code, an independently derived oracle, or direct inspection.

Read the closed primary-source research and its independent role results before
reviewing the implementation. The review must test whether the implementation
faithfully realizes the bounded research disposition; it must not treat that
research as proof that this implementation is correct. No new platform or numerical
premise may be inferred from a successful finite corpus.

## Exact review target

- Implementation commit:
  `cb4bfbc9417d0b837972acf7c2c45c6e54d888e1`
- Implementation tree:
  `bf652f8e256aee71b0bdf5e926741ef864c21165`
- Sole parent / baseline:
  `43e02f366982fc7a8e1e5774235584e9755abb46`
- Baseline tree:
  `2f4da1b8283dce61dc4bcdaf167bbda48759bac6`
- Baseline identity: merge of PR #51
- Expected implementation delta: exactly 11 paths, 3,312 insertions, 15 deletions

The public review-input commit will add only this protocol to the implementation
commit. Record both commits, both trees, their parent relationship, and the exact
delta before reviewing semantics. A mismatch is a blocker.

The implementation paths are:

1. `.github/workflows/ci.yml`
2. `governance/drafts/release-2-candidate/README.md`
3. `governance/drafts/release-2-candidate/numerical/README.md`
4. `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`
5. `governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json`
6. `governance/drafts/release-2-steward-ratification-package.md`
7. `tooling/r2-paired-t-runtime-series/README.md`
8. `tooling/src/spikes/paired-t-numerical-readiness.ts`
9. `tooling/src/spikes/paired-t-supported-execution-candidate.ts`
10. `tooling/tests/paired-t-numerical-readiness.test.ts`
11. `tooling/tests/paired-t-supported-execution-candidate.test.ts`

Confirm separately that the following reviewed evidence-bound implementation
sources are byte-identical to the baseline:

- `tooling/src/spikes/paired-t-runtime-series-candidate.ts`;
- `tooling/src/spikes/paired-t-truth-error-support-candidate.ts`; and
- the reviewed inverse-beta table and evidence bundle bytes.

## Required repository context

Read at least:

- `AGENTS.md`;
- `CHARTER.md`;
- `AUTHORITY.md`;
- `governance/RFC.md`;
- `governance/ID-POLICY.md`;
- `governance/drafts/release-2-foundation-and-paired-t-rfc.md`;
- `governance/drafts/release-2-steward-ratification-package.md`;
- `governance/drafts/release-2-candidate/numerical/README.md`;
- `governance/drafts/release-2-candidate/numerical/evidence-readiness.json`;
- `governance/drafts/release-2-candidate/numerical/supported-execution-predicate-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/runtime-input-reason-code-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/support-domain-candidate.json`;
- `governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json`;
- `governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-commission.md`;
- `governance/drafts/release-2-candidate/reviews/d5-supported-platform-primary-source-research-disposition.md`;
- all independent research results under
  `review-inputs/r2-d5-supported-platform-primary-source-research/`;
- `review-inputs/r2-d5-runtime-input-reason-code-candidate/REVIEW-RESULT.md`;
- `reference/spikes/paired-t.ts`;
- the unchanged reviewed runtime-series and truth-error sources; and
- all changed implementation and test files.

Confirm that public RFC issue #25 remains open. Its state does not authorize support
or issuance during this review.

## Review questions

### A. Exact binary64 primitive verification

Write a reviewer-owned exact verifier that does not call
`validatePairedTBinary64PrimitiveCandidate`, its private helpers, or the candidate's
rounding implementation. Use exact integers or rationals to verify the candidate's
accepted `add`, `subtract`, `multiply`, and `divide` results under binary64
roundTiesToEven.

Exercise, at minimum:

- positive and negative normal operands across exponent ranges;
- exact, inexact, halfway, just-below-halfway, and just-above-halfway results;
- cancellation to positive and negative zero;
- minimum subnormal, subnormal/normal transition, and gradual underflow;
- largest finite results, overflow to both infinities, and finite results adjacent
  to the overflow boundary;
- every sign combination;
- division by zero, zero divided by finite values, infinity, and NaN refusal
  boundaries; and
- a large deterministic or reproducibly seeded broad corpus for each operation.

Independently verify square roots by proving strict containment in the correct
binary64 rounding cell. Include zero, negative zero, exact squares, adjacent values,
subnormals, the normal/subnormal boundary, odd and even significands, halfway-cell
boundaries, and values near the largest finite result. Do not use `Math.sqrt` as the
sole oracle. Confirm that selectors for absolute value and maximum preserve the
specified exact bit identity, including signed zero.

Any incorrectly accepted primitive, incorrectly rejected valid primitive, hidden
dependency on the execution result being checked, uncaught exception, or rounding
mode other than roundTiesToEven is a blocker.

### B. Actual-trace completeness and immutability

Independently derive the only permitted trace schedule for each branch and iteration
count. Verify that the returned p-value and the proof input are both reconstructed
from one actual trace, not from a second replay whose final bits merely agree.

Confirm that the trace binds:

- input Number bit patterns;
- exact critical-table identity, cell, and content hash;
- runtime identity and controlled-profile candidate key;
- branch, iteration count, cap, and returned p-value bits;
- every operation's unique ordered label, operation kind, operand bits, and result
  bits;
- the square-root count and proof gamma indices;
- exact truncation and total relative-error bound numerators and denominators; and
- the complete trace digest.

Verify that the trace object, node array, nodes, and proof input cannot be changed
after construction through ordinary mutation. Recompute the digest independently
from the documented byte grammar.

Build coherent attacks that recompute the digest and all directly dependent fields.
At minimum try an omitted node, duplicated node, reordered pair, duplicate label,
renamed label, changed operation, changed operand, changed result, changed table
cell, changed source binding, changed branch, changed iteration count, changed cap,
changed proof index, changed exact proof fraction, and changed returned value.
Include a graph/proof-divergence attack in which the final p-value bits remain equal
but an intermediate path or proof input differs. Every mutation must fail for the
intended reason; an unrelated stale digest failure is not sufficient evidence.

### C. Schedule and proof reconstruction

Inspect every schedule-construction branch. Independently show that the verifier
reconstructs the closed schedule from branch and iteration count and does not trust
the trace to declare its own schedule.

For central and tail branches, odd and even df, df 1 and 2 closed forms, zero and
subnormal projections, and long series, verify independently that:

- operation order matches the previously reviewed graph exactly;
- integer control arithmetic is outside the binary64 roundoff ledger only where it
  is exact safe-integer or BigInt control arithmetic;
- the proof gamma indices and series-remainder multiplier follow from the executed
  schedule;
- the exact proof fractions are recomputed rather than trusted; and
- no successful trace can contain an unverified floating-point result.

Attempt false early termination, one extra iteration, cap/iteration disagreement,
branch-boundary substitution, and a trace that contains individually valid
operations in an invalid graph order. All must fail closed.

### D. Graph, proof, and evidence invariance

Use a reviewer-owned corpus to compare the implementation commit with its parent and
with the unchanged reviewed sources. Exercise every integer df from 1 through 200
and include, at minimum:

- positive and negative zero;
- the two adjacent binary64 values around `|t| = 1` and exactly `1`;
- minimum subnormal and minimum normal values;
- central and tail values on both sides of each branch boundary;
- df 1 and 2 closed forms;
- odd and even df;
- the longest-series neighborhood;
- `t = 20`, the pinned `df = 197, t = 50.4` witness, and maximum finite input; and
- refusal inputs at every closed input-contract and graph boundary.

Require exact equality for the existing graph result and truth-error proof:
classification, branch, p-value bits, iteration count, cap, proof values, projection
margin, normalization metadata, and refusal classification. The new trace-derived
accepted result must match those reviewed values bit for bit.

Confirm that the inverse-beta table hash, fixed-95 evidence, runtime-table
checkpoint, truth-error checkpoint, runtime-input reason-code checkpoint, evidence
manifests, and authority snapshot are unchanged. Any unreviewed numerical change is
a blocker.

### E. Diagnostics and hostile runtime objects

Verify the startup and pre/post-invocation diagnostics directly. Confirm that their
role is diagnostic only and that trace verification remains necessary even when all
sentinels pass.

At minimum test:

- each hard-coded ordinary-operation and square-root vector;
- negative-zero behavior;
- intrinsic and runtime identity binding;
- replacement of `Math.sqrt` after startup and between pre/post checks;
- mutated, missing, or unexpected runtime identity fields;
- getters, setters, inherited properties, symbols, cycles, and throwing proxies in
  all public candidate and checkpoint inputs; and
- exceptions attempted from `ownKeys`, descriptor, prototype, and value access.

No hostile object may invoke an accessor, escape an uncaught exception, or produce a
support claim. A diagnostic failure must refuse the candidate evaluation before any
success-like disposition is returned.

### F. Resource exhaustion and bounded evaluation

Independently measure trace-node growth over the evidence df range and adversarial
inputs, including the longest-series neighborhood. Test the review-only lower-limit
entrypoint immediately below and above actual node counts. Verify exact boundary
behavior at zero, one, the required count, 100,000, and invalid limits.

Attempt oversized arrays, oversized decimal proof fields, extreme iteration counts,
and traces constructed to exhaust parsing, hashing, exact arithmetic, or schedule
reconstruction. These must fail deterministically without a support claim or an
uncaught exception.

The value 100,000 is only the candidate's evaluation ceiling. The review must reject
any document or result that treats it as a selected supported resource bound. A
`GO` does not select that limit.

### G. Runtime allowlist and controlled-process profile

Verify that the exact runtime/build/platform allowlist is empty and unselected. A
reported Node, V8, OS, architecture, executable, or build identity must not establish
support by itself.

Review the proposed
`paired-t-tail-pure-js-single-invocation-profile-1` contract. Confirm that it
truthfully excludes unreviewed native addons, WASI, worker threads, user callbacks
during evaluation, and runtime intrinsic replacement, while stating that this
candidate does not enforce those exclusions. Attempt to promote the profile to
enforced, populate the allowlist, or infer platform support from current-process
metadata; each mutation must fail checkpoint and readiness validation.

The review must not infer coverage of the upstream G4 data-to-statistic graph. This
candidate is tail-only.

### H. Cross-platform admission evidence and CI

Inspect the CI delta and execute the focused test on every available proposed runner.
Record exact Node, V8, OS, architecture, runner-image, and commit identities. At
minimum evaluate the repository's declared Node 22/24 Linux x64 jobs and the added
Node 22 Windows x64, macOS arm64, and Linux arm64 jobs.

For each runner, retain the exact trace identities and digests for a corpus that
includes cold and repeatedly optimized paths, every df, branch boundaries,
subnormal/zero behavior, the long-series neighborhood, and the high-error witness.
Compare bytes across runners.

Green CI is admission evidence for the tested tuples only. It is not universal
proof, does not complete the matrix, does not populate the allowlist, and does not
select a supported platform. A runner that did not execute the focused test is not
covered.

### I. Checkpoint, readiness, and authority attacks

Build a reviewer-owned coherent mutation harness for the supported-execution
checkpoint and numerical-readiness document. At minimum mutate:

- every top-level field and every nested field;
- trace format, binding description, table hash, diagnostic vector, and proof role;
- exact-verifier methods and acceptance role;
- the allowlist and current-process-identity disposition;
- controlled-profile exclusions and enforcement state;
- implementation, review, resource, allowlist, profile, matrix, and public-code
  closure conditions;
- historical-blocker transition and superseding conditions;
- support, platform, predicate-selection, issuance, Public Check, bundle, R2-D5,
  and Release 2 claims; and
- unknown, missing, inherited, accessor, symbol, non-JSON, cyclic, and throwing-proxy
  fields.

Every real mutation must be rejected with deterministic nonempty errors and without
an uncaught exception. An unchanged deep copy must pass. Do not count a rejection
caused only by a malformed mutation harness.

Confirm that no authoritative registry, normative specification, schema,
conformance expectation, generated authority view, Release 1 path, reference
verifier dispatch, supported df maximum, public reason code, Public Check, or bundle
changes. Recompute the authority snapshot hash. Public RFC issue #25 must remain
open.

### J. Documentation truthfulness

Documentation must distinguish all of the following:

1. exact verification of the candidate's actual tail execution;
2. diagnostic sentinels;
3. a drafted but unenforced controlled-process profile;
4. an empty, unselected exact runtime allowlist;
5. incomplete cross-platform admission evidence;
6. an unselected trace resource bound;
7. the tail-only scope and excluded upstream G4 graph; and
8. an unissued, non-authoritative candidate with runtime support disabled.

Flag any wording that calls the candidate a supported execution, supported platform,
complete matrix, final predicate, or Release 2 completion. The research disposition
authorizes implementation and review only.

## Required regression execution

In the fresh clone, record Node, V8, pnpm, Python, OS, and architecture identities
and run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Also run the focused supported-execution and numerical-readiness tests, the complete
paired-t spike suite, and the repository evidence regeneration and validation paths.
If the ordinary command is blocked by a reviewer-environment IPC restriction, record
the exact error and run every underlying entrypoint through an equivalent non-IPC
invocation. Repository failures unrelated to the environment are findings.

The final checkout must be clean.

## Verdict rule

Return `GO` only if:

- identity and the 11-path implementation delta are exact;
- every accepted primitive result is independently proved correctly rounded;
- the actual returned value and proof input come from one complete, immutable,
  closed-schedule trace;
- coherent trace, proof, diagnostic, resource, and hostile-object attacks fail
  closed without exceptions;
- reviewed graph, proof, table, evidence, and authority bytes remain invariant;
- the allowlist remains empty, the process profile remains unenforced, matrix
  evidence remains incomplete, and no resource bound is selected;
- all support, platform, authority, Public Check, bundle, and Release 2 claims remain
  false; and
- the full repository checks pass.

Return `NO-GO` for any incorrectly rounded accepted operation, unverified operation,
trace omission or reorder accepted after coherent rebinding, proof/value divergence,
behavior regression, accessor execution, uncaught exception, resource-limit bypass,
platform or profile overclaim, matrix overclaim, authority leak, unexpected delta,
or failed regression.

## Required report and disposition

Publish `review-inputs/r2-d5-supported-execution-predicate/REVIEW-RESULT.md` on a
reviewer branch based on the public review-input commit. Record:

- exact identities and environment;
- reviewer separation and any shared-library limitations;
- all independently derived oracles and corpus seeds;
- trace and checkpoint mutation counts, controls, and exact outcomes;
- per-runner evidence and any unavailable runner;
- every finding by severity;
- residual limitations; and
- one verdict: `GO` or `NO-GO`.

A `GO` means only that the exact implementation commit may be merged as an unissued,
non-authoritative supported-execution predicate candidate. It does not approve a
runtime allowlist, enforce a controlled-process profile, select the 100,000-node
ceiling as a resource bound, complete cross-platform admission, claim a supported
platform or domain, issue a reason code, authorize Public Check or bundle behavior,
complete R2-D5, or publish Release 2.
