# Bounded tail-checker repair review

Date: 2026-09-11. Verdict: no blocking defect found in the bounded repair.
The seven observations in the external receipt are addressed for the stated
fixed-corpus recomputation contract. This is a limited code/evidence close
review, not a scientific Research Gate decision, production approval, or adapter
review. No public domain or comparison rule is established here.

## Immutable target and provenance

- Reviewed commit: `bc1c1ace426d51e55c9551090f6e400af2ac17d2`.
- Reviewed tree: `586642e968fcc71ab4be930c2124c17a1149c8a8`.
- Repair delta parent: `431b0e7e30d9b8fe6f097f2a00f19124e4a880d0`.
- Accountable role in this record: bounded repair review worker, commissioned
  by the management session. The worker inspected code and wrote the additional
  tests and this report with OpenAI Codex assistance.
- Model disclosure: the worker's exposed system identifies it as a GPT-based
  Codex agent; an exact model variant is not exposed to this worker. No distinct
  model identity or separate-model eligibility is asserted.
- Execution: separate detached Git worktree, shared runtime and object store with
  the manager. Python 3.12.14, Linux x86_64, glibc 2.39; exact environment is in
  the result files. This worker did not author the target repair, but received
  the manager's commission and inspected author reports and the external receipt.
  It is not an external human reviewer or authenticated independent investigator.
- The prior user-supplied external report has no supplied model identity. This
  review does not infer one or authenticate its observations.

Inputs inspected include repository AGENTS and its read-first governance
materials; the repaired REPORT, EXTERNAL-REVIEW, VALIDATION, INPUTS, RESULTS,
checker and regression; the fixed candidate, oracle and old checker; and the
repair diff. No applicable directory-local AGENTS exists for this output.
The review reuses the bounded mathematical derivations and hash-pinned oracle;
it does not reread primary scientific sources or independently establish the
F-law theorem. Model context and shared integer/Fraction/runtime foundations
limit independence. No subagents were used by this review worker.

## Observation dispositions

| Observation                                  | Review result                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fixed enclosure versus mathematical truth    | Closed within bounded scope. REPORT explicitly describes conservative rejection. Author's 384-bit and review's 512-bit oracle-refined enclosures are rejected because they miss the prescribed candidate enclosure. That is policy behavior, not evidence that those tighter intervals exclude truth. O2's singleton exclusion remains separately checked against a tighter oracle lower bound. |
| JSON numeric overflow                        | Closed. The finite `parse_float` hook rejects `1e999`; extra probes reject negative overflow and signed `1.8e308` inside nested structures with the exact reason. The largest finite binary64 still parses.                                                                                                                                                                                     |
| Decimal defaults and traps                   | Closed. All Context constructor fields are explicit. Additional cold-cache testing simultaneously changes precision, rounding, exponent limits, capitals, clamp, every trap and every flag in DefaultContext and the active context. Targets and row checking remain unchanged.                                                                                                                 |
| Wrong exception or reason counted as success | Closed for the regression. The revised helper catches ValueError and checks exact text. Additional tests require the concrete ValueError class and exact reason for 23 rejection cases; unrelated exceptions are not swallowed.                                                                                                                                                                 |
| Literal outcome counters                     | Closed. Original/equivalent counts derive from completed checker calls; wider acceptance is recorded after checking; survivor and rejection counts derive from executed lists; O2 exclusion is an evaluated predicate. The corpus size remains a deliberate fixed input assertion.                                                                                                              |
| Missing recomputation overlap guard          | Closed. It runs before submitted evidence interpretation. All original rows pass it. Controlled target-function fault injection produces the exact `recomputed intervals disjoint` rejection; this simulates a trusted implementation inconsistency, not an untrusted packet capability.                                                                                                        |
| Environment-sensitive replay output          | Closed as documentation. REPORT says replay rewrites Python/platform metadata and can dirty the worktree. In this environment the rerun was byte-identical to the committed result, so differing-environment dirtiness was not directly demonstrated.                                                                                                                                           |

## Executed checks

The original regression passed: 220 original rows, 220 equivalent encodings,
one widened row, and 41 rejected cases with expected messages. All five O1
mutations and the O2 singleton survived the old checker and were rejected by
the successor. The O2 exclusion predicate evaluated true. Results were copied
to `author-regression-rerun.json`; the historical file remains unchanged.

The file entry point independently returned 220 checked rows. Additional
`test_review.py` probes passed 28 recorded cases, including 23 exact-message
rejections. Besides the observation-specific checks above, they cover null
values for all 13 evidence fields, acceptance of a conservative Decimal error
upper bound, nested duplicate keys and nonfinite constants. The additional
script recomputes the complete original corpus before its targeted probes.
Its expectations come from the documented contract and algebraic enclosure
conditions; it does not fabricate numeric truth from the candidate.

Reproduce from the repository root with the standard library:

```sh
PYTHONDONTWRITEBYTECODE=1 python governance/drafts/release-4-preparation/tail-checker-20260911/test_check.py
PYTHONDONTWRITEBYTECODE=1 python governance/drafts/release-4-preparation/tail-checker-20260911/check.py
PYTHONDONTWRITEBYTECODE=1 python review-inputs/r4-tail-checker-bc1c1ac/test_review.py
```

The first command rewrites the historical regression result as documented by
its author; preserve or compare that output before restoring it. The last
command writes only this review directory's `extra-results.json`.

## Remaining boundaries

No new blocking finding. JSON underflow such as `1e-999` becomes finite zero at
the parser level; this is recorded behavior, not a bypass of the closed fixed
row contract. Generic hostile JSON depth/resource guarantees and arbitrary
Python-object callers remain outside this bounded research checker. The
recomputed candidate is a trusted fixed algorithm, not an independent proof
of itself. The separate oracle shares Python rational primitives.

Only the repair code, its evidence, and these targeted Python executions were
assessed. Full repository CI, cross-platform numerics, external primary-source
review, upstream input/error composition and the rational/interval adapter
were not assessed. The manager may use this limited close review to sequence
further bounded research, while all scientific and release decisions retain
their existing requirements. No publish, merge or gate-state action was taken.
