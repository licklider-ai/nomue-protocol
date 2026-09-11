# Admission measurement harness: bounded method review

Date: 2026-09-11. Verdict: **REPAIR_REQUIRED** for failure-evidence retention.
The declared measurement method and its scope are supported. This is not a
statistical-method review, B-2 decision, or Release 3 adoption review.

## Role and snapshot

The reviewer is the same separate-context OpenAI-assisted investigator who
prepared this experiment's primary-source report. The reviewer did not implement
the harness, but did influence its design through that report and subsequent
method recommendations. Same inherited model configuration and shared execution
infrastructure; no different-provider or human independence is asserted.

Five inspected file identities are fixed in INPUTS.json. In particular,
measure.py SHA-256 is
`9ca365c383867d044e9d7c795c75608f917f655dad7cf83a9bf71c951aec611d`.
The snapshot is a working-tree candidate, not an asserted immutable commit.
No repository files were changed. No real cache reset, cgroup write, or dedicated
kernel trial was executed by this review.

## Required repair

**S-01: exceptional preparation and cleanup failures can lose the attempted trial.**

In main(), reset_cache() runs before a trial row is appended or its output is
written. A sync/write/read/mincore failure, including a missing event counter,
therefore escapes without that trial's evidence. A first reset failure leaves no
admission-results.json at all. Early host admission or input preparation exceptions
have the same report-availability gap. An always-run upload step cannot recover a
file that was never written.

In trial(), the first outer cgroup kill, process.kill(), and communicate(timeout=5)
in the finally block are outside the protected teardown handler. An exception here
escapes the function, replacing the original failure path and losing its row.
The initial delegation mkdir also precedes the try block.

These are evidence-retention failures, not demonstrated false passing numerical
judgments. They conflict with the README's preservation claim and can erase the
conditions most relevant to interpreting a failed admission experiment.

Repair by writing an initial report before fallible preparation; recording the
current phase and partial cache evidence; catching each attempted trial's failure;
and persisting its failed row before exit. Protect outer kill, direct-child wait,
peak collection, and subtree removal independently so later failures do not erase
earlier facts. Checkpoint writes should use atomic replacement. A failed or
unavailable cache-preparation step cannot produce a passing measured trial.

Safe local controls in SAFE-CHECKS.json reproduced both paths with synthetic
exceptions and ordinary temporary directories. The helper never called the real
reset function or wrote to /sys/fs/cgroup:

| Control                                         | Observed result                                     |
| ----------------------------------------------- | --------------------------------------------------- |
| First reset raises a synthetic OSError          | Exception escapes; no output report exists          |
| Trial times out, then outer process kill raises | Cleanup exception escapes; no trial row is returned |

## Accepted aspects and limitations

- The stock source checks and call policy remain intact. Joining the enclosing
  hierarchy before supervisor exec captures its subsequent charged activity;
  launcher startup before membership remains expressly excluded.
- Fresh enclosing cgroups avoid ambiguous peak reset semantics. Leaf and enclosing
  peaks are retained separately and not added or subtracted.
- The reset requests sync then drop_caches=3; event deltas and owned-sentinel
  residency support the bounded claim. No invalid sysctl readback is required.
- Fresh-process warm repeats, fixed shapes and repetitions, expected refusal,
  original-byte forwarding hashes, and scoped checks match the described method.
- No finding establishes a false PASS in the ordinary successful trial path.
- GitHub-hosted identity plus an explicit flag are appropriate accidental-use
  guards under the stated trusted-operator assumption. They are not proof against
  forged environment variables, which the README already discloses.
- D has no claimed 512 MiB enclosing limit; shared prior charges, cache attribution,
  hardware caches, and finite-sample limits are stated. The SCOPE note correctly
  leaves fleet engineering outside this increment.
- The external cleanup owner is not proven to reap arbitrary adopted descendants
  if the stock supervisor is killed. This is not a new claim in the candidate;
  supervisor-crash recovery remains explicitly unclosed.

A bounded follow-up can close S-01 by inspecting the repaired paths and rerunning
the two failure controls. Dedicated kernel results remain the author's experiment
until independently executed or explicitly reviewed as received evidence.
