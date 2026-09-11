# First composition adversarial review receipt and response

The user supplied an external adversarial review of immutable commit
`cd121030d40942493d24c104ff87e05070826c42` on 2026-09-11. Reviewer identity,
model identity, execution artifacts and institutional independence were not
supplied. The receipt is attributed to the user; it is not a manager-authenticated
independent scientific review. This document summarizes all reported findings.
The manager authored the repair with OpenAI Codex in the original author context.
This is not an independent close review of the repair.

Reported conclusion: no blocking mathematical or binding defect; three medium
issues to address before interface freeze. Reviewer reproduced 312 checks,
source hashes and CI, independently derived the n=4/F=4 witness, and tested
identity substitution, signed-zero digests, endpoint subclasses and widening.

| Finding                                                           | Response                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6500-bit admission permits impractical n=65 runtime               | Added joint count/operand-width/precision guard before expensive arithmetic to candidate and oracle. Reported 1100/2200/6500-bit n=65 inputs refuse immediately. Absolute bit ceiling alone is no longer the admission policy. Sample timings recorded; no full runtime proof claimed. |
| Plan row 14 has no submitted-tail-evidence entry point            | Explicitly deferred in REPORT. Upstream F interval checks are not tail evidence checks. No new evidence-consumer API is introduced to close a documentation gap.                                                                                                                       |
| Pins not enforced; historical results unpinned                    | Seven dependencies checked before adapter imports; historical results included. Seven individual file mutations rejected. Manifest/loader remain trusted.                                                                                                                              |
| Assertions disappear under python -O                              | Test check now raises explicitly; normal and optimized executions both pass and write identical assertion counts.                                                                                                                                                                      |
| Oracle 512-term cap nearly reached                                | Added n=65, F=256, 512-bit boundary regression. Existing explicit cap refusal retained; no new supported domain or higher cap inferred.                                                                                                                                                |
| Point-route test tautological; midpoint/widening coverage missing | Classified point test as wiring only; added midpoint ambiguity and actual wider-enclosure containment checks.                                                                                                                                                                          |
| Unused helpers/imports; duplicate point evaluation                | Point evaluation now reused. Historical unused Decimal diagnostic/imports retained for source traceability; not called by adapter.                                                                                                                                                     |

No IEEE source gap is closed here. The user is obtaining that standard separately.
No original upstream packet, prior reviewer evidence, specification, registry,
formal supported range, adoption or release state changes.

Reproduce with `test_adapter.py` under normal Python and `python -O`, then
`test_repair.py`. The latter rewrites measured timing values. The former reports
324 assertions, including exactly 219 accepted historical encodings and one
specific resource refusal. The old 312-result record remains in the parent.

## User-supplied repair close review

The user subsequently supplied a bounded review of bdc2cc4 (sole parent cd12103).
It reported no new blocking defect, reproduced all 324 checks normally and under
optimization, confirmed seven hash checks and recorded successful CI. It accepted
the workload guard, source integrity repair and explicit row-14 deferral. The
last item is a documented scope reduction, not implemented tail-evidence checking.
The reported admitted worst-case sample timings were 6.9, 3.8, 4.3 and 1.3 seconds
for n=33,17,9,5 respectively; these external measurements were not rerun here and
are not universal runtime guarantees.

One low finding remains addressed by this documentation successor: the original
report understated raw-data admission loss. REPORT now explains the 61-bit limit
at n=65, provides 20 deterministic raw-data probes, and qualifies the approximate
46-per-cell observation with the actual width-dependent formula. The optional
plan annotation is also added. Numerical implementation and manifest pins are
unchanged. No additional broad review cycle is required by this management
receipt; the bounded repair task can close while research/domain and row-14
requirements remain open. Reviewer identity/model and external independence
remain unverified; the additional probes and response are author-side work.
