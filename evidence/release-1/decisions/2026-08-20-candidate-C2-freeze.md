# Release 1 Candidate C2 Freeze Record

**Candidate content commit:** `2f31c424951a1606563a1f7575d0d5688d34b410`
**Candidate tree:** `c9c77bb750df6f7e8d471cdc25b30c0b758878d6`
**Frozen file count:** `615`
**Gate-definition SHA-256:** `092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`
**Freeze/control workflow run:** `32358086922`
**Status:** candidate C2 frozen, pinned, and candidate-equivalence validated

Candidate C2 incorporates the targeted R1-02 BCO comparison correction that
superseded C1. The freeze manifest was generated from exact C2 with its output
outside the checkout, then copied into release-control state.

The release-control checkout passed:

- `pnpm snapshot:manifest --check-public-boundary`
- `pnpm snapshot:manifest --check-candidate`

The release-control diff from C2 is limited to `evidence/release-1/**`.
No candidate-frozen file or gate definition changed. This record closes no
gate; fresh C2 Evidence and gate review are required.
