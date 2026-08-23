# R1-07 Candidate C8 refresh

**Candidate C:** `83d07d03f27cec0c245cf836c042e5378733b0a2`  
**Pin P:** `bed7823a011dc452989b9bbae94bd6b44aabb4bc`  
**Recorded:** 2026-08-24

Candidate C8 was independently frozen and validated in read-only workflow run `32674410486`. The freeze remained 608 files, the gate-definition digest remained `092836ca774f89b53d726998c8548468ea28b9ac7e13304ddeaf4cf92f66e32b`, and the only C7 to C8 frozen delta was candidate-neutral status wording in `governance/RELEASE-SIGNING-PLAN.md`.

The Protocol snapshot remained 83 authority-scoped files with hash `sha256:fc26c770538abe3598fc27a571ca6e99cc29763e0a25859a80c267ee2d80ab06`. Exact Candidate C8 CI run `32674233138` and exact P8 CI run `32674754177` both passed. `pnpm snapshot:manifest --check-candidate` passed after P8.

R1-07 is therefore re-evaluated and remains closed/pass for Candidate C8. R1-14 remains separately open until fresh C8/R8 production signing and final D equivalence checks complete.
