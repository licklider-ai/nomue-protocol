# Next Record integration unit and R3 collision policy

The new entry takes trusted in-memory cells and revision; it is not a Record
verifier. This boundary is intentional and leaves the following concrete joins.

| Join                   | Required work                                                                             | Acceptance control                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Raw ingress            | Existing parseStrictJson before Record interpretation; bounded byte/depth ingress         | Duplicate keys, unpaired surrogates, malformed UTF-8/JSON and over-cap input           |
| Design identity        | Exact factor/level/cell/unit identity and independent expected context                    | Reordered labels, duplicated units, wrong design, missing references                   |
| Envelope and integrity | Schema/bundle/instance revision binding plus JCS digest                                   | Wrong bundle, tamper, changed observation, identity mismatch                           |
| Semantics              | Separate conformance from design admissibility and verification                           | Broken local reference does not collapse judgments into one overall status             |
| Arithmetic results     | Bind all 13 submitted quantities and df to expected input                                 | Final quantity mutation suppresses its claimed consistency; no partial overall success |
| Probability evidence   | Explicit optional/required carrier decision, source scope, exact containment policy       | False singleton, tighter valid interval, widened interval, zero encoding               |
| Execution report       | Map worker failures and unavailable observations to the owned output vocabulary           | Cancellation, before-input failure, no invented observed size, cleanup failure         |
| Authority allocation   | Coordinated Contract/Profile, requirements, schemas, checks, reasons, bundle and fixtures | Complete ownership map; no unregistered permanent identifiers                          |

The in-memory `revision` and numeric digest are experimental bindings, not a
substitute for Record instance identity. The encoding transport is not JCS.
R3 candidate.4's conformance/result separation is relevant prior engineering but
is not silently adopted as an issued R4 report. Consume the accepted R3 shape
after its scope review, then assess the R4 delta.

## Collision matrix

| Area                                        | Immediate R4 action                       | If R3 changes it                                    |
| ------------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| R4 numerical/source packets                 | Read pinned bytes, add only R4 successors | Never rewrite old pins                              |
| R4 execution experiment                     | Separate directory and dedicated workflow | No dependency on R3 workflow edits                  |
| requirements/check/reason/bundle registries | Prepare unissued mappings only            | R3 lands first; rebase R4 allocations               |
| Common report/meta-schemas and dispatcher   | No direct change in this round            | Reuse accepted R3 migration; check R4-specific gaps |
| package/lockfile/generated files            | No change                                 | R3 dependency decisions take priority               |
| Release-status coordination page            | No simultaneous edit                      | Update after current R3 round stabilizes            |

No R3 calendar or Holm numerical prerequisite is added to R4. Only actual shared
edits are sequenced. The present work preserves all baseline tracked files.

## RFC and release impact

The public 2-by-2 scope and exclusions are unchanged. Output representation,
execution selection, evidence acceptance and report joins fill previously open
choices and need a concrete comparison against the fixed RFC before freeze.
Do not assume every such choice is editorial or exempt from a new window.
Assess the highest affected tier; actual CORE changes use the CORE process.

Before formal implementation, record applicable independent primary-method
review reuse and any missing changed-claim investigation, then review the fixed
adapter/worker/schema candidate. Self-review and archive GO do not satisfy that
step. Earliest unchanged-scope decision remains 2026-10-09T05:59:47Z; expiry is
not adoption. Release freeze, final checks and publication are later steps.
