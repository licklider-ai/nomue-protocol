# Controlled execution review and evidence archive

This packet retains the final implementation review and execution observations for
[PR #317](https://github.com/licklider-ai/nomue-protocol/pull/317), candidate
`dc6c9694d6a5221dfed0ea5bf4af55246549cd68`.

The reviewer report and its independently authored controls are preserved with
an output checksum manifest. The investigator used a separate context with the
same inherited model and shared infrastructure. Rootless state-machine probes
are separate from real kernel observations; neither is described as an
independent numerical-method review.

Coordinator additions are this README, REGRESSION.md, INTEGRATION.json,
and local-results.json.txt. The reviewer archive includes the exact final CI receipts.
The .json.txt files preserve the exact generated JSON bytes, without reformatting.
The CI ZIP digest and raw-file hashes are recorded in the integration receipt.
Original failing review observations are retained alongside final repaired results.

## Completed observations

The final dedicated Linux CI run passed 32 controls (including seven rootless
file/transport controls). Actual v2 observations include the internal-process
EBUSY before supervisor placement, successful controller distribution afterward,
group OOM in Node and Python, task exhaustion, cancellation/deadline, output
caps, adopted-descendant reaping and isolated simultaneous calls. All exercised
cleanup paths recorded populated=0, ECHILD, call-leaf removal and temporary
storage removal. Scoped refusals/failures and the baseline, 120-member,
large-declaration and six-variant calls passed through the actual entry point.

The standard five-job CI passed for the same candidate. The coordinator also
reproduced the 82 author controls, 93 archived investigator controls and 132
legacy fixtures; see REGRESSION.md. These regression counts do not establish
resource enforcement by themselves.

## Remaining promotion evidence

The two main design defects from PR #316 have concrete repairs and real v2
observations. This advances the implementation beyond the earlier NOT_RUN state.
It does not freeze the 512 MiB research budget as a supported public limit.

Before the supported execution profile is finalized, retain cold-cache admission
and sizing evidence, specify and validate the production service budget/concurrency
and supervisor-crash cleanup, and integrate the private execution categories with
the coordinated public report/refusal schema, reasons and exact-bundle dispatch.
The research implementation uses trusted code and a same-uid environment; it does
not claim a hostile-code privilege boundary. Resource evidence is not a release
or scientific-validity decision.
