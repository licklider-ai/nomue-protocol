# Release 1 Candidate Evidence Runbook

**Status: operational runbook.** This document separates evidence that can be
regenerated in project-controlled CI from evidence whose gate definition requires an
external or independent operator.

## Preconditions

Do not run candidate-scoped evidence until:

1. final candidate content commit **C** has been selected;
2. `evidence/release-1/gate-index.json.release_candidate_id` records C in a later
   release-control commit;
3. `evidence/release-1/candidate-freeze-manifest.json` records the freeze inventory
   generated at C;
4. `pnpm snapshot:manifest --check-public-boundary` passes;
5. `pnpm snapshot:manifest --check-candidate` passes.

Candidate-scoped evidence is invalidated when candidate-frozen content or gate
criteria change.

## Internal candidate rerun

Use the manually dispatched workflow:

```text
.github/workflows/release1-candidate-evidence.yml
```

Inputs:

- `release_control_ref`: the commit/ref containing the candidate pin and freeze
  manifest;
- `candidate_sha`: exact 40-hex C.

The workflow refuses to proceed if the gate index does not name the requested C or if
candidate equivalence/public-boundary checks fail.

It regenerates project-controlled evidence for:

- registry/authority validation;
- Phase 1, Phase 2A, and exact 0.2.1 conformance;
- reference verifier tests;
- the preregistered Release 1 canonical case `CC-R1-001`;
- refusal/adversarial fixtures and schema-guided fuzzing;
- the R1-08 independent numerical oracle corpus;
- application-level offline/no-network-API interception evidence;
- relying-party exit-code contract tests;
- release-signing verification tests;
- detached Protocol snapshot hash calculation.

The artifact is labeled **internal evidence only**. A successful run does not close a
gate by itself.

## Evidence that MUST remain independent/external

### R1-04 — External offline verification

Project-controlled CI is not an external operator. R1-04 requires clean-environment
verification reports from external operators plus environment and network-isolation
evidence. The internal Node API interception run is useful regression evidence but is
not a substitute for that gate requirement.

### R1-09 — Independent rebuild

A rebuild executed by this repository's normal CI is not independent. R1-09 requires
an independent rebuild of the frozen verifier source/package with documented
dependency provenance and build environment.

### R1-12 — Legal implementation boundary

No technical workflow can adopt or replace the legal terms or make the R1-12 steward
decision. The Release 1 legal package was adopted pre-candidate in the repository-root
`LICENSE.md`, with the review and Founder risk-decision records under
`evidence/release-1/gates/R1-12/`.

After candidate C is frozen and pinned, R1-12 still requires a candidate-scoped
confirmation that the frozen candidate contains that adopted legal package and the
required evidence references before the steward closes the gate. A successful
candidate CI workflow does not substitute for that review.

## Gate-review discipline

For each applicable gate:

1. collect the evidence required by the authoritative gate definition;
2. point every evidence item to candidate C and the exact environment/operator where
   applicable;
3. preserve failures and deviations rather than silently rerunning until green;
4. have the steward review the evidence item-by-item;
5. change only the permitted gate state/decision bookkeeping after candidate freeze;
6. close the gate only with an explicit `pass`, `fail`, or `not_applicable` decision
   that satisfies the gate definition.

A green internal workflow is never equivalent to an overall Release 1 pass.
