# Restart and final review handoff

Read root AGENTS.md and its read-first files, then this packet's README.md,
CLAIM-REVIEW.md, CONTRACT-PROPOSAL.md, RFC-IMPACT.md, COUPLING.md and SELF-REVIEW.md.
Resolve the current PR head before review; base is fixed in INPUTS.json.
Do not modify old candidates, archive bytes or reviewed source pins to make tests pass.

## Reproduce current work

Use pinned Node 24.19.0 / Python 3.12.14 and install lockfile dependencies.
Set NOMUE_EXPERIMENT_PYTHON to the actual interpreter and NOMUE_TEST_OUTPUT to a
scratch output directory. Run from the repository root:

```sh
node --import tsx governance/drafts/release-3-preparation/holm-adoption-preparation-20260912/check.mjs
node --import tsx governance/drafts/release-3-preparation/holm-adoption-preparation-20260912/test_fixtures.mjs
node --import tsx tooling/src/validate.ts
```

The dedicated adoption workflow additionally runs actual Node 22 rejection and
cgroup controls plus public projection of the resulting receipts. A local run
without delegation records NOT_RUN; it is not hosted enforcement evidence.
The check does not refresh fixtures or pins. Author fixture generation and pin
refresh are explicit operations performed only after source/diff review.

The historical numerical applicability script is archived with a .txt suffix.
Copy it and INPUTS.json to a scratch directory under their original basenames,
and pass a checkout of 234abcaf256eac491a68b4b4b1593bf3983a8992. Its stdout is the
JSON result; it does not create RESULTS.json. Running against current main fails
the old AGENTS.md hash intentionally. Historical pins stay unchanged. Current
numerical applicability is separately proved by the three source hashes in
CLAIMS.json; historical reproduction is not a new independent review.

## Bounded independent review request

Review the exact submitted head as a changed-public-surface implementation review.
First disclose authorship/repair involvement, source access, model/context and
independence limits. Prior human/Claude review of #318–#325 is preserved; this
request does not ask to relitigate that participation or reacquire unchanged PDFs.

Determine whether candidate.4 faithfully separates conformance from verification
under NRS-VERIFY-0005, keeps evaluation order/gating and every scoped result,
refuses schema-invalid and corrupted public outputs, and forwards only original
bytes after all prerequisites and execution controls succeed. Check the
structural-pass versus semantic-not_run distinction and invented-pass mutations.
Assess whether input-size not_observed is truthful and bounded; check new typed
registry grammar/propagation/constant proposals against the adopted ID policy.
The required verdict is bounded reuse/readiness, not adoption or release.

Reproduce the packet, fixture and actual-host evidence as applicable. Check that
candidate.py, worker.py and bridge.mjs retain the B-2 reviewed bytes. No new
mathematical method or scientific FWER claim is proposed. Mark unobserved evidence
as such and return blocking repairs separately from future authoritative joins.
Preserve a fixed-head report and input hashes in a new review packet/PR.

After review, continue the four steps in COUPLING.md. The next engineering unit is
the complete unissued conformance/dispatcher/output-protocol join; the remaining
work is not only approval paperwork. Formal R3 discussion remains open.
