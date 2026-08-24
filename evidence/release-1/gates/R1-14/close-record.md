# Gate Close Record: R1-14 — Release signing

- Decision: **pass**
- Decision date: 2026-08-24
- Authority: Release Steward
- Candidate C: `83d07d03f27cec0c245cf836c042e5378733b0a2`
- Pin P: `bed7823a011dc452989b9bbae94bd6b44aabb4bc`
- Signed release source R: `47eeafb0b2b096658cacf219bf5af867b687c6a7`
- Protocol snapshot: `sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06`

## Disposition

No open R1-14 deviation remains. All three fixed signing targets verify, the tampered-copy test fails closed, the signed Protocol snapshot equals R for all 83 scoped files, and the three current Cloud KMS audit records match the fixed target digests.

The Release 1 publication tag points to **the release-decision commit that introduces this final R1-14 close record and final release authorization**. This record intentionally does not contain that decision commit's own SHA.

After the decision commit exists and before tagging, the release procedure independently confirms candidate equivalence, all three signatures, and signed Protocol snapshot equivalence against the decision commit.

GitHub's automatically generated source archive for the publication tag is not a KMS-signed target. The separately attached `source-archive.tar.gz` generated from R is the signed Release 1 source artifact.
