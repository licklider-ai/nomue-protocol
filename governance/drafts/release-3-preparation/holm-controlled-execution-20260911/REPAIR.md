# Disposition of the external execution-control review

Input: PR #316, 4f4c10e55e352760fcde64c9560e9f995df49e71.
The external report and experiments remain unchanged in review-inputs.
This coordinator disposition records implementation responses, not a release gate.

- BLOCKER-1: explicit empty D and D/calls distribution nodes; both levels enable
  controllers; supervisor sibling placement; CI demonstrates EBUSY before moving.
  The old plan omitted the layout; it did not establish that every possible host
  layout fails. The concrete omitted constraint is accepted and repaired.
- BLOCKER-2: group OOM plus post-cleanup memory/pids counter deltas invalidate even
  exit-zero output. The original reproduction used cgroup v1 and a simulated
  report; it is not represented as prior v2 enforcement evidence.
- SHOULD-FIX-3: actual writable cgroup2 and per-leaf interfaces, controller
  distribution and readbacks; optional peaks; recorded kernel and feature floor.
- SHOULD-FIX-4: subreaper, ECHILD, populated=0 and successful removal are separate
  cleanup facts. Reap only in a supervisor dedicated to one invocation.
- SHOULD-FIX-5: unconditional subtree kill and owned per-call TMPDIR cleanup.
- SHOULD-FIX-6: fixed native Node TypeScript path, no tsx/esbuild launch.
- SHOULD-FIX-7: regular-file cap+1 ingress; two-pass context deferral preserves
  Record priority; bounded base64 transport forwards the original snapshot.
  Caller re-reading is intentionally not adopted because it can read changed bytes.
- SHOULD-FIX-8: explicit private categories, precedence and all-cause retention;
  inner worker failure forwarded only without outer control violations.
- SHOULD-FIX-9: explicit trusted-program premise, sanitized child environment and
  closed inherited descriptors. No unsupported same-uid escape-prevention claim.
- SHOULD-FIX-10: charged peak observations, memory max events and stall handling;
  cold-cache sizing remains an uncompleted validation item. No shared cache drops.
- SHOULD-FIX-11: apply the separate review's primary-source findings and hashed
  mirror identities as an additive source basis. Original HTML hash gaps remain
  historical facts, not silently repaired by assigning different bytes' hashes.
- NICE-TO-HAVE-12: record cpu.stat including throttling fields.
- NICE-TO-HAVE-13: record /proc/swaps alongside swap-control readback.
- NICE-TO-HAVE-14: retain and explain the existing worker RLIMIT_AS behavior.
- NICE-TO-HAVE-15: exec(3p) was not re-inspected by the external reviewer and is not
  a dependency of this cgroup design. No new claim relies on that passage.

The source basis is the original investigation plus the external review's
kernel/man-page/Node/Python checks and immutable input inventory. No new numeric
methodology is introduced. Implementation review and actual execution results are
recorded separately after the candidate is pinned.
