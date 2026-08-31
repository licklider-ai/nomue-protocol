# Release 2 candidate review protocols

This directory publishes review protocols and recorded dispositions so that the
scope, checks, and maturity boundary of each review can be inspected and reproduced.

Publishing or executing a review protocol is not third-party certification,
external endorsement, or evidence of community consensus. Each disposition must
state the exact reviewer separation, evidence, findings, and limited meaning of its
verdict.

Primary-source research that prepares a numerical decision follows the same public
separation discipline. The supported-platform commission, independent role results,
adjudication, and bounded disposition are recorded in
`d5-supported-platform-primary-source-research-commission.md`,
`../../../../review-inputs/r2-d5-supported-platform-primary-source-research/`, and
`d5-supported-platform-primary-source-research-disposition.md`. Closing that
research authorizes only a later non-authoritative implementation candidate; it does
not select or certify a runtime platform.

The resulting tail-only implementation review, its Section H cross-runner
supplement, and their bounded disposition are recorded in
`../../../../review-inputs/r2-d5-supported-execution-predicate/` and
`d5-supported-execution-predicate-adversarial-review-disposition.md`. The review
closes the implementation-candidate review requirement only. It does not populate
the runtime allowlist, enforce the controlled-process profile, complete per-tuple
admission evidence, or select a supported execution predicate.

The upstream G4 paired-data actual-execution trace candidate was reviewed under
`d5-g4-execution-trace-candidate-adversarial-review-protocol.md`. The original
independent review is retained in
`../../../../review-inputs/r2-d5-g4-execution-trace-candidate/REVIEW-RESULT.md`. It
found exactly two refusal-classification blockers: per-pair first-failure ordering
and non-root reduction-overflow classification.

The bounded repair was reviewed under
`d5-g4-execution-trace-repair-close-review-protocol.md`, with the close-only result
retained in
`../../../../review-inputs/r2-d5-g4-execution-trace-repair-close/REVIEW-RESULT.md`.
That review returned `CLOSED` with no repair-induced findings. The combined bounded
disposition is recorded in
`d5-g4-execution-trace-adversarial-review-disposition.md`. This completes the G4
implementation-candidate review requirement only. It does not establish a G4
mathematical-truth error bound, compose the G4 and Student-t tail traces, complete
confidence-interval composition, select resource or platform support, close R2-D5,
or authorize Release 2.
