# Release 1 Candidate C2 — Gate Review Matrix

**Review status:** evidence review complete; no gate decision is made by this record.

**Candidate content commit:** `2f31c424951a1606563a1f7575d0d5688d34b410`  
**Release-control commit used for the canonical evidence run:** `d5c43a0f2b39982e110b32b648a19dd3be3ff2ad`  
**Candidate evidence workflow run:** `32358408617`  
**Canonical artifact ID:** `9402577853`  
**Artifact digest:** `sha256:f4548a29dcb5f9b59ec2595c86a52f821519d99f42e04b06919d1239b3eab145`

The workflow completed successfully against the exact pinned candidate. Candidate equivalence and the public boundary passed before evidence generation. The artifact is internal candidate-scoped execution evidence; by its own scope notice it does not substitute for R1-04 external clean-environment evidence, R1-09 independent rebuild evidence, R1-12 steward legal confirmation, or a gate decision.

## Candidate evidence summary

- authority/registry validation: PASS;
- Phase 1 conformance: 132/132 expected fixtures;
- Phase 2A conformance: 44/44 expected fixtures;
- 0.2.1 conformance slice: 6/6 expected fixtures;
- reference verifier tests: 25/25 PASS;
- refusal/adversarial fixtures: 8/8 PASS;
- schema-guided fuzzing: 17,136 iterations, 0 unsafe outcomes;
- internal offline interception check: zero network calls across 6 fixtures;
- relying-party/signing contract tests: 11/11 PASS;
- R1-08 independent oracle: 15-case corpus, 0 SUT replay failures, metamorphic relations PASS, independent FLINT/Arb lineage satisfied;
- canonical case `CC-R1-001` was evaluated against the exact 0.2.1 candidate bundle.

## Gate-by-gate review

| Gate | Review disposition | Basis / remaining work |
| --- | --- | --- |
| R1-01 | **READY FOR STEWARD DECISION: PASS** | Frozen generated public-check/capability surfaces remain the candidate authority; C2's only semantic-content change from C1 was the R1-02 comparison correction. The current public wording preserves scoped verification and non-claim boundaries. Final gate decision remains a steward action. |
| R1-02 | **READY FOR STEWARD DECISION: PASS** | C2 specifically repaired the BCO comparison after adversarial review. The comparison now distinguishes native BCO semantics from custom extensions, acknowledges BCO provenance/versioning/error/extension/etag mechanisms, and retains only the narrower nomue differentiation claim. `CC-R1-001` is the concrete same-study walkthrough. |
| R1-03 | **NEEDS ONE TARGETED INTERNAL CHECK** | Candidate conformance and verifier logs are fresh and green. Because the frozen repository retains experimental/test-only attestation material while the Release 1 bundle declares `attestation_support: none`, record one fresh candidate-scoped attestation negative-test run before steward decision. This same run can satisfy the remaining fresh-run portion of R1-11. |
| R1-04 | **BLOCKED — EXTERNAL OPERATOR** | Internal offline evidence is explicitly insufficient. Required: clean-environment external-operator verification, environment manifest, and OS/network-isolation evidence. |
| R1-05 | **READY FOR STEWARD DECISION: PASS** | Frozen threat model/adversarial corpus plus fresh refusal runs and schema-guided fuzzing show fail-closed behavior; 8/8 refusal fixtures and 17,136 fuzz iterations produced no unsafe outcome. |
| R1-06 | **READY FOR STEWARD DECISION: PASS** | `CC-R1-001` is explicitly synthetic: no real participant, compound, unpublished study, or third-party confidential data. The case is fixed before evaluation and the guarantee boundary is explicit. Comparative WRROC/BCO artifacts are project-authored representations used for comparison, not imported study data. Steward should record the final rights/licensing and epistemic-integrity confirmation. |
| R1-07 | **READY FOR STEWARD DECISION: PASS** | C2 is pinned with a 615-file content-addressed freeze manifest; candidate-equivalence and public-boundary checks passed against the release-control state; registry/authority validation is fresh and green. |
| R1-08 | **READY FOR STEWARD DECISION: PASS** | Fresh candidate oracle bundle contains the independence argument, replay matrix, common-cause analysis, environment manifest and hashes. 15 cases; 0 replay failures; metamorphic PASS; FLINT/Arb lineage is disjoint from the SUT's stdlib/Boost lineage. |
| R1-09 | **BLOCKED — INDEPENDENT REBUILD** | Candidate workflow proves internal build/test execution but does not satisfy the gate's independent rebuild requirement. Required: external independent rebuild log, dependency provenance listing, and build environment manifest. |
| R1-10 | **READY FOR STEWARD DECISION: PASS** | `CC-R1-001` was preregistered before Release 1 generation/evaluation with fixed observations, analysis, transformation and a mandatory retain/disclose rule for failure. No alternate Release 1 canonical case was silently substituted. |
| R1-11 | **NEEDS ONE TARGETED INTERNAL CHECK** | Release 1 has `attestation_support: none`; production trust-root/key ceremony is therefore outside this gate's current applicability. Cryptosuite/trust semantics are frozen and historical negative-test evidence exists. Run `tooling/tests/attestation.test.ts` once against exact C2 and record the result before steward decision. |
| R1-12 | **READY FOR STEWARD DECISION: PASS** | The adopted `LICENSE.md` legal package is part of frozen C2. Specification/code licensing, Protocol Essential Claims RF terms and contribution boundary are therefore candidate-bound. Founder legal-risk acceptance remains recorded; external counsel was intentionally waived for Release 1. |
| R1-13 | **READY FOR STEWARD DECISION: PASS** | Candidate relying-party/signing contract run passed 11/11 tests. Frozen relying-party documentation and machine-readable/exit-code contract remain in C2; the candidate run supplies fresh execution evidence. |
| R1-14 | **BLOCKED — RELEASE SIGNING CEREMONY** | Signing implementation tests are green, but the gate requires actual signatures over final release targets, checksums/metadata and Protocol snapshot manifest plus verification evidence. Execute only after the other release evidence is ready. |

## Milestone interpretation

This review completes the evidence-classification portion of **M4**. It deliberately does not auto-close gates.

The shortest remaining path is:

1. run one fresh C2 attestation negative-test check (unblocks review of R1-03 and R1-11);
2. obtain R1-04 external offline verification;
3. obtain R1-09 independent rebuild evidence;
4. present the ready gates and new external evidence to the named steward for explicit pass/fail/not-applicable decisions;
5. execute R1-14 release signing after all other applicable gates are ready;
6. close the final gate and proceed to Release 1 publication.

Any newly discovered issue should replace C2 only if it changes frozen candidate content or invalidates a required gate claim. Non-release-critical cleanup remains post-Release-1 work.
