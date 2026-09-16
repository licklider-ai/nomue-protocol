# T04 EC1/EC2 Integration Lineage Repair

Status: **UNISSUED CANDIDATE**. This is an integration-lineage repair. It does
not close EC1 or EC2, select a numerical parameter, change the T04 architecture,
or adopt a public capability.

## Root cause

The original EC1/EC2 checker read all 22 historical input paths from the current
working tree. That was correct at its execution snapshot
`cd9d780ac06a3b998ff5d4717429b0177a222fe8`, but it conflated the reviewed input
with a later integration representation. The T03 integration repair preserved
D01-D07 and the numerical policy while changing one provenance-location paragraph
in the T03 Decision Record. The current file therefore has a different byte hash.

The historical T03 review input remains the file at
`d9ec6984f55f09caa2f65d7714af72190d63c6d4`, also present at the architecture
snapshot, with Git blob `1a743fac2fce5d2e184f44bf0d1d3c368a257d4e` and SHA-256
`5cfc7a5ba8d60c30b886a429385db04742fcf0b7054837ecba5935a12a29dbf0`.

## Repair model

`check_lineage.py` leaves the historical T04 packet unchanged. It reads the
original EC1/EC2 `INPUTS.json`, checker, saved result and report from historical
commit `663e44a0e632854d740abc26ff0f705db8d87c3f`; verifies their Git blobs and
SHA-256 values; reconstructs the 22 pinned inputs in a temporary repository; and
runs the original checker there in the caller's normal or optimized mode.

The current representation is checked separately. The T03 repair commit
`0767157d05d4d9490822fada5160a3b4dce8ac5e` and T03 main merge
`e5ee16b7f2b8c4e4f67defa4965b6934faae678c` both bind the current Decision Record
to blob `5eac93c224e818779a6538dd45ff583bc5488d3b` and SHA-256
`bb739c0ec70595443e8c0ce41223a724bb6275ad6afbb5fad009db839c2c2f47`.

The checker requires the repair commit to precede the merge, the merge to precede
the integration head, and the current working-tree Decision Record to match that
current blob. It also verifies that the exact T03 document difference is only the
known preservation-location paragraph. All remaining Decision Record bytes,
including D01-D07 and their aggregation, projection, p-value, zero/underflow and
supported-boundary text, are identical.

## Boundaries

This successor validates provenance more strictly than the original current-tree
read: it verifies the historical commit-to-blob relation, the blob-to-SHA-256
relation, the original saved-result equality, and the current integration binding.
It does not rewrite a historical input, expected hash, review receipt, result, or
manifest. It does not alter formal authority, registries, schemas, Requirements,
supported bundles, Public Checks, the production dispatcher, or Release 4 status.

The result is evidence-lineage verification only. EC1 and EC2 retain their
historical open status, and no independent numerical or semantic conclusion is
created by this repair.
