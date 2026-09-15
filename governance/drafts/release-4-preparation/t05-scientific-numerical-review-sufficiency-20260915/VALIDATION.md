# T05 validation

Validation applies to the T05 audit artifact bytes sealed by MANIFEST and its
containing Git commit. This is not new numerical or scientific evidence.

- Read-only identity verifier: 47 repository artifact pins, 67 G5 preserved input
  pins, 11 historical runtime hashes across three snapshots, four original
  task-message provenance entries, local links/anchors and immutable URLs.
- Original task messages were inspected and hashed at intake. The verifier checks
  their provenance shape and target commits; it does not authenticate unavailable
  public originals from a digest alone.
- `pnpm validate`, `pnpm lint:markdown`, affected Markdown/JSON Prettier checks
  and `git diff --check` passed before freezing this audit.
- No numerical experiments, reviewed tests or fresh primary-source review are
  rerun. Existing results in REPORT/REVIEW-EVIDENCE are attributed to prior reviews.

From the repository root:

```sh
python -B governance/drafts/release-4-preparation/t05-scientific-numerical-review-sufficiency-20260915/verify_inputs.py
pnpm validate
pnpm lint:markdown
git diff --check
```

MANIFEST excludes itself to avoid self-reference; its containing Git commit binds
it. No historical file is changed. The final handoff records exact HEAD and Git
state; any push transfers only the T05 research branch.
