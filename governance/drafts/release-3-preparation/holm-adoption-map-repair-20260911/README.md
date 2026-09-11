# Repaired Holm adoption map

Informative successor to the PR #323 map, using the unissued candidate.3.
`SURFACES.json` lists each of 531 property pointers explicitly (357 inherited and 174 added by
the stronger refusal-schema combinations). Prefix inheritance
and empty catch-all ownership are absent. Adding even a nested property or removing
an owner fails the checker. This is structural accounting, not proof that a
Requirement's prose completely specifies every field.

`check.mjs` executes the candidate suites in a temporary output directory and
checks exact result-row group/name values. An import or arbitrary source substring
cannot satisfy a test reference. These are bounded evidence links, not complete
semantic conformance coverage. Whole-host lifecycle coverage remains the dedicated
actual-cgroup job; the map's budget evidence does not replace it.

Six negative controls mutate real schemas, ownership, requirement lists and executed
results: added field, removed ownership, unknown owner, actual duplicate ID,
removed evidence and an import-name pseudo-locator. Counts derive from successful
rejections. No active registry rows are emitted. The historical preview remains
unchanged evidence, not an adoption-ready patch.

Run `node check.mjs` from this directory with Node 24.19.0, dependencies installed
and `NOMUE_EXPERIMENT_PYTHON` pointing to Python 3.12.14. Tests do not overwrite
committed artifacts. `INPUTS.json` conservatively pins the runtime and test corpus,
including reference dispatch, strict parsing, D0, schemas and conformance inputs.
`pin_inputs.py` is an explicit review-time refresh, never a CI repair step.

The display requirement delegates comparison policy to the check version. Candidate
reason values are explicitly local and unissued. Formal adoption, permanent fixture
and public-surface allocations, input-size reporting, and research-gate sufficiency
remain separate decisions. This map does not declare them complete.
