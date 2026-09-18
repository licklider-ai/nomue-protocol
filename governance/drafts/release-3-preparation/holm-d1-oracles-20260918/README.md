# D1 byte-oracle continuation and B-2 receipt

Date: 2026-09-18 UTC. D1 unissued continuation, not completion, host
qualification, D2/D3, adoption or whole Research Gate closure.

## Independent receipt

The [original review](../../../../review-inputs/r3-holm-d1-b2-integration-20260918/REVIEW-RESULT.md)
is preserved byte for byte from `4bc89252e0cd248462c0799ccac369cc3c61f795` in
single-file intake `06782434150ee6ebdf026f1b694d4dc9ff8b3e96`. [INTAKE.json](INTAKE.json) fixes the
blob, SHA-256, targets and disclosures. It returns GO_FOR_D1_CONTINUATION for
Verifier `3c51172..eda3ba9` and Protocol `3233522`, zero BLOCKER/MAJOR, one MINOR.
It independently closes the prior path-error and omitted-expected-argument
findings, confirms the stable-sort repair/wiring and validates the R1 correction.
It does not claim its own actual cgroup/Python 3.12.14 execution or human review.

The sole m-1 is author-repaired: the repair packet's RESULTS.json is imported
unchanged, pinned, and compared against replay output except top-level environment.
Eight negative comparison cases and an actual replay with an altered expectation
and consistently changed temporary pin fail as intended. Historical review,
repair and evidence files are untouched. Independent close-only confirmation of
this repair remains pending; the old review does not cover the new tests.

## Fixed implementation and verification

[Verifier PR #20](https://github.com/licklider-ai/nomue-verifier/pull/20): head
`37bf9faa1b802bb41b0441e1ff23ee15374e4a60`, tree `473bd4afea08adff0fd13a5800c53dbf4e2da434`, parent and last independently
reviewed target `eda3ba9354429baf936212bc68572af94a5e20f6`, unchanged base
`940b8fb6990632029bcebd2ebdf6ce9dca8e9244`.

The [handoff and review request](https://github.com/licklider-ai/nomue-verifier/blob/37bf9faa1b802bb41b0441e1ff23ee15374e4a60/development/r3-holm/ORACLES-HANDOFF.md)
describes the oracle, mutation checks, coverage limits and fixed return path.
Runtime source, numerical worker/kernel, contracts, dispatcher and runtime
inventory are unchanged. The change is tests, runners, retained-result provenance
and evidence, outside the released npm runtime and supported dispatch.

A Python standard-library oracle constructs P(B) directly from predetermined
member/whitespace fragments, without importing candidate projection, parser, JCS
or digest helpers. SHA-256 expectations are fixed before executing the candidate.
It supplies 324 component vectors and ten full Record variants, including
first/middle/last/absent integrity, escaped keys, nested lookalikes, Unicode,
whitespace/newlines, numeric spelling and declared-digest mismatch. Expected
bytes and generator are committed; normal regeneration only checks equality.
This is author-created independent expectation logic, not a new independent
investigator review; hashlib and Node crypto may share OpenSSL.

The ten Record cases check all seven inner states and the reference digest.
They also run through the real controlled-call host lane, whose runner checks
the same precommitted reference hash and original-byte forwarding. Eighteen
component cases cover below/equal/above byte, depth, node, container, string and
key limits. They do not establish full-call admission at the narrower D0,
expected-input or worker limits.

Local Node 24.19.0 / Python 3.12.14: 121 TypeScript tests pass, no skips;
strict typecheck, npm tests, real tarball/package tests and three replay-regression
tests pass. The retained C1-C9 and 13088 repair-check results match their saved
expectations; generator output is byte-identical. All runtime pins remain exactly
those reviewed at eda3ba9. Local cgroup execution is NOT_RUN (read-only mount).
Actual-host outcomes and immutable raw archive are fixed in
[HOST-EVIDENCE.json](HOST-EVIDENCE.json). The hosted suite passes 85/85:
58 ordinary calls, 14 fault entries and 13 lifecycle controls. Its unmodified
256-file ZIP hashes to
`8744625dea4705e1034976a0de57da5ccc04478cba25283fe484ae3c5ce5ebba`.
All 110 saved input byte files match local regeneration; all ten fixed reference
hashes match reports; 58 ordinary nonces are distinct; six forwards equal their
original bytes. These are author executions, not independent host qualification.

## Remaining D1 work and next decision

All 44 locator rows remain partial. The map distinguishes the new component
bounds and actual-call variants, and explicitly names the existing lifecycle
controls without converting successful descendant cleanup into failed-cleanup
evidence. Remaining work is:

1. Independent changed-scope review of m-1 and the new oracle/runner evidence.
2. Remaining reason/context/numerical and narrower bound matrices.
3. Actual full-call canonicalizer/projection/digest helper corruption (R3D-43/44).
4. Actual setup/cleanup failure and supervisor loss, including the external
   owner's cleanup responsibility and evidence.

D2 dispatcher/legacy and D3 schema/reason/authority work do not proceed on this
checkpoint. No SOURCE-PIN, gate, RFC clock, signed R1 artifact or public identifier
changes. The independent record confirms R1 is already published and this R3
continuation needs no R1 refreeze or resigning.

Review return path: `review-inputs/r3-holm-d1-oracles-20260918/REVIEW-RESULT.md`.
Prepared with OpenAI Codex assistance in the continuing author/coordinator context.
Public sources and synthetic fixtures only; no licensed PDF is redistributed.
