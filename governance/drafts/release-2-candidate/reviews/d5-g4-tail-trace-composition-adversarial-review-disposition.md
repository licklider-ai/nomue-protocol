# D5 G4-to-Student-t tail trace composition adversarial-review disposition

## Review identity

- Composition implementation review input: `c8cfed942e56922dc22e0fa2f10dafd74de3c8f3`
- Independent review result commit: `480473b906f587b96a8c7cb114bd5977b332a15a`
- Durable review record merge: PR #61 / `e674bacc90ad127602072432bc730d1b5c05c20a`
- Verdict: **GO**
- BLOCKER / SHOULD-FIX / NICE-TO-HAVE findings: none
- Design observation: O1, no action required
- Additional primary-source research requested for this increment: none

The independent review exercised the composition from raw paired observations through the already
reviewed G4 actual-execution trace and the already reviewed table-connected Student-t tail trace.
It verified that the decision-bearing handoff is the exact G4 test-statistic binary64 bits and
integer degrees of freedom, that both nested traces are re-verified rather than digest-trusted, and
that the returned p-value is read from the verified tail trace with its source sequence preserved.

Reviewer-owned batteries covered 291 checks with zero failures. They included an 11-case direct
comparison corpus spanning df 1, 2, 4, 9, 30, 149, and 200 and the exact-zero, central, and signed
series branches; valid G4 and tail trace swaps; nine coherently re-digested link rewrites; nine
coherently re-digested nested-trace mutations; hostile-shape checks on both validators; and 100
checkpoint mutation and promotion attacks. Repository regression passed 431 tests, and the exact
review head was corroborated by CI #181, paired-t candidate evidence #47, and runtime-series
evidence #37.

O1 records that a different raw dataset can legitimately produce the same `(t bits, df)` and thus a
different honest self-contained composition. In that case the embedded G4 input, G4 digest, and
outer composition digest all change. This is consistent with the reviewed self-contained binding
semantics and does not weaken the exact G4-to-tail handoff invariant.

## Disposition

The G4-to-Student-t tail actual-execution trace composition is accepted as an **independently
reviewed, unissued, non-authoritative R2-D5 candidate**. The readiness summary may record that the
composition implementation review is complete and may bind this disposition as the durable review
state.

This disposition closes only the actual-execution composition review requirement. It establishes
that, for an accepted candidate execution, raw paired observations are bound through the verified
G4 trace to the verified Student-t tail trace and its returned p-value. It does not establish a G4
mathematical-truth error bound or mathematical end-to-end error guarantee.

The following remain unselected or incomplete:

- a G4 mathematical-truth error bound;
- confidence-interval trace composition;
- supported pair, node, df, value, or statistic bounds;
- a supported execution predicate or platform;
- a supported domain or runtime path;
- final reason-code meaning;
- a Public Check or bundle;
- R2-D5 completion;
- public review issue #25; or
- Release 2.

`runtime_support_enabled` and `supported_domain_claimed` remain false. The candidate remains
non-authoritative and unissued.
