# R4 T04 G1-G3 Research Gate Packet

Status: author research; no policy freeze or independent clearance.
Direct base: `663e44a0e632854d740abc26ff0f705db8d87c3f`.
Architecture: `cd9d780ac06a3b998ff5d4717429b0177a222fe8`.
T03: `d9ec6984f55f09caa2f65d7714af72190d63c6d4`.
PR331: `2732a26fd61d4e726fbd95b4d7622574cfcd9d82`.
Research branch: `research/r4-t04-ec1-ec2-evidence-20260914`.
The exact review target is the containing Git commit, reported in the handoff;
its parent is the direct base above. No circular commit self-reference is used.

## Packet index

- [RG1: full-pipeline boundedness](RG1-BOUNDEDNESS.md): lattice graph, complete
  charged-work ledger, preflight, guard disposition and J65/J70/J-cost.
- [RG2: zero and exact-sign proof](RG2-ZERO-EXACT-SIGN.md): positivity,
  equivalence, sign preservation, rounding boundaries and Z-A/Z-B/Z-C.
- [RG3: procedure alternatives](RG3-ALTERNATIVES.md): S-A/S-B/S-C, precision,
  D07 and five author recommendations, all pending Research Gate.
- [RG4: machine evidence](RG4-MACHINE-EVIDENCE.md): corpus, method separation,
  saved results and reproducer commands.
- [RG5: claim boundary](RG5-CLAIM-BOUNDARY.md): inheritance, new derivations,
  non-claims, remaining parameter choices and independence limits.
- [Review prompt](REVIEW-PROMPT.md): exact target acquisition, failure questions
  and expected independent return format.
- [Inputs](INPUTS.json), [results](RESULTS.jsonl),
  [manifest](MANIFEST.json), [artifact checker](verify_artifacts.py).

## Step 0: main delta impact

NO MATERIAL IMPACT to EC1/EC2's numerical authority, R4 RFC, canonicalization,
verification semantics, numerical evidence or security requirements.
GitHub main was read directly as `6e81be182d936ad01d736ea3a665abc02a4934bd`;
local remote-tracking origin/main remains the historical
`b0946163aed30a39119336434e2029b96096fd57`. They are not conflated.
The [captured GitHub comparison](MAIN-DELTA.json) identifies exactly one commit,
`6e81be182d936ad01d736ea3a665abc02a4934bd`,
"Clarify publication boundaries and review preparation (#333)", and eight files.

Its changes are operationally relevant: appended publication-boundary and
review-preparation instructions; a continuity record; two R3 historical-source
checker adaptations plus one checker checksum; a shared exact-hash maintenance
helper, its tests and CI invocation. The helper accepts only the specifically
approved AGENTS append and exact checker delegation change while preserving
historical pins; unknown source changes still fail. It does not alter R4
numerical sources, Requirements, RFC, T03, architecture, schema, canonicalization
or verification outcomes. Old R3 evidence is not rerun or promoted by that change.

The new instructions place shared public numerical implementation development
in nomue-verifier, while explicitly retaining existing R3/R4 exploratory assets
at their current locations/status. This task creates only such research assets.
The publication boundary is respected and a bounded adversarial review handoff
is prepared. No main merge/rebase/fetch or migration of source is performed.
Research input remains the fixed branch, not an implied current-main integration.

## Candidate decision boundary

The proposed direction is J-cost(B,S-C), full charged-integer cost, Z-B exact
eligibility, exact-sign terminal, and no precision schedule as public decision
semantics. Each is AUTHOR RECOMMENDATION — PENDING INDEPENDENT RESEARCH GATE.
B is deliberately an explicit unselected parameter; the packet makes the
family and costs reviewable without claiming a justified concrete support budget.

EC1 and EC2 remain open pending independent method/domain decisions and later
required work. Readiness here is only for independent Research Gate review of
G1-G3. G4/G5, EC3/EC4 and T05+ remain untouched. All historical artifacts,
architecture/T03 branches, main and PR331 are preserved.
