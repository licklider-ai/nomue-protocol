# R1-07 Candidate C7 immutable-surface refresh

**Gate:** R1-07 — Immutable public surface and version authority  
**Candidate C:** `f4206ac3f85dc8f783d14d63413cff87ab2ed82b`  
**Pin P:** `fb63509fed707de4033756238e8dacc23175e621`  
**Release-control commit tested:** `ead6785b09e96f6a229ce6c148179af0b29a97f0`  
**Recorded:** 2026-08-24

## Candidate freeze

The Candidate C7 freeze manifest records 608 frozen repository/public files and gate-definition projection digest:

`092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`

Post-freeze release-control changes are confined to the mutable release-state/evidence paths defined by the Release Policy.

## Fresh Protocol snapshot

Read-only workflow run `32673557537` checked out exact release-control commit `ead6785b09e96f6a229ce6c148179af0b29a97f0` and completed successfully. In the same run it:

1. passed `pnpm snapshot:manifest --check-public-boundary`;
2. passed `pnpm snapshot:manifest --check-candidate`;
3. passed `pnpm validate`;
4. generated a detached Protocol snapshot manifest outside the checkout; and
5. generated the detached one-line snapshot hash.

The resulting Protocol snapshot contains 83 authority-scoped files and has snapshot hash:

`sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06`

Committed evidence:

- `evidence/release-1/gates/R1-07/protocol-snapshot-manifest-c7.json`
- `evidence/release-1/gates/R1-07/protocol-snapshot-hash-c7.txt`

Capture run:

[Capture run 32673557537](https://github.com/licklider-ai/nomue-protocol-release1-cleanroom/actions/runs/32673557537)

## Circularity repairs verified

C7 also fixes the two release-control circularities found during pre-publication repair:

- candidate-freeze output is generated outside the checkout and cannot enter its own frozen inventory;
- `generated/README.md` no longer hashes mutable release-gate state, while `generated/RELEASE-1-GATES.md` remains the mutable generated gate view excluded from candidate freeze.

The earlier gate-impact execution actually changed four gate states and still passed Candidate C7 equivalence with 608 frozen files and unchanged gate definitions. This demonstrates that permitted post-freeze release-state updates no longer mutate the frozen public surface.

## Decision support

Candidate C7 now has a content-addressed Protocol snapshot, an exact candidate freeze/pin, a stable gate-definition projection, and executable candidate-equivalence/public-boundary evidence. R1-07 can be reclosed for C7. R1-14 remains separately open until the production signing ceremony binds release source R and the signed snapshot is independently compared with the final tagged D tree.
