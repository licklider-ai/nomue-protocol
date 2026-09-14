# Separate-review intake and Low-finding disposition

The owner supplied the separate review committed as
`47b8803282de83576563e350395a1c13ab683a67`, directly atop record head f7be54e.
The three original review files are preserved without edits. That review found
no blocking defect in runtime target 1caac8d and three Low findings. The declared
separate-model provenance, lack of human or new primary-source review, and
CPython 3.12.3 version-patched rerun limitation remain as reported.

This response and the repairs were prepared by the original author using OpenAI
Codex in the continuing author context. They are not a close-only independent
review of the successor. M4's implementation portion now has supplied separate
review evidence for 1caac8d; its acceptance is a steward disposition. No M4 gate
is closed by importing that evidence, and methodological review obligations are
unchanged. The branch intake preserves review provenance; it does not adopt policy.

| Finding                                          | Disposition                                                                                                                                                                                                                        | New control                                                                                                                                                                                         |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1: parent module shadowing                      | Check transport/output origin against the packet before use. For uncached imports, resolve the origin before import so a shadow module is not executed; check cached module origins too. Unexpected origins fail host eligibility. | Four isolated path/cache shadow cases across both modules require pre-launch refusal; shadow files contain an execution marker that must remain absent.                                             |
| F2: SIGPIPE default can terminate the supervisor | Require SIG_IGN in host() and direct `_launch` before any child creation. Preserve caller disposition; a custom handler is also refused because it could raise during a pipe write. Document the invocation-wide precondition.     | Two isolated default/custom disposition cases require refusal through both entries; Popen is replaced by a failing sentinel and caller disposition is checked unchanged. No test creates an orphan. |
| F3: stale benchmark maximum                      | Replace the obsolete 1.347-second statement with the maximum of the new committed BENCHMARKS.json and identify its row.                                                                                                            | Derive the text from the saved capture after rerunning the benchmark.                                                                                                                               |

The trusted loader, module machinery and in-memory code remain trusted; forged
**file** values or concurrent module/disposition mutation are not authenticated
by path checks. No numerical algorithm, representation rule, admission constant,
worker limit or R3/shared artifact changes. INPUTS.json is deliberately repinned
for supervisor.py only; seven inherited files remain identical to their source
commit. The workflow adds the six host controls in normal and optimized modes.

## Close-only review handoff

Use the final successor commit and tree recorded in PR #331, not the moving branch.
Compare against 47b8803, separating preserved review files from the runtime repair.

1. Confirm all three supplied review files are byte-identical to 47b8803.
2. Inspect origin resolution before execution and cached-module refusal. Confirm
   genuine packet modules still work and no unsupported hostile-loader claim.
3. Inspect both SIGPIPE entry guards, pre-launch refusal and state preservation.
4. Run test_host_boundaries.py normally and with -O, then the 67 execution and ten
   lifecycle controls in both modes. Compare all seven inherited files and pins.
5. Run review_packet.py with the exact successor commit as its sole argument,
   normally and with -O; its default remains the historical reviewed target.
6. Reconcile VALIDATION.md with BENCHMARKS.json and the separate review's actual
   interpreter limitations. Keep its 17-value oracle evidence bounded to those
   observations and the final CI attached to the successor, not an earlier head.

Return findings and whether F1/F2/F3 are resolved within this scope. Formal
support, M1 policy decisions, M3 joins, methodological gate acceptance, merge and
release are outside this close-only request. R3 retains priority at collisions.

## CI scheduling margin correction

R4 run 34758948730 on d05e51f failed in the existing CPU probe: its three-second
wall deadline arrived before the one-CPU-second SIGXCPU limit. The receipt showed
deadline, successful reap and no result. This is consistent with scheduling delay
on a shared runner; the log does not measure its cause. The CPU probe now allows
15 wall seconds while retaining the one/two-second CPU limits and requiring the
cpu_limit category. Deadline remains a failure for this control. Production limits
and the separate short wall-deadline probes are unchanged. This test-only repair
and fresh execution captures belong to the final successor, not the failed run.
