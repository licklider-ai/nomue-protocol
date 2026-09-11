# R3 Holm checkpoint integration evidence

This archive preserves actual-host observations for the unissued
[checkpoint candidate](../../governance/drafts/release-3-preparation/holm-checkpoint-candidate-20260911/README.md).
It is an execution evidence record, not a new independent numerical review or a
formal Release 3 adoption decision.

## Exact identity

- Implementation PR: [#324](https://github.com/licklider-ai/nomue-protocol/pull/324).
- Tested head: `7ccc27a95c6786246d812d6ebd1edcedabc0a715`.
- Main merge: `17575e1f936c3d6dfb5604b902a582ccee376202`.
- Dedicated run: [34638917666](https://github.com/licklider-ai/nomue-protocol/actions/runs/34638917666), job `103393529308`.
- Standard run: [34638917516](https://github.com/licklider-ai/nomue-protocol/actions/runs/34638917516), all five jobs successful.
- Artifact: `10279271560`, `r3-holm-checkpoint-candidate`.
- Downloaded ZIP SHA-256: `e6df564d86a95a55fe18d04a1c6663e19327f5808740c9dfd3e43e022149318c`.

`ci/*.json.txt` files are byte-for-byte ZIP members, with only their destination
names changed to avoid treating captured observations as authored JSON schemas.
`CI-JOBS.json` is a normalized connector snapshot of job metadata, not a raw ZIP
member. `SHA256SUMS` covers all archive content except itself. The six member names
were checked against an exact allowlist before extraction. The ZIP digest matches
the GitHub artifact digest. No expiring download URL is required for reproduction.

## Results and limits

The dedicated workflow passed 33/33 controls, 38 checkpoint controls, 82 envelope
controls, 91 public controls and 132 legacy fixtures. Public conversion validated
28 receipts and forwarded original Record bytes exactly five times. Of 28 receipts,
27 launched calls have all four cleanup predicates true: populated zero, ECHILD,
removed cgroup and removed temporary directory. The remaining receipt is the
intentional unavailable-host preflight refusal; it launched no call.

The real-clock delayed-worker case returned only a processing timeout, with no
partial checks or Record bytes. Total supervisor elapsed time was about 5.904
seconds, including setup and cleanup. The inner budget uses the actual monotonic
clock; the test replaces only the trusted worker with a 5.1-second delay followed
by malformed output. It therefore tests timeout precedence over worker failure,
not a claim of 5-second hard preemption or numerical-workload latency.

The existing OOM, pids, output, deadline, cancellation, orphan and sibling controls
also passed. The host ran kernel `6.17.0-1022-azure`, Linux x86_64, pinned Node
24.19.0 and Python 3.12.14. Heap threshold controls use injected observations;
they do not prove a continuously monitored 512 MiB JavaScript heap peak. The
external cgroup tests do exercise real kernel enforcement.

## Resume without reacquisition

1. Read the checkpoint candidate README and author-context `REVIEW.md`.
2. Verify this archive with `sha256sum -c SHA256SUMS` from this directory.
3. Inspect the real timeout row and its receipt in `ci/execution-cgroup-results.json.txt`.
4. Reproduce candidate checks using the committed workflow and source pins when
   a relevant runtime or boundary changes; unchanged archived evidence need not
   be recreated solely because a download URL expires.
5. Prepare a coordinated candidate.2 adoption-map revision and decide known versus
   unknown input-size reporting. Preserve the candidate.1 adoption map and evidence.

No supported-bundle registry, authoritative requirement, numerical kernel or RFC
window changes in this archive. Formal adoption remains a steward decision, with
an earliest unchanged STABLE decision of 2026-10-09T11:50:18Z.
