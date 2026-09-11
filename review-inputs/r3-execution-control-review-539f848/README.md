# R3 execution-control plan review archive

This packet preserves an external adversarial review of
[PR #315](https://github.com/licklider-ai/nomue-protocol/pull/315), reviewed at
commit `539f8481b5c57f8d5740af16c7a46772188b85c7` against pre-change main
`8149731d9100b7faeae706be80cf37c7d7628dc9`.

Verdicts: the primary-source investigation is `REPAIR_REQUIRED` as the basis for
the supervisor design (its checked statements are accurate; three facts and a
kernel-version record are missing). The implementation plan is `REPAIR_REQUIRED`
with two blockers: the per-call cgroup layout cannot receive controllers as
described, and a partial OOM kill is forwarded as a valid `worker_failure` report.

- [REVIEW.md](REVIEW.md): identities, independence boundary, verdicts, findings,
  source verification, experiments and the minimal tests to add.
- [INPUTS.json](INPUTS.json): every repository file read to a decision, with blob id
  and SHA-256; the primary sources opened, with SHA-256; environment identities.
- [experiments/](experiments/): the scripts and `RESULTS.json` of the five
  reproduction experiments (process-set sampling, cgroup v2 lifecycle, `execFile`
  timeout with a retained pipe, OOM partial kill, leader kill leftovers).

The reviewed packet's files are not modified; every repair is stated in the review.
No merge, registration or release decision is made here.

## Reproduction

From the repository root, on Linux, with the pinned dependencies installed:

```sh
NOMUE_EXPERIMENT_PYTHON=/absolute/path/to/python3 \
NOMUE_REVIEW_V1_MEMORY_CGROUP=/sys/fs/cgroup/memory/<a writable cgroup you own> \
python3 review-inputs/r3-execution-control-review-539f848/experiments/run_all.py
```

`NOMUE_REVIEW_V2_ROOT` (default `/sys/fs/cgroup/unified`) must be a writable
cgroup v2 mount; no controller is required for E2. Without
`NOMUE_REVIEW_V1_MEMORY_CGROUP` the memory experiments are recorded as `NOT_RUN`.
The scripts create only cgroups named `nomue-review-*` under the given locations
and remove them.
