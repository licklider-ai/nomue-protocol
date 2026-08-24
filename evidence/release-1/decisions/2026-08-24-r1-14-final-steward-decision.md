# Release 1 — Final steward decision for R1-14 and publication authorization

**Decision date:** 2026-08-24  
**Candidate C:** `83d07d03f27cec0c245cf836c042e5378733b0a2`  
**Pin P:** `bed7823a011dc452989b9bbae94bd6b44aabb4bc`  
**Release source R:** `47eeafb0b2b096658cacf219bf5af867b687c6a7`  
**Decision authority:** Release Steward

## Decision

**R1-14 — Release signing: PASS.**

The fresh Candidate C8 / release-source R ceremony verifies all three fixed signing targets, rejects a tampered copy, proves the signed Protocol snapshot equal to R for 83/83 scoped files, and captures three successful Cloud KMS `AsymmetricSign` audit records matched by exact target digest. The public audit copy removes `callerIp` and `callerSuppliedUserAgent` while retaining decision-bearing fields.

This decision closes the final Release 1 gate and authorizes the controlled publication sequence, subject to the mandatory post-decision checks in `governance/RELEASE-SIGNING-RUNBOOK.md`.

The publication tag is defined by role: it points to the release-decision commit that introduces the final R1-14 close record and this authorization. This decision intentionally does not contain that commit's own SHA.

This decision does not itself rename the repository, create the tag, create a GitHub Release, or change repository visibility.
