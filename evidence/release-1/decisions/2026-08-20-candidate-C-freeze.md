# Release 1 Candidate C1 Freeze Record — Superseded

**Candidate content commit:** `fce2e0015c6ea5064e6247850182d1c09cee85d8`
**Candidate tree:** `c6b72f3ca23faa5a16d974d6cb101b2aec15a843`
**Frozen file count:** `615`
**Gate-definition SHA-256:** `092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`
**Freeze/control workflow run:** `32353253309`
**Superseded:** 2026-08-20

Candidate C1 was correctly frozen and candidate-equivalent when selected. During the
candidate-scoped R1-02 review, primary BioCompute Object sources showed that the
frozen comparison materially understated BCO's native `etag` and extension/error
mechanisms. Because that public comparison was part of the frozen candidate, the
candidate was superseded rather than papered over with a release-evidence exception.

The C1 freeze manifest and candidate pin were removed from current release-control
state. The historical C1 Evidence run remains useful for debugging but is not valid
candidate-scoped Release 1 evidence. A successor candidate requires a new freeze,
pin, and complete candidate Evidence run.
