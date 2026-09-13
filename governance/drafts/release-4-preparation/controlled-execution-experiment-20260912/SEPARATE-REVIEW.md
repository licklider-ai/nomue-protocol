# Separate whole-packet review of the fixed R4 execution target

## Fixed input and provenance

Examined runtime/content commit: `1caac8df84ba73e73e160e844fcc228fc884f31c`.
Parent: `df33b8dd27d0a48f6465b7ceb9f492b1e3d0a562`.
Tree: `e0082be4d2582c8c2fcce0022189ae577e93c786`.
Record head reviewed: `f7be54ea8790d2d3d19a690690ed67e424eae6cb` (PR #331), whose
only delta from the target is the five author review files named in
[PACKET-REVIEW.md](PACKET-REVIEW.md). Main baseline
`4a62f8e1768049560cb0ce8f09ef1676cb42130b`.

Prepared on 2026-09-13 UTC with Claude (Anthropic; configured model identifier
`claude-fable-5-1`) in a Claude Code remote session, commissioned by the
repository owner supplying PACKET-REVIEW.md as the review input. The reviewer did
not author, repair or execute any earlier version of this packet or its
predecessors and had no access to the author's drafting conversation. Accessible
context: the repository at the record head, the PR #331 description, every
packet record including the author's own review, and the seven inherited
numerical files. No human review, no second separate-model pass, and no
primary-source acquisition were performed; the primary-method and IEEE review
scopes in [POLICY.md](POLICY.md) are neither repeated nor extended. This is a
changed-implementation review by a model separate from the authoring context.
It does not by itself satisfy the research-gate independent primary-source
requirement for any methodological claim.

Environment: Linux x86_64, kernel 6.18.44. The pinned CPython 3.12.14 was not
obtainable (the available interpreter index stops at 3.12.11 and the python.org
download is blocked by egress policy). Suite reruns therefore used CPython 3.12.3
with exactly one patch, `supervisor.platform.python_version` reporting `3.12.14`,
applied in a reviewer harness outside the packet; no packet byte was changed and
this is not a support claim for 3.12.3. The record head's own CI on 3.12.14 was
checked through the GitHub check-runs API instead.

## Disposition

No blocking defect was found on the fixed target. Three Low findings are
recorded below; two are reproducible gaps at the declared trusted-caller and
trusted-loader boundary and one is a stale figure in VALIDATION.md. None
requires a runtime change before the M3 joins, and any repair creates a new
target needing its own close-only review. This record is the separate
whole-packet fixed-input review that PACKET-REVIEW.md named as the immediate
handoff. Whether it satisfies the implementation portion of M4 is a steward
disposition; the methodological primary-source portion of M4 remains open. It
does not adopt policy, issue identifiers, approve a public execution range,
establish scientific validity, or authorize merge or release.

## Verification performed

| Control                     | Result                                                                                                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commit identity             | Target commit, parent and tree match the commission; the head adds only five review files                                                                                 |
| Runtime pins                | All 11 INPUTS.json runtime hashes match both the target and the record head                                                                                               |
| Inherited sources           | Seven files byte-identical to commit `97ef2926dbea7251d9fa611d4ada6513341f9826`                                                                                           |
| Baseline diff               | 31 files added since main, all inside this directory plus the dedicated workflow; no shared, R3, schema, registry, reference, dependency or generated file changed        |
| Record-head CI              | Ten check runs on `f7be54e` succeeded: five standard CI jobs, the R4 experiment and four R3 workflows                                                                     |
| test_execution.py           | 67 controls pass, normal and optimized parent                                                                                                                             |
| test_signal_lifecycle.py    | Ten controls pass, normal and optimized parent; thread-select cancellation observed at 0.15 s                                                                             |
| admission.py                | 320 rows; stdout hash equals the committed `1c01bf57...` reproduction hash, so rows are identical                                                                         |
| benchmark.py                | Seven rows identical to BENCHMARKS.json apart from elapsed time and environment                                                                                           |
| review_packet.py            | 19 controls pass, normal and optimized parent                                                                                                                             |
| Separate tail oracle        | 17 distinct (n, F) tail values from the committed evidence agree with an incomplete-beta continued fraction to at most 4.6e-14 relative; the nu=4 closed form also agrees |
| Reviewer adversarial probes | 13 probes; 11 behave as documented, two expose the Low findings below                                                                                                     |

Machine-readable results, including per-value oracle rows and each probe, are in
[SEPARATE-REVIEW.json](SEPARATE-REVIEW.json). The oracle is
[separate_tail_oracle.py](separate_tail_oracle.py); it imports nothing from the
packet or its pinned sources and runs on any CPython from this directory:

```sh
python3 separate_tail_oracle.py
```

The oracle establishes binary64 agreement on the observed inputs only. It is not
a primary-source review of the tail construction and not a whole-domain proof.

## Commission questions

| Question                              | Assessment and evidence                                                                                                                                                                                                                                                                                                                                                                                                                                          | Limit                                                                                                                                                                                            |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Output and mathematical boundaries | The 13-quantity/three-df inventory, exact-zero refusal (stage 4), rounded-zero SSE refusal (stage 5), F=0 tail one, containment plus equal endpoint rounding, and the refusal of tighter-but-non-containing intervals all match the pinned `complete.py`/`consumer.py` code paths. Signed zero changes the identity digest and not the arithmetic. The 17 committed tail values agree with the separate oracle.                                                  | Policy choices remain unadopted project conventions. Output validation checks structure and binding, not numerical truth; a well-formed wrong worker result is not detected by the parent.       |
| 2. Bounded input and ordering         | `transport.encode` checks exact builtin types before any length, iteration or conversion; subclass and hostile-dunder inputs are refused before launch. The consumer's original order (snapshot, envelope shape, identity, contrast/df binding, gcd/order, exact arithmetic, display, preflight, tails, containment) is unchanged; reviewer edge probes for zero, negative, unreduced and misordered endpoints all end as worker refusals, never abnormal exits. | Parent-side pre-checks report `input_refused` where the consumer alone would report an evidence refusal; POLICY.md discloses this as an execution precondition.                                  |
| 3. Actual execution limits            | `worker.py` applies core, address-space and CPU limits before any non-trivial import; CPU, allocation, deadline, closed-pipe hang, overflow, invalid output, crash, early EOF and stderr cases all suppress success and reap the worker on rerun. A valid JSON body followed by a nonzero exit and an external SIGKILL are also suppressed.                                                                                                                      | Address space is per worker, not aggregate memory. No universal latency bound; the 30 s wall includes host hashing and launch.                                                                   |
| 4. Lifecycle and partial output       | Ten lifecycle controls pass on rerun, including cross-thread blocked-select delivery, repeated signals at the kill boundary and launch failure. A signal arriving during deadline cleanup still propagates `SystemExit(143)` with the receipt. Unresolved outcomes carry no partial tails; forged partial unresolved output is refused.                                                                                                                          | Finding F2: a trusted caller that restored SIGPIPE's default disposition can lose the supervisor to EPIPE and orphan the worker. SIGKILL of the supervisor and host failure remain out of scope. |
| 5. Identity and grammar               | Host and worker both hash the 11 runtime files; the worker binds `consumer` origin; the result grammar recomputes identity from the request and rejects wrong identity, missing tails, extra keys and out-of-range encodings. Trust roots, single-process scope and the absence of cgroup or aggregate-memory claims are stated in README and VALIDATION.                                                                                                        | Finding F1: the parent hashes `transport.py`/`output.py` bytes but imports those modules by name without origin binding, unlike the inherited consumer.                                          |
| 6. Reproduction and claim size        | All README suites and the packet controls reproduce (67/10/320/7/19 in both parent modes on 3.12.3 with the version patch; 3.12.14 through record-head CI). Admission rows are byte-identical; benchmarks are identical apart from timing. Admission is described as an algebraic restatement, not an oracle, and benchmarks as observations.                                                                                                                    | Finding F3: VALIDATION.md still quotes the be2c488 benchmark maximum. Reruns were not on the pinned interpreter.                                                                                 |
| 7. R3 and promotion holds             | The diff since main touches only this directory and its workflow. M3 joins, policy adoption, identifiers, release and the public window are stated as open in README, COUPLING and PACKET-REVIEW.                                                                                                                                                                                                                                                                | None observed.                                                                                                                                                                                   |

## Findings

### F1 (Low) Parent-side module origin is not bound to the hashed bytes

Location: [supervisor.py](supervisor.py) `host()` lines 32-35 and `run()` lines
245 and 270. Expected: after `host()` verifies the SHA-256 of `transport.py`,
`output.py` and `supervisor.py`, the modules that `run()` actually imports are
those files, or the call is refused. Observed: `host()` hashes the files at
their repository paths while `run()` imports `transport` and `output` by bare
name through `sys.path`. With a shadowing `output.py` earlier on the path, a
forged transport is exposed as `completed_worker`. The inherited `consumer.py`
binds `__file__` origin for its own dependencies, so the new parent layer is
weaker than the dependency it wraps. This lies inside the documented trusted
loader root and does not affect the worker, whose `sys.path` is set explicitly.
Reproduction from any other working directory:

```python
import os, sys, tempfile
from unittest.mock import patch
d = tempfile.mkdtemp()
open(os.path.join(d, 'output.py'), 'w').write('def validate(outcome, payload):\n    return None\n')
sys.path.insert(0, d); sys.path.insert(1, PACKET_DIR)
import supervisor as s
bogus = {'kind': 'r4-controlled-experiment', 'scientific_validity': 'not_asserted',
         'limits': {'address_space': [s.MEMORY]*2, 'cpu': [s.CPU, s.CPU+1], 'core': [0, 0]},
         'outcome': {'state': 'completed', 'result': {'forged': True}}}
with patch.object(s, '_launch', return_value={'category': 'completed_transport', 'causes': [], 'transport': bogus}):
    print(s.run([[0., 1.]]*4, 't')['category'])   # completed_worker
```

Suggested repair for a later target: in `host()`, import the three packet
modules and require `Path(module.__file__).resolve()` to equal the hashed path,
mirroring `consumer.py`; or state the caller-path precondition in README.

### F2 (Low) SIGPIPE default disposition in the caller orphans the worker

Location: [supervisor.py](supervisor.py) lines 126-130 and `host()`. Expected:
a worker that closes stdin before the payload is fully written produces
`BrokenPipeError`, which the write branch handles. Observed: that branch relies
on CPython's startup `SIG_IGN` for SIGPIPE. A trusted caller that restored the
default disposition, as some command-line programs do, is killed by SIGPIPE at
the write (supervisor exit status -13) and the still-running worker survives its
parent; the reviewer probe found the child alive afterwards. README lists
handlers, wakeup fd, reaping and SIGCHLD as caller obligations but not SIGPIPE.
Reproduction:

```python
import signal, sys
sys.path.insert(0, PACKET_DIR)
import supervisor as s
signal.signal(signal.SIGPIPE, signal.SIG_DFL)
# probe: os.close(0); time.sleep(60)
s._launch([sys.executable, '-I', '-B', 'close_stdin_hang.py'], b'x' * 800000, wall=2)
```

Suggested repair for a later target: refuse in `host()` when SIGPIPE is not
ignored, as is already done for SIGCHLD, or ignore SIGPIPE for the launch
interval and restore it with the other handlers; or document the precondition.

### F3 (Low) Stale benchmark maximum in VALIDATION.md

Location: [VALIDATION.md](VALIDATION.md) line 19 states the largest observed
benchmark wall interval as 1.347 s. That is the be2c488 capture; the committed
BENCHMARKS.json at the target records 1.430 s for `ordinary-46`. Documentation
drift only; the repaired-head reruns in the same file are otherwise consistent
with the committed evidence.

## Observations without finding

- `review_packet.py` prints no optimization flag, so identical normal and
  optimized stdout hashes in PACKET-REPRODUCTION.json are expected; the two
  PACKET-PROBES files are byte-identical and equal that recorded hash.
- `output.validate` does not bind refused outcomes to the request identity.
  A refusal is never success, so this is acceptable for the experiment.
- A cancellation that arrives during cleanup after a deadline yields causes
  `['deadline', 'cancelled']` and category `cancelled`, consistent with README.
- The workflow pins actions by major tag, matching the repository's other
  workflows.

## Claim-to-review applicability for later promotion

| Final claim                                     | Reviews it can inherit                                                                               | Still required before promotion                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Bounded execution, transport and result grammar | Author tests, supplied signal reviews, this changed-implementation review                            | Close-only review of any repaired target; final host/limits decision          |
| Tail values on observed inputs                  | Inherited fixed-corpus checker, this 17-value oracle agreement                                       | Nothing further for the observed rows; no supported-domain promise follows    |
| Tail construction as a supported-domain method  | PR #278/#283/#285/#286 derivations and PR #287/#294 primary-method scope, within their pinned scopes | Separate primary-method investigator for any changed or widened claim         |
| Output representation and containment policy    | Consistency with code confirmed here; steward normal-model receipt for scope                         | M1 steward policy decision; these are project conventions, not external facts |
| Admission constants and candidate range         | Algebraic consistency only                                                                           | Independent justification of resource constants or a narrower tested range    |
| Whole R4 support                                | None                                                                                                 | M3 joins, M4 methodological closure, M5 RFC/steward decision, M6 freeze       |

## Milestone disposition

M1 stays open pending the policy decision. M2's fixed target is reviewed here by
a separate model with no blocking defect; F1 and F2 are optional hardening at a
declared trust boundary and F3 is documentation. M3 is unchanged. M4's
implementation portion now has a separate-reviewer record on the fixed target;
its methodological portion remains open. M5 and M6 are unchanged. R3 keeps
priority at shared-file collisions. No runtime byte was changed by this review.
