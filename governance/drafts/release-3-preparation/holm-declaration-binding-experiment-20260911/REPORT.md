# R3 declaration-bound supplied-p Holm experiment

Status: bounded experiment review round complete after reviewer repair and author intake.
The candidate remains disposable and unissued; promotion and release gates stay open.
Date: 2026-09-11. Sole base: `1e6c4be371bc91f63577f70a5e0fc7742aef16a8` (PR #299).

## Result and scope

The corrected node calculation is confirmed. The bridge connects a caller-selected
D0 declaration and supplied-p sidecar to the pinned Holm arithmetic candidate, and
checks the complete submitted binding and every exact adjusted value and display.
It accepts only the scoped outcome
`declaration_bound_supplied_p_arithmetic_consistent`. Declaration truth and
scientific validity remain `not_asserted`; raw-p recomputation remains `not_run`.

This is not D0 completion, a supported public check, a method adoption, a Research
Gate closure, or a release. No authoritative files, existing packets, registries,
49-item classifications, or Release 2/4 artifacts change. The existing synthetic
Contract identifier remains an example; no official identifier is issued.

## Limited node correction confirmation

Only the node-count correction in PR #299 was re-examined here, not the entire
design or the external review. `check_nodes.py` reuses its materialized fixture,
but uses a breadth-first typed count instead of the original stack traversal.
Containers and scalar values count; object keys do not. It obtains 6,035 objects,
70 arrays, 35,319 strings, 1,024 numbers, and 2 booleans: **42,450 nodes**.
The former approximately 23,000-node estimate omitted growing population
reference arrays and experimental units.

The D0 cap remains **24,576**, conjunctively with all count, byte and depth caps.
The all-count-max fixture is therefore intentionally refused before worker launch.
It is not a promise that 16 analyses and 1,024 observations can coexist at every
other maximum. The submitted upper bound is
`24,576 + 2,048 + (1 + 120 * 4) + 3 = 27,108`, below **28,672**.
The three outer values are the root object, kind scalar and binding object;
the adjusted array has one container plus 120 objects with three scalar values.
Embedding a depth-32 declaration adds two levels, giving **34**.
`NODE-CONFIRMATION.json` records the result. This is author confirmation, not a
new independent design review.

## Implemented connection

`bridge.mjs` accepts three raw JSON strings: expected declaration, expected
sidecar, and submitted evidence. Raw byte and nesting guards precede the pinned
strict parser; node, string, container and finite-number guards precede D0
schema/relations and JCS. The original strict parser still calls `JSON.parse`
before its eligibility scan; it is not recharacterized as a streaming parser.
The D0 checker reparses the already bounded declaration using that same parser.

The selected all-pairs family has 3..16 groups and 3..120 members. Selection comes
from expected arguments. Full JCS equality binds even unrelated analysis context,
pair direction, timing declarations, hypothesis identity, sidedness, revision,
and exact supplied-p encodings. Sidecar identities use case-sensitive ASCII;
source/hypothesis tuples are unique. Timing declarations do not become eligibility
judgments. After all preparation checks, one private Python worker receives a
fresh closed carrier; it executes the hash-checked candidate bytes directly.
Only exact adjusted lattice hexadecimal values and display encodings return.
The coordinator validates response shape before comparing all rows. Diagnostics,
comparison counters and partial success do not become evidence identity.

`checkBinding` is the experiment entry point. `checkWithRunner` is trusted harness
injection only. Expected and submitted inputs never select executable paths or
code. `NOMUE_EXPERIMENT_PYTHON` is a trusted absolute runtime configuration, not an
input field. Worker failure is an experiment error, never an ordinary refusal.
The private JSON channel is generated internally; it is not another external
Record parsing route.

## Evidence

- **157 checks** pass in both normal Python and `-O`, with identical labels and
  outcomes. These are check counts, not 157 independent data sets.
- **15 integrity checks** pass, including eight runtime-file changes, an Ajv
  package change, Ajv origin substitution and restoration, direct worker candidate
  tampering, and the worker isolation controls added after external review.
- The copied D0 corpus remains **70/70**. Seven copied source files remain
  byte-identical to their immutable source pins.
- The normal three-member witness, 24 deterministic small families checked by a
  distinct all-subsets Bonferroni oracle, and the same-display/different-exact-value
  witness pass. Expected values are not obtained from the candidate alone.
- Different analyses with reused member names, changed data/context/origins,
  duplicate member IDs, false final rows, malformed JSON, oversized values and
  broken worker replies are rejected at the recorded stage. Early refusals launch
  no worker; arithmetic mismatches launch one and return no scoped success.
- Six isolated resource cases run in both Python modes (**12 probes**): baseline,
  120-member family, large admitted declaration, all-count-max refusal, wide
  strings, and long origin labels. Decisions agree between modes.

`RESULTS.json` contains generated labels, input hashes, sizes, decisions and
measurements; `INTEGRITY.json` contains generated integrity check labels.
The copied `oracle.py` preserves provenance; the connection harness uses the
separate JavaScript closed-testing construction in `fixtures.mjs`.

## Resource observations and design deviation

Historical author-host measurements follow. The external receipt and final author
intake below supersede the claim that no live sampling has been performed and
qualify the sum-of-peaks interpretation.

In the recorded Linux / Node 24.19.0 / Python 3.12.14 environment, the 12 isolated
probes finished within **0.456 seconds** each including process startup. The
largest sum of Node and worker peak RSS was **149,936 KiB** (about 146.5 MiB).
A large admitted declaration has 24,018 nodes; a wide-string case reaches
1,025,320 declaration bytes. These are observed cases, not exhaustive worst cases.

**The design's live process-tree RSS sampling/termination acceptance is not
fulfilled by this run.** The environment's virtualized `/proc` could not expose
the child process IDs to the sampler. The initial zero readings were discarded.
The final harness instead records Node's `process.resourceUsage().maxRSS` and
Python's `resource.getrusage(...).ru_maxrss`, requires positive measurements, and
checks their sum against 512 MiB after each isolated probe. There is one sequential
worker per probe: the sum of the two process peaks is a conservative bound on
simultaneous RSS for those processes, not a live sample, cgroup limit, or portable
memory guarantee. It excludes the external supervising Python process.

The 30-second external deadline, 25-second worker timeout, 256 MiB Python address
space limit, and 256 MiB Node old-space setting are active. Old-space is not RSS.
Native Node 24 TypeScript stripping avoids an extra loader process. A private
trusted temporary file carries worker resource diagnostics; it never enters the
numerical response or submitted evidence. Production runtime coverage, live RSS
termination and other host measurements remain open before promotion.

## Trust and remaining work

Eight runtime file hashes and 177 installed package file hashes are checked before
module loading, and Ajv's entry origin is bound. Python executes the very candidate
bytes it checked. Loader, manifest, built-ins, installed dependency resolution and
runtime environment remain trusted; fresh processes and no concurrent filesystem
mutation are assumed. This is not protection against an already hostile process,
custom loaders, or arbitrary module-cache poisoning. `SHA256SUMS` is the offline
packet inventory, not a self-authenticating trust root.

The next bounded action is external adversarial implementation review of ingress,
context binding, the private worker channel, all-row comparison, and the resource
measurement deviation (see `REVIEW.md`). Repair only concrete findings, record the
review against immutable content, and close this experiment round. General raw-p
generation, scientific input validity, official Contract/check registration and
release decisions remain separate. Naik acquisition is not a dependency here.

## Provenance

Accountable role: author-side protocol worker. Provider/tool: OpenAI Codex,
continuing the authoring context, 2026-09-11. No separate investigator or independent
primary-source review is claimed by these checks. Reviewed D0 and Holm source
commits and the design parent are recorded in `INPUTS.json`; applicable prior
research remains referenced by the design. No new primary-source acquisition or
new numerical method is asserted. This packet remains within the disposable
exploratory scope of the repository research gate.

## External implementation review receipt and repair

A user-supplied bounded adversarial implementation review of commit
`45bd42f0a8c5572af6187e76451f65d28124ab53` examined connection, refusal order,
dependency pinning and resource measurement. Reviewer/model identity and raw
artifacts were not supplied; the receipt is attributed to the user. The repair
was prepared in that reviewer's session on 2026-09-11, not by the original
author context, and is not an independent close review of itself.

Reported checks on Linux with Node v22.22.2 (native type stripping) and CPython
3.11.15: all seven copied sources matched their source commits byte-for-byte;
all eight runtime pins, 177 package pins, the Ajv origin and the packet
inventory matched; `check_nodes.py` and the copied D0 corpus (70/70) passed;
`run_suite.py` reproduced 157 checks in both Python modes with labels identical
to the recorded run; the coordinator's refusal order was read against the design
(raw type, size and depth, strict parse, node/type bounds, D0 counts and
relations, sidecar and submitted shapes, selection, family scope, member order,
canonical binding, output order, then one worker launch); the worker channel
was confirmed to execute the hash-checked candidate bytes, cap request and
response sizes, and treat stderr, timeouts and malformed replies as failures.

| Finding                                                                                                                                                                                        | Repair                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `test_integrity.py` launched the worker with the author's absolute Python path from the manifest and ignored `NOMUE_EXPERIMENT_PYTHON`, so the integrity suite could not run on any other host | The suite now honors `NOMUE_EXPERIMENT_PYTHON` like the coordinator                                                                                                                                                            |
| The worker inherited the coordinator's environment, so a `PYTHONPATH` entry shadowing a standard-library module could redirect the worker's imports                                            | The coordinator launches the worker with `-I` (isolated mode). Two integrity controls show the shadow is effective without isolation and inert through the coordinator                                                         |
| The Ajv origin-substitution control left the package alias redirected, which would mask later controls in the same isolated copy                                                               | The alias is restored and re-verified before later controls                                                                                                                                                                    |
| Live process-tree RSS sampling, required by the design, had not been executed anywhere                                                                                                         | `live_rss.py` samples the VmRSS of every process in each probe's session from `/proc` every 2 ms and terminates on the 512 MiB ceiling; `LIVE-RSS.json` records the run on this host, which exposes child processes in `/proc` |

Live sampling results: all twelve probes kept their decisions; the largest
live process-tree peak was 150,816 KiB, below the sum-of-peaks figure for the
same probe, and every probe received at least 96 samples. This confirms on
one host that the sum of process-reported peaks is a conservative bound for
these probes. It is still a host observation with a 2 ms sampling resolution,
not a hard limit or a portable guarantee; the author's environment could not
read child processes from `/proc`, so that deviation remains recorded above.

`RESULTS.json` and `INTEGRITY.json` were regenerated on the reviewer host after
the repair; their labels match the recorded run apart from the two added
integrity controls and the alias restoration check. Timings, peaks and
executable paths differ by host. The largest probe elapsed time was
0.494 seconds and the largest sum of process peaks 156,716 KiB.

## Author intake and bounded round closure

OpenAI Codex, continuing author context, 2026-09-11, inspected the returned commit
`cf6ae859857b6bdd2df3e313c82456131fca2731`, its sole parent
`45bd42f0a8c5572af6187e76451f65d28124ab53`, and tree
`4aa37b4a075679b986d45381e1d901568bd595cb`. The reviewer return is preserved as
an ancestor; this intake is not an independent scientific review.

The Python executable override, isolated `-I` worker launch, and Ajv alias
restoration are confirmed. Reproduction on the author host passes 15 integrity
checks and 157 connection checks in each Python mode; the twelve probes match
the reviewer record's decisions, launches, node/byte counts and input hashes.
All 25 returned inventory entries match. Review-host live measurements are
inspected as supplied evidence, not claimed as a new author-host live run.

One reporting correction is necessary. The receipt above says that the recorded
sum of process peaks bounds the live measurements for these probes. That does
not hold for every recorded row:

| Probe             | Python mode | Live RSS, KiB | Reported peak sum, KiB |
| ----------------- | ----------- | ------------: | ---------------------: |
| max-count-refusal | Normal      |       128,564 |                127,900 |
| max-count-refusal | Optimized   |       127,936 |                127,580 |

The reported live maximum of 150,816 KiB and its same-probe peak sum of 157,832
KiB are correct. However, those two numbers cannot establish an upper-bound claim
for every probe. `resourceMetrics()` reads Node's peak before the probe constructs
and writes its final report, whereas live sampling continues until exit. The RSS
interfaces and observation windows also differ. This is a plausible explanation,
not an isolated causal proof of the two differences. Treat the reported sums as
observations at their collection points, not guaranteed whole-lifetime bounds.
The ideal inequality for complete, comparable process lifetime peaks does not
establish that these particular samples satisfy it. Original JSON measurements
and the attributed review receipt remain unchanged.

Live sampling is now evidenced on the reviewer host; it is not a portable memory
bound, a hard limit, or proof that the ceiling-kill branch was exercised. The
2 ms setting is a requested sleep interval plus scan/scheduling time. Node
startup options, built-ins and installed runtime remain trusted; `-I` addresses
Python path/user-site injection, not arbitrary hostile runtime configuration.

This closes the bounded implementation-review round with no remaining mandatory
code repair identified by this intake. Historical pending-review and next-review
text above is superseded by this closure. Separate primary-source/promotion,
scientific input validity, public registration and release decisions remain open.
No main merge or adoption is implied. The next work is to inventory the R3
promotion conditions against this fixed candidate, without starting another
numerical method or repeating this review by default.
