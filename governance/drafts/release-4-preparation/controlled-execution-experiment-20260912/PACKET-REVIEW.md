# Whole-packet author review and next-work disposition

## Fixed input and provenance

Examined runtime/content commit: `1caac8df84ba73e73e160e844fcc228fc884f31c`.
Parent: `df33b8dd27d0a48f6465b7ceb9f492b1e3d0a562`.
Tree: `e0082be4d2582c8c2fcce0022189ae577e93c786`.

Prepared on 2026-09-13 UTC using OpenAI Codex in the continuing author context.
The reviewer authored and repaired this packet, can see the preceding discussion
and supplied review reports, and is not an independent investigator. No additional
agent, separate-model review or new primary-source acquisition was performed.
Root contribution/governance instructions, the packet's commission, policy,
coupling, execution/transport/result code and inherited complete/consumer paths
were consulted. Earlier numerical review conclusions are reused only within the
scope recorded in POLICY.md; this is not a repeat mathematical source review.

Disposition: no additional blocking defect found in this bounded author pass.
The packet remains an unissued M1/M2 candidate suitable for a separate whole-packet
review. This report does not close M4, approve a public execution range, establish
scientific validity or authorize adoption, merge or release.

## Commission questions

| Question                              | Assessment and evidence                                                                                                                                                                                                                                                   | Limit                                                                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Output and mathematical boundaries | Ten arithmetic values plus three probability values and three df pairs are present. Factor swaps, translation and exact power-of-two scaling preserve the expected relations. Exact/rounded zero and conservative containment policies match the complete/consumer paths. | Submitted evidence covers the three probability rows, not an independently submitted table of all 13 values. Policy choices are not yet adopted.                                         |
| 2. Bounded input and ordering         | Exact builtin types precede length/iteration/conversion; counts and scalar sizes bound transport work. Added subclass traps are refused without calling overloaded operations. Consumer checks identity and contrast/df before endpoint reduction and numerical work.     | Concurrent mutation and hostile in-memory module replacement remain outside the trusted caller boundary.                                                                                 |
| 3. Actual execution limits            | Worker applies address-space, CPU and core limits before decoding/numerical imports. Existing execution controls rerun successfully; failed execution does not expose an outcome.                                                                                         | Worker address space is not aggregate memory. Process creation and OS scheduling do not provide a universal latency bound.                                                               |
| 4. Lifecycle and partial output       | Ten lifecycle controls rerun successfully, including blocked-select cross-thread cancellation, repeated cleanup signals, caller-loop exit, restoration and kill-before-reap. Added malformed unresolved output is suppressed.                                             | SIGKILL/host failure, escaped malicious descendants and external child reapers remain outside scope.                                                                                     |
| 5. Identity and grammar               | Runtime bytes match the fixed target; host checks manifest hashes. Signed zero remains identity-sensitive. Wrong identity, missing tail and extra result keys are rejected by the public experiment entry.                                                                | Output validation checks structure and binding, not an independent recomputation of numerical truth; a numerically wrong but well-shaped trusted worker result is not thereby disproved. |
| 6. Reproduction and claim size        | Normal/optimized executions each pass 67 controls; lifecycle each passes ten; admission has 320 rows and benchmark has seven expected outcomes. New packet controls each pass 19.                                                                                         | Shared-constant admission algebra and metamorphic checks are not an independent full-domain numerical oracle. Optimized parent runs keep the worker's fixed normal interpreter command.  |
| 7. R3 and promotion holds             | Baseline diff is confined to the R4 packet and its dedicated workflow. Shared schemas, registries, reference runtime, dependencies and R3 files are untouched.                                                                                                            | M3 joins and authoritative adoption are still open; accepted R3 changes take priority when shared integration begins.                                                                    |

## Added controls and reproduction

`review_packet.py` checks its runtime files against the immutable target before
executing. It contains one hand-derived numerical witness (four within-cell
(-1,+1) deviations give SSE=8), output inventory, four transformations, four
hostile/invalid input types, signed-zero identity, and four forged-output cases.
Transformation checks test relations between executions; they do not constitute
a second numerical implementation or independent methodological review.

On the README host, from this directory, with the target commit available in git:

```sh
python3 review_packet.py
python3 -O review_packet.py
```

A shallow checkout first needs the target commit fetched; these are manual review
controls, not additional steps in the existing experiment workflow.
PACKET-PROBES.json and PACKET-PROBES-OPTIMIZED.json retain their full outputs.
PACKET-REPRODUCTION.json records fresh executions of all six README commands and
both new probe commands. Its stdout hashes identify transient reruns; the full
transient outputs of the six original commands are not newly archived. Their
previous complete captures are retained unchanged, rather than relabeled as this
pass's output. No source was repinned and no runtime or numerical code was changed.

## Ordered next milestones and exit conditions

| Order                       | Concrete remaining work                                                                                                                                                                                               | Completion condition                                                                                                                                                           |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| M1 final policy disposition | Resolve the output representation choice, supported input/resource range and probability-evidence carrier/containment contract. Distinguish mathematical facts from project conventions using POLICY.md's claim map.  | Traceable bounded decisions and applicable review reuse; no silent policy selection from benchmark results.                                                                    |
| M2 implementation candidate | Current execution repairs are complete within the supplied review scope; retain this tested runtime as the integration input.                                                                                         | Whole-packet review addresses all seven commission questions on a fixed target.                                                                                                |
| M3 Record integration       | Prepare raw parseStrictJson ingress, design/unit identity, exact bundle/schema binding and separate conformance/result reporting from COUPLING.md.                                                                    | A bounded successor with positive and negative fixtures; shared shape follows accepted R3 decisions. No issued identifiers or authoritative edits before the required process. |
| M4 independent review       | A reviewer uninvolved in this implementation examines the fixed packet and records involvement, evidence and findings. Methodological promotion separately checks eligible primary-source reviews and remaining gaps. | Required review evidence covers the final claims; author self-review and supplied signal-only confirmation are not substituted.                                                |
| M5 adoption                 | Assess RFC impact and changed-scope implications, then obtain the applicable steward decision.                                                                                                                        | Coordinated authoritative change set and valid governance disposition.                                                                                                         |
| M6 freeze/release           | Pin the accepted candidate, validate the coupled artifacts and close applicable release conditions.                                                                                                                   | Explicit release decision; public-window expiry alone is not adoption.                                                                                                         |

The immediate handoff is the existing REVIEW-COMMISSION.md with the immutable
input above, this report and the supplied signal-repair confirmation preserved in
PR #331. New review records can be committed without changing those runtime bytes;
any later runtime repair creates a new target and needs affected validation.
