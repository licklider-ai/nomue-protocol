# Supplied supervisor review: findings and repairs

Input: PR #331 head `be2c488701eafc3f863313ddde9b72359dee88bc`.
Received through the user conversation on 2026-09-13 UTC. The reviewer reports
code/evidence inspection, no PR comment, and no local suite execution because
their CPython 3.11 host fails the 3.12.14 guard. Reviewer/model identity was not
provided; no additional human, different-model or primary-source claim is made.

All six findings are accepted for repair. The earlier SELF-REVIEW closure of
the launch cancellation race was insufficient and is explicitly superseded.
The review also reported no issue with inherited seven-file source identity,
transport round trips, result grammar, refusals, admission algebra, benchmark
expectations or workflow failure behavior; those statements retain its stated
code-reading, rather than executed-suite, scope.

| Finding                                                                                        | Repair                                                                                                                                             | Executed control                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. pthread_sigmask only masks the calling thread; cancellation during Popen can orphan a child | Remove masking and exception-raising handlers. Record the first signal and wake a self-pipe without raising; retain the Popen handle before acting | An additional unmasked thread sends SIGTERM after actual child creation and before Popen returns; worker is killed/reaped, handlers and fds restored |
| 2. A second signal can interrupt entry into cleanup before SIG_IGN                             | Keep the same non-raising handlers installed through all cleanup; no SIG_IGN transition                                                            | Send repeated SIGTERM/SIGINT pairs at the actual killpg boundary; cleanup and restoration complete                                                   |
| 3. Returning a cancellation receipt swallows termination                                       | After cleanup raise KeyboardInterrupt for SIGINT or SystemExit(143) for SIGTERM, attaching the receipt                                             | Uncaught run() loops exit on each signal and never print the next-iteration marker                                                                   |
| 4. killpg after wait can signal a reused PID/group                                             | Observe exit through pidfd and waitid(WNOWAIT), kill the group while the child PID remains owned, then wait/reap                                   | Instrument every group signal to confirm child wait ownership and every wait to require the preceding group signal, including normal exit            |
| 5. Admission ceiling is not an independent oracle                                              | Describe it as an algebraic restatement with shared constants; correct code comment, validation and PR body                                        | The 320 rows still agree, but only policy-expression consistency is claimed                                                                          |
| 6. Fixed 10 ms polling wastes wakeups                                                          | Block select for remaining deadline; self-pipe wakes cancellation and pidfd wakes child exit                                                       | A hung invocation uses two selector calls over the 200 ms test, with a remaining-deadline timeout above 100 ms                                       |

The non-raising signal handler handles the multithreaded signal-delivery case
without claiming general asynchronous-exception safety. The main thread owns
signal handlers and the child. Other threads may not replace handlers or reap
that child; SIGCHLD has its default disposition. A detected lost child ownership
suppresses group signaling. Process-group cleanup remains a trusted-code design,
not protection against children escaping the group or a process-tree memory cap.

Existing 67 execution controls and the new seven lifecycle regressions are run
on CPython 3.12.14, with normal and optimized parent variants. Numerical sources
remain unchanged. A successful algebraic admission check cannot detect shared
wrong constants, justify their resource values, or replace a numerical oracle.
The separate hand-derived small numerical witnesses retain their actual scope.

No R3/shared schema/registry changes, formal adoption, merge or release occur.
The repaired head still needs the applicable fixed-head close review before
promotion; this response is an author repair receipt, not that independent review.
