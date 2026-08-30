# D5 critical-value table evidence adversarial-review disposition

## Review identity

- Baseline: `612d0b943e34b55d8bd8cfe284d8dcdfbd3820a2`
- Reviewed implementation: `19139d51aad108125ef9854c304c698ce9b15ade`
- Reviewed tree: `e90992e188bf2f8ddbc1ba8f7b895dbaa6de6b87`
- Merge commit: `c0d6b2d8512e473111f98f9dba91ffc8bc97f3b8`
- Independent review-result commit: `24456c9d3d7faef56bbb731dac57045401780ea6`
- Review type: external, independent, candidate-scoped adversarial review
- Verdict: **GO**
- Findings: zero blockers, zero should-fix items, and one nice-to-have item
- Additional primary-source research requested: none

The review-result commit is a direct child of the reviewed implementation. The
reviewer used a fresh detached checkout, confirmed the implementation parent and
tree, and found no unexpected path or implementation change.

## Evidence established by the review

The reviewer independently reconstructed the exact binary64 rounding-cell
midpoints for all 200 integer degrees of freedom. Two calculation routes each
proved both strict tail inequalities for every cell, for 400 successful midpoint
inequalities and no failure. The reviewer also confirmed the search bracket,
first-true-cell logic, low-df closed forms, all recorded primary and secondary
enclosures, and the adaptive inset needed for df 72.

The ordered-cell byte format and SHA-256 were independently reconstructed as
`24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0`.
The review confirmed exact `df = 1..200` coverage, strictly decreasing cells,
agreement with the existing research seed, deterministic regeneration, and no
change to authoritative or Release 1 surfaces.

The repository probe rejected all 20 bundled mutations. A separate battery
rejected 70 coherently rehashed mutations with no uncaught exception. The full
repository check passed from a fresh clone. The reviewer could not download the
CI archive bytes because of an environment egress restriction, but matched the
GitHub-reported artifact digests and workflow logs and reproduced every
deterministic value locally.

The review's two numerical routes are method-distinct but still share the
Arb/FLINT ball-arithmetic library. The `GO` therefore does not establish
independence from a defect shared at that library layer.

## Editorial normalization

The review result says “six modified” and “four added” while its own path list
names five modified and five added files. The Git delta confirms five modified
and five added files, for the correctly reported total of ten files. The N1
smallest-repair sentence also repeats one clause. These are non-substantive
transcription errors. This disposition records the exact five-plus-five split
and reads the repeated N1 clause once; it does not change the review evidence,
finding, or verdict.

## Finding disposition

The one nice-to-have finding identified two related hardening opportunities:

1. state explicitly that standalone TypeScript validation establishes binding,
   structure, authority posture, and consistency of recorded claims rather than
   cell-level mathematical truth; and
2. reject a table whose positive finite binary64 critical values do not decrease
   strictly as df increases.

Both are accepted for immediate follow-up in repair commit
`0738558902dbcc851adbfd037a4f8f157370a46d` (tree
`678e12058907010de8e3170af0f35d78948e1ec8`). The repair changes four files:

- the evidence-tooling README states the validator boundary;
- the validator performs the exact ordered-bits monotonicity check;
- the mutation probe rebuilds table hashes after a nondecreasing-cell mutation
  and requires the dedicated monotonicity error; and
- the unit test covers decreasing, equal, increasing, zero, and infinity cases.

The repair does not change the generator, certificate core, cases, checkpoint,
200 reviewed cells, evidence-local content hash, numerical method, supported
domain, runtime graph, or authority state. It therefore requires only an
independent close-only review of this bounded repair. That close review is not
yet recorded here.

## Disposition

The fixed-95 critical-value table is accepted as independently reviewed,
non-authoritative candidate evidence. The original `GO` approved PR #47's merge
in that limited state. The accepted nice-to-have repair remains separate and is
not closed until its close-only review is recorded.

This disposition does not select a final critical-value table or final content
hash, establish Protocol support for `df = 1..200` or any supported df maximum,
close confidence-interval endpoint truth, select a supported platform matrix,
activate runtime support, issue a Public Check or bundle, complete R2-D5, publish
Release 2, or close public review issue #25.
