# Published Release 1 boundary correction

Date: 2026-09-18 UTC. Read-only factual correction for the R3 handoff; this is
not a Release 1 gate or candidate decision.

The takeover report described R1 as unpublished/tagless and concluded that review
could resume only after refreezing and resigning. That premise is incorrect.
GitHub's [release-1 release](https://github.com/licklider-ai/nomue-protocol/releases/tag/release-1)
was published at 2026-08-24T03:22:47Z, release ID 375423969, draft=false,
prerelease=false, with eight assets. Its signed source/snapshot/checksum artifacts
and published trust root remain the historical release, not the current R3 tree.

| Identity                | Fixed value                                                        |
| ----------------------- | ------------------------------------------------------------------ |
| Annotated release tag   | `1be66121bc8943e5ee1a31dec4c619ce4dacbacf`                         |
| Peeled tag commit D     | `5db97826e0905a72e0fed14536d820e77af9be95`                         |
| Candidate content C8    | `83d07d03f27cec0c245cf836c042e5378733b0a2`                         |
| Signed-release commit R | `47eeafb0b2b096658cacf219bf5af867b687c6a7`                         |
| Snapshot SHA-256        | `fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06` |

The identities were checked against the remote tag, release API and retained
release evidence. The current development tree fails `--check-candidate` because
it is not C8. This says nothing by itself about invalidating the published release.
The Release Policy's candidate freeze/gate-review constraint applies until
publication. The existing release-1-history checker intentionally audits preserved
published history while permitting later additive successor work.

At intake the historical integrity check returns no issues, including its frozen
manifest and checksum/snapshot signature checks. This is not a new signing
ceremony or a claim to have rerun every archived Release 1 gate. No candidate
manifest, release-control pin, gate registry, signature, tag, audit constant or
historical evidence is changed. The review/repair source branch's final nine-file
diff likewise contains no attempted Route A reset; those edits were rolled back.

R3 continuation therefore needs neither an R1 refreeze nor R1 resigning. A future
proposal to replace a release candidate or published signed artifact is a separate
steward decision under the Release Policy. Do not convert the failed development-
tree candidate comparison into a mandate to reset fourteen historical gates.
