# Release 2 D5 numerical-contract decision candidate — independent adversarial review

## Review type

This is an independent adversarial review of a non-authoritative R2-D5 decision
candidate. Review the exact target commit and its relationship to the previously
reviewed operation-stage support candidate. Do not redesign the whole paired-t
surface or repeat the primary-source investigations unless this increment makes a
claim that cannot honestly remain a candidate without renewed research.

Report in Japanese. Preserve exact paths, identifiers, hashes, and English literals
where needed.

## Exact target

- Repository: `licklider-ai/nomue-protocol`
- Base commit: `1359247e839a407d10ef0d04ba2e0b91feaa121c`
- Review target: `0e7af1837fcc4a8e7c67693c8745f8c4887a3391`
- Expected delta: exactly 12 files, `+785/-26`
- Target status: non-authoritative candidate development only
- Public review: issue #25 remains the governing open review

The temporary review package is transport, not part of the review target. Establish
identity from `repository.gitbundle`, `repository/`, `REPOSITORY-COMMIT.txt`, and
`BASE-COMMIT.txt`. Do not review a later transport commit or nearby branch state as a
substitute.

## Identity checks — do these first

1. Verify the outer ZIP against its adjacent `.sha256` file.
2. Verify every entry in `MANIFEST.sha256`.
3. Reject duplicate, absolute, parent-traversal, symlink, or undeclared ZIP entries.
4. Confirm `repository.gitbundle` resolves the exact target and base commits.
5. Confirm the extracted target tree is byte-identical to `repository/`.
6. Confirm the base-to-target delta is exactly the declared 12 files and line count.

If identity cannot be established, stop and return NO-GO.

## Scope and known boundaries

This increment:

- adds a machine-readable numerical-contract decision checkpoint;
- records a research-handoff adjudication without linking to or depending on a
  private product repository;
- selects exact binary64 bit identity for candidate operation-graph reproduction;
- implements a target-format classifier for a normal-only p-value policy candidate;
- records `df = 200` only as an evidence-evaluation target;
- selects a rigorously stopped positive-term series as a development direction, not
  as a complete runtime operation graph; and
- leaves support, issuance, final reason codes, table closure, platform closure,
  mathematical-truth bounds, and runtime activation open.

The three external research handoffs are not bundled as Protocol dependencies. The
target explicitly says an unreproduced claim cannot close R2-D5. Judge whether that
boundary is truthful and mechanically enforced. Do not treat absence of the external
reports as evidence closure.

PR #29's operation-stage predicates and first-failure behavior are the reviewed
baseline. This increment intentionally does not add a sample-variance subnormal
runtime refusal because that would reorder the existing standard-error-squared-
underflow witness.

## Review questions

### A. Authority and maturity boundary

Attack every status-bearing field and surrounding prose. Verify that no target file:

- freezes the numerical contract;
- issues a Requirement ID, Protocol identifier, Public Check, or bundle;
- claims a supported df maximum or supported domain;
- claims the `df = 200` evaluation target is contiguous runtime support;
- claims the nine-cell research seed is a complete critical-value table;
- claims the Student-t runtime series graph or branch boundary is complete;
- claims mathematical accuracy merely from exact bit reproduction;
- claims cross-runtime closure merely from native square root; or
- treats private product material as Protocol authority or a build dependency.

Mutate the status, closure, df, support, tolerance, private-dependency, and held-
decision fields. The validators should fail closed.

### B. Three-ledger separation

Check that the target consistently separates:

1. exact reproduction of the pinned binary64 graph;
2. error relative to the mathematical target; and
3. target-format projection of a positive probability.

Try to find wording or code that lets one ledger discharge another. In particular,
verify that fixture bit identity is not called a truth guarantee, an oracle enclosure
is not called proof of graph execution, and format classification is not called a
correct-rounding proof.

### C. Exact binary64 comparison helper

Review `tooling/src/spikes/paired-t-numerical-contract-candidate.ts` and its tests.
Attack at least:

- equal values and adjacent binary64 values;
- `+0` versus `-0`;
- NaN and both infinities;
- minimum subnormal, maximum subnormal, minimum normal, and maximum finite;
- decimal spellings that parse to the same binary64 value;
- values that are numerically close but bit-distinct; and
- object or checkpoint mutations that introduce a hidden tolerance.

Determine whether exact bit identity is correctly scoped to graph reproduction after
strict JSON parsing. Check that the helper neither defines an accuracy tolerance nor
silently accepts negative zero.

### D. Probability projection classifier

Attack `classifyCandidateProbabilityProjection` at and around:

- `-0` and `+0`;
- `Number.MIN_VALUE`;
- the largest subnormal;
- `2^-1022` and its adjacent values;
- ordinary probabilities;
- the binary64 values adjacent to `1`;
- values below zero, above one, NaN, and infinities.

Verify that the six classifications are disjoint and exhaustive for binary64 input.
Check that the classifier does not clamp, substitute, or claim to establish correct
rounding. Check that normal-only remains a non-runtime policy candidate.

### E. Research adjudication fidelity

Verify the internal disposition, not the unbundled primary research itself:

- exact graph reproduction is selected while truth bounds remain open;
- positive-term series is only a family direction;
- host `atan`, `2 * (1 - CDF)`, cross-library majority, an unbounded continued
  fraction, generic ULP tolerance, zero clamping, minimum-subnormal substitution,
  and blanket subnormal refusal are not silently reintroduced;
- `40 * df + 64` is an evaluation-cap candidate, not a support or resource promise;
- `df = 200` is not a supported maximum;
- `kappa` remains diagnostic;
- subnormal first-failure ordering remains held; and
- confidence-interval sign stability and the platform matrix remain open.

Flag any external finding that is phrased as closed Protocol evidence even though
`protocol_reproduction_state` is `partial`.

### F. Cross-artifact binding and regression

Verify that:

- `evidence-readiness.json`, `numerical-contract-candidate.json`, the two validators,
  tests, numerical README, root candidate README, adjudication, and steward package
  agree;
- one-sided edits to the artifact, readiness link, df target, projection policy,
  held decisions, or rejected directions are detected;
- PR #29's active predicate order, boundary corpus, and spike outcomes are unchanged;
- authority, registries, schemas, conformance, spec, reference verifier, and generated
  output have no target diff;
- Release 1 history and exact dispatch remain unchanged; and
- the private-dependency and language audits pass.

From a clean target checkout run the ordinary full command first:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
git status --porcelain
```

If the sandbox alone blocks the `tsx` IPC socket with `EPERM`, record that exact
environment failure and rerun each TypeScript entry through `node --import tsx`.
Do not use that fallback for a code or test failure.

## Adversarial expectations

Create independent probes rather than relying only on included unit tests. At
minimum include:

- checkpoint mutations for every maturity and held-decision boundary;
- binary64 bit-pattern boundary probes;
- all probability-projection classes and adjacent-cell probes;
- cross-artifact mismatch probes; and
- a before/after comparison of the PR #29 support predicate order and boundary
  corpus behavior.

Do not treat a passing build as sufficient for GO.

## Severity and verdict

- **BLOCKER** — authority or support is claimed prematurely; the three ledgers are
  materially conflated; identity fails; exact comparison or projection silently
  accepts a forbidden class; Release 1 behavior changes.
- **SHOULD-FIX** — a meaningful fail-closed, cross-artifact binding, evidence-scope,
  or first-failure defect that should close before the next runtime-series increment.
- **NICE-TO-HAVE** — a local improvement with no effect on truthfulness, authority,
  executable classification, or next-step safety.

Return one verdict:

- **GO** — keep as candidate and proceed to the runtime-series/evidence increment;
- **GO WITH REPAIRS** — keep as draft but repair named findings before proceeding;
- **NO-GO** — do not proceed until blockers are closed.

## Required report structure

1. Identity checks
2. Verdict
3. Findings with exact path, reproducer, actual/expected result, impact, and smallest
   repair
4. Closure table for A–F
5. Reproduced commands and observed results
6. Mutation and boundary-probe ledger
7. Confirmed non-findings, especially attacked authority and first-failure boundaries
8. External research requirement: `none` unless a precise unresolved claim truly
   requires reopening
9. Workspace cleanup confirmation

Avoid generic polish advice and do not redesign the final numerical contract merely
because this increment deliberately remains partial.
