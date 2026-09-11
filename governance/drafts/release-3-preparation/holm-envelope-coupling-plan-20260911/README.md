# R3 Holm full-envelope coupling plan

Status: informative design preparation; no issued schema or registered check.
Date: 2026-09-11. Input surface: PR #311, commit
`b0cfe157c22a868c2b45331b5fdbfebea2487bd0`.

The [Record-body experiment](../holm-record-surface-20260911/README.md) makes
supplied-p arithmetic binding executable. This packet resolves what its next full
Record integration needs to preserve and which existing surfaces cannot be reused
unchanged. It supplies an artifact map and pre-execution case expectations so the
next implementation can be reviewed as one bounded change.

- [COUPLING.md](COUPLING.md): field placement, byte/digest flow, reporting and staged work.
- [CASES.json](CASES.json): proposed integration scenarios, not executed conformance.
- [compatibility-checks.mjs](compatibility-checks.mjs): checks against current schema definitions.
- [COMPATIBILITY-RESULTS.json](COMPATIBILITY-RESULTS.json): executed compatibility observations.
- [INPUTS.json](INPUTS.json): inspected source identities.

The drafting assistant authored this plan in OpenAI Codex / ChatGPT Work. It is
an author synthesis of public repository sources, not a separate primary-source
investigation or independent review of the proposed envelope design. No new
cryptographic or statistical procedure is selected.

## Reproduce compatibility observations

```sh
node --import tsx governance/drafts/release-3-preparation/holm-envelope-coupling-plan-20260911/compatibility-checks.mjs
```

These tests inspect existing schema and requirement boundaries; they do not
implement the proposed envelope or turn CASES.json into passing evidence.

The fixed body candidate received a separate-investigator [limited GO review](../../../../review-inputs/r3-holm-record-surface-review-20260911/REVIEW.md). That review does not cover this later coupling plan.
