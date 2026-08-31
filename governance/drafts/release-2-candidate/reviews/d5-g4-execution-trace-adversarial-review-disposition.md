# D5 G4 actual-execution trace candidate adversarial-review disposition

## Review identity

- Original implementation: `12eff9025386eb5b73db107ff4b838613b09174d`
- Original review input: `215de9a8cc6f245782964befd13a9ba287a8fd49`
- Original independent review result: `860a3da434dbb1a1df0d6d997e166c52296639ef`
- Original verdict: **NO-GO** on exactly F1 and F2, both `BLOCKER`
- Repair: `6c9c3e57c9c50fc39f39823f036b9423fe443f96`
- Close-review input: `e94ea523216de37c799e4a61db3ce070df5f6598`
- Close-review result commit: `d58af45eb77a36272b724c87acfa8a5c19b525c0`
- Durable review-record normalization: `f72a4ff7263a39ac34ce3933926b3578bff1b93b`
- PR #56 merge: `2729818064401feac236872916169caa1f726fde`
- PR #57 review-record merge: `a18090cac47974965a7c0559c53e0f308d89974c`
- Close-only verdict: **CLOSED**
- Repair-induced findings: none
- Additional primary-source research requested for this increment: none

The original independent adversarial review found two refusal-classification blockers and no other findings. F1 allowed a later pair's structural defect to preempt an earlier pair's `DIFFERENCE_OVERFLOW`. F2 allowed a non-root mean or variance reduction overflow to reach the primitive verifier as a non-finite parent operand and be mislabeled `execution_trace_verification_failed`.

The repair changed only the candidate implementation and its test. It restored the unchanged reference graph's per-pair first-failure order and classified a non-finite reduction result immediately after the producing primitive had been exactly verified. The repair did not change the reference graph, trace format, successful arithmetic, checkpoint authority posture, support state, or Release 2 state.

## Evidence established by the close-only review

The independent close-only review exercised 1,360 F1 first-failure comparisons with zero mismatches. The battery included both original witnesses, reverse ordering controls, two-, three-, four-, and seven-pair cases, seeded insertion permutations, and lexically difficult pair IDs.

For F2, the reviewer exercised 50,007 deterministic mean-reduction witness and extreme-exponent cases and 30,004 full-G4 cases with zero classification mismatches against the unchanged reference semantics. The original mean and variance witnesses, root controls, non-root placements, multiple reduction depths, and power-of-two and non-power-of-two shapes were included. An injected genuine primitive-verification failure remained `execution_trace_verification_failed` and was not relabeled as a graph overflow.

Successful-output invariance was checked independently. A complete serialized-result model covered 12,205 accepted cases with zero mismatches and produced reviewer rollup `sha256:7c95b0c2edd4d8d5bde8629a621befed2e9efbcd9d60226b18d05288cb8c6f59`. The corpus included every pair count from 2 through 201, signed-zero and normal/subnormal controls where admissible, large finite and cancellation cases, and seeded broad accepted inputs. The successful node formula remained `5n + 3`, including 1,008 nodes at 201 pairs.

Repository regression corroboration passed the repaired G4 suite and the full repository suite at the reviewed state: 40 test files / 424 tests, generated-file checks, Phase 1 and Phase 2A checks, and the tested Linux, macOS, and Windows jobs. The close decision itself remained based on the independent source inspection and reviewer-owned adversarial harness rather than repository tests as the semantic oracle.

## Disposition

The G4 actual-execution trace implementation is accepted as an **independently reviewed, unissued, non-authoritative R2-D5 candidate**. The readiness summary may record that the candidate implementation review is complete and may bind this disposition as the durable review state.

This disposition closes only the implementation-review requirement. It does not select or complete any of the following:

- a G4 mathematical-truth error bound;
- composition of the G4 trace with the Student-t tail trace;
- confidence-interval trace composition;
- a supported pair, node, df, value, or statistic bound;
- a supported execution predicate or platform;
- a supported domain or runtime path;
- final reason-code meaning;
- a Public Check or bundle;
- R2-D5 completion;
- public review issue #25; or
- Release 2.

The values 201 pairs and 2,048 trace nodes remain evidence-evaluation ceilings only. `runtime_support_enabled` and `supported_domain_claimed` remain false, and the candidate remains non-authoritative and unissued.