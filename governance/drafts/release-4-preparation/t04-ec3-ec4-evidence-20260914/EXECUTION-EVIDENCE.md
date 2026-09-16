# Existing execution evidence and reuse boundary

All rows are historical inputs except the new full-invocation measurements.
The exact commits and runtime hash pins are in [INPUTS.json](INPUTS.json).

| Evidence                                                                           | Exact claim supported                                                                                                          | Host                                                                                     | Full invocation?                                  | Main-integrated?               | Reusable for EC3?                                                 | Limitation                                                                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Controlled experiment supervisor, lifecycle, host and execution tests at `3880db4` | Trusted worker ownership; pidfd/WNOWAIT; group kill before reap; wall/output bounds; signal cancellation; source-origin checks | Linux x86_64 CPython 3.12.14                                                             | Historical builtin-input single-worker invocation | Yes, PR #331                   | Yes, unchanged mechanisms                                         | Not raw Record ingestion, G5/S-C, parent/tree memory or complete new report                         |
| T02 supervisor-mode repair and saved mode tests                                    | Isolated supervisor asserts its own optimization flag; historical production worker stays normal                               | Linux x86_64 CPython 3.12.14                                                             | Historical test scope                             | Yes                            | Yes, mode discipline                                              | Does not automatically cover this new adapter; parent and new research worker check their own flags |
| Historical execution/admission/benchmark/packet plus 17-value oracle archive       | Fixed numerical and execution outcomes for historical tail consumer; saved-result validation repaired at `98bea06`             | Archived host plus successful Linux CI run 34826661709                                   | Historical worker scope                           | Yes                            | Restricted comparison and preservation                            | n<=65 transport and legacy numerical guards are not J-cost(B,S-C)                                   |
| Main merge checks at `3880db4`                                                     | Integration checks succeeded (six workflows), as recorded in merge intake                                                      | GitHub Linux CI                                                                          | No new G5 invocation                              | Yes                            | Integration state only                                            | Does not adopt resource values or close EC3/EC4                                                     |
| Existing strict parser and limits; NRS-SEC-0001/2/3/4/5/6                          | Raw canonical eligibility, offline/no-code constraints, bounded input and in-process budget checkpoints, refusal separation    | Existing reference basis                                                                 | Existing verifier scope                           | Yes                            | Direct reuse of unchanged ingress functions; obligations retained | Experimental Phase 1/2A budget is not a new R4 numerical semantic rule                              |
| G4 fixed-cost and G5 128 complete Records at `66fa2bc`                             | Reviewed J-cost(B,S-C), Z-B, exact 22-value procedure and independent expected vectors                                         | Windows CPython 3.12.10 author evidence; independent numerical close supplied by steward | Numerical research pipeline only                  | No, divergent research history | Fixed procedure, inputs and expected results                      | G5 simulated timeout/crash controls are not actual resource enforcement                             |
| New EC3 measurements                                                               | Raw input through unchanged strict parser, parent preflight, fixed G5 execution, validation, bounded report, outer containment | Newly measured Linux container and host in HOST.json                                     | Yes, explicitly defined research invocation       | New research branch only       | New evidence                                                      | Unissued profile; finite corpus; not production completion or whole-domain runtime guarantee        |

The historical supervisor always owns its child until group cleanup and reap.
It does not promise containment of an arbitrary child that creates a new session.
The new outer cgroup/PID namespace tests that separate boundary explicitly.
Historical receipts, POLICY/COUPLING and numeric oracle files are not rewritten.

## Main/numerical delta

The histories diverge at `2732a26fd61d4e726fbd95b4d7622574cfcd9d82`.
The numerical side adds T03, Architecture and G1-G5 assets and overlays historical
POLICY/COUPLING/README. The execution side adds reference-source ownership and
contribution instructions, saved-evidence validation repair, and PR #331 merge.
The endpoint diff is recorded verbatim in INPUTS.json; absent numerical research
files on main are not represented as historical deletions.

- **NO MATERIAL NUMERICAL IMPACT:** numerical files are loaded from the exact
  reviewed snapshot with G5 identity and fixed cost hashes checked.
- **MATERIAL EXECUTION IMPACT — EXPECTED:** main supplies the current supervisor,
  strict ingress dependencies and security constraints; the new outer research
  wrapper covers previously unmeasured parent/report/tree boundaries.
- **No material conflict in the chosen composition:** the two snapshots remain
  separate. No rebase, merge, conflict resolution or historical draft overlay
  replacement is performed. This is not a judgment that future source integration
  has no conflicts.

T02 and EC1/EC2 are not reopened.
