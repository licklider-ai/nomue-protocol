# R3 D1 context and helper checkpoint closeout

Date: 2026-09-18 UTC. **This work session is closed and paused; D1 and the
Research Gate remain open.** The owner requested review, repair, merge, durable
evidence preservation and a restart handoff, with no further implementation in
this session. This is an informative coordination and evidence record.

## Integrated work

| Work                                                                                       | Reviewed head                              | Merge into Verifier main                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| [PR #22](https://github.com/licklider-ai/nomue-verifier/pull/22), context matrix           | `735e62046e84a90197e2aa44aba59f75141c7ba8` | `f5128cbf568f1713b12f0c26a47ff5e48560d4c1` |
| [PR #23](https://github.com/licklider-ai/nomue-verifier/pull/23), helper faults and repair | `7f97a58c27cfb92d268c7eb03519bc5dc8cd0e00` | `43a2ddc6933c62eecc05007081f50454acf5b459` |

PR #23 was retargeted after #22 landed. The resulting merged tree is
`fda9487e5a8c93c4a0bb0b3b5c2c78f28461c635`, identical to its tested/reviewed head.
Expected-head guards fixed both merges. Implementation and executable test sources
remain in Verifier; no Protocol reference copy or SOURCE-PIN is advanced here.

The context matrix has 105 cases (seven Record states by fifteen expected-context
states), including each of the four compared fields. Five deliberately broken
variants must produce at least 30/83/17/113/6 failures. Helper testing adds isolated
source copies with native throws, incorrect return types, a typed resource error,
projection disagreement, two negative sensitivity controls and source-pin drift.
The runtime repair rejects non-Buffer projections before comparison/hashing and
preserves already typed resource errors and checkpoint/cancellation identity.

The [review disposition](REVIEW-DISPOSITION.md) records the supplied CLOSED
confirmation, all five resolved findings, reviewer limitations and owner merge
authorization. It is not a Research Gate clearance or a new
GO_FOR_D1_CONTINUATION verdict. No public schema, reason, numerical method,
supported dispatch, identifier, RFC clock, signed R1 evidence or release gate changes.

## Durable evidence

[EVIDENCE.json](EVIDENCE.json) fixes the three original ZIPs, their GitHub run and
artifact identities, head/tree, byte counts, SHA-256 hashes and observation scope.
The ZIP bytes are stored in this directory without extraction or recompression:

- `context-host-735e620.zip`: 190/190 host checks at PR #22's repaired head.
- `helper-inner-7f97a58.zip`: 20/20 inner checks at PR #23's repaired head.
- `helper-host-7f97a58.zip`: 211/211 host checks at the same head.

Both fixed-head CI runs passed 9/9 jobs. At 7f97a58, local Node 24.19.0 /
Python 3.12.14 ran 245 component tests with no skips; strict TypeScript,
npm tests (including 96 Welch rows), and package smoke passed. Host execution is
author CI evidence, not an independent reviewer execution or host qualification.
The author's local cgroup mount is read-only; local actual cgroup is NOT_RUN.

The 211 total comprises 163 ordinary candidate calls, fourteen trusted fault-entry
cases, thirteen lifecycle/control cases and twenty-one separately labelled source
copies. It does not mean 211 ordinary calls. The copies include three unmodified
baselines, so a manifest hash alone cannot distinguish that lane. Inspect case/lane
identity and MUTATION.json. Twenty copy calls have completed_valid cleanup receipts;
the unpinned-source case is preflight refusal, not completed-lifecycle evidence.

Original artifact links expire on 2026-12-17; these committed ZIP bytes do not rely
on that retention. Archive intake establishes custody and observed consistency,
not retroactive independent clearance. The ZIPs contain public test source,
synthetic Records and hosted-run receipts, not the licensed Holm PDF or private
product material. Before committing, member paths/types and contents were inspected.

Verify retained custody without executing archived source:

```sh
python3 governance/drafts/release-3-preparation/holm-d1-checkpoint-close-20260918/verify-evidence.py
```

## Restart here

1. Read this closeout, its review disposition and EVIDENCE.json; run the custody
   check. Fetch both public repositories and compare current main with the fixed
   merge above before reusing evidence. Preserve historical receipts unchanged.
2. In Verifier, read AGENTS.md and its required documents, then
   `development/r3-holm/HELPER-FAULTS-HANDOFF.md`, `ORACLES-HANDOFF.md`,
   `ACCEPTANCE-COVERAGE.json` and the Protocol D0 acceptance/design at `1eb6b93`.
3. Next implementation unit: actual setup/cleanup failure and supervisor loss,
   including the external owner's cleanup responsibility. Separate actual failed
   lifecycle evidence from successful descendant cleanup or fabricated receipts.
   Keep fault selectors out of normal verification APIs and packaged code.
4. Keep correctly typed but corrupted Buffer output on noncanonical input as a
   priority review question. The retained reserialization negative control still
   produces a wrong failure-reference report; the independent byte oracle detects
   it. K blocks I pass and forwarding, but does not prove that reference correct.
   Runtime source pinning is a separate control, not a universal corruption defense.
5. Complete narrower whole-call bounds and remaining reason/numerical matrices.
   Obtain the still-pending changed-scope review of the earlier byte-oracle/runner
   delta and B-2 retained-result comparison repair. Reuse unchanged valid reviews.
6. Reconcile all 44 locators before a separate D1 completion disposition. Every
   locator remains partial now; D2 dispatcher/legacy and D3 schema/reason/authority
   integration are still pending. Any research/promotion decision uses its own
   required evidence and authority. Do not restart broad source research by default.

Implementation tests and fault runners are committed in Verifier main. This
packet preserves the external evidence and restart state in Protocol main; no
uncommitted scratch script is needed to rerun the suites. For reproduction use
Node 24.19.0 and Python 3.12.14, pinned npm dependencies and the committed CI
commands. Actual cgroup tests need the documented suitable Linux environment.

Prepared by OpenAI Codex in the continuing author/coordinator context under the
owner's instruction. Author repair, archive inspection and this closeout are not
independent research or human expert review.
