# Holm full-invocation admission experiment

Unissued research; base main `0169708c9c640a3fbf4e65ce37f1fd50b07e01b6`.
Read [SCOPE.md](SCOPE.md) for the R3/implementation/deployment boundary and the
next coordinated public-candidate work. This experiment adds measurements to the
unchanged [controlled launcher](../holm-controlled-execution-20260911/README.md).

## Question, evidence and fixed protocol

Can the selected trusted Linux x64 invocation complete the six predetermined
input shapes under the existing 512 MiB call limit, 64-task limit, zero swap,
one-CPU bandwidth and 30-second deadline, after requesting a Linux cache reset
as well as on a subsequent fresh-process repeat? The cleanup allowance remains
3 seconds. The test does not seek the smallest possible limit or establish a
worst-case resource theorem.

[SOURCE-REVIEW.md](SOURCE-REVIEW.md) and its [INPUTS.json](INPUTS.json) are the
separate investigator's Research Gate pass, preserved without author rewriting.
The coordinator accepted its bounded full-invocation design before implementing
measure.py. The investigator shares the author's inherited model configuration
and infrastructure; it is not a distinct-provider or human review.

The stock supervisor hashes 41 runtime files and the executables before Node
starts. That preflight is retained. A tiny launcher enters a fresh D/supervisor
before exec of the supervisor; D/calls/call-ID contains the original limited call.
The test records hierarchical memory.peak at D and the original call-leaf peak.
D is a measurement hierarchy without a newly asserted 512 MiB aggregate limit.
Initial current/peak charges are recorded even before tasks enter; a newly created
cgroup is not assumed to have zero kernel memory charges. They are not subtracted
from the later hierarchical peak.
The launcher allocations made before cgroup membership and pre-existing shared
page charges are not retroactively moved into D.

The six shapes are baseline; 120-member family; 1024-observation declaration;
16-group/256-observation/16-analysis combined admitted declaration; existing six
D0 variants; and the over-node-limit 16-group/1024-observation/16-analysis refusal.
The first five are expected to complete all five checks and forward the original
Record bytes; the last is expected to produce record_nodes with no forwarding.
prepare.mjs declares these expectations before invoking the verifier and reuses
the separately derived fixture oracle. It records exact sizes, node counts and
input digests. They are representative boundary shapes, not every admissible input.

For each shape, run three pairs, in fixed order, for 36 trials. Every trial uses
a fresh supervisor process and fresh D. Before the first trial in each pair:

1. Write/fsync a dedicated 4 MiB sentinel and observe its resident pages using
   a nonfaulting mincore mapping; close the mapping.
2. sync, write 3 to /proc/sys/vm/drop_caches and observe drop_pagecache/drop_slab
   counter increments. There is no readback of this write-only control.
3. Observe zero resident sentinel pages through a new nonfaulting mapping.
   Missing events or failed sentinel eviction fail cache preparation.
4. Run the complete unchanged supervisor invocation and preserve OS observations,
   scoped output checks, original-byte forwarding hash and external elapsed time.
   This includes interpreter startup and final report serialization in the external
   interval; the internal interval retains its original definition.
5. Collect D's peak/events/accounting, kill/remove only owned D after the direct
   child has been waited for, then run the warm repeat without another reset.

The CI uses a disposable GitHub-hosted Ubuntu VM. Global cache reset requires both
the explicit --disposable-host-cache-reset opt-in and hosted-runner environment
checks; never use it on a shared or self-hosted machine. These checks prevent
accidental invocation, not a security boundary against a trusted operator forging
environment values. Only owned cgroups are created/removed; root controller policy
is checked, not modified. The external harness has a 45-second invocation timeout.

## Interpretation and reproduction

A successful cache-reset request plus sentinel eviction is not proof that every
runtime page, slab object, disk cache or CPU cache is cold. Active mappings and
on-disk bytecode may survive; other VM activity may repopulate files. Preflight
deliberately rewarms source files before the call leaf starts. Warm trials can
reuse cache pages charged elsewhere; peak differences are not physical RAM savings.
Do not add/subtract separately timed peaks to infer a supervisor peak. The enclosing
measurement is supporting admission evidence, not a production service budget.

Run local input/expectation checks without cgroup or cache changes:

```sh
python3 -I governance/drafts/release-3-preparation/holm-execution-admission-20260911/measure.py --output local-admission.json
```

The dedicated workflow performs the actual kernel measurements. Output retains
all attempted trial judgments, cache facts, cgroup observations and scoped checks.
Repeated base64 Record bytes are replaced by verified input hashes; a raw stdout
digest is recorded but the complete stdout transport is not archived. This
projection is explicit, not described as byte-identical raw execution stdout.

The unchanged kernel/envelope/launcher and their prior reviews are reused within
their scope. This work does not change public requirements, schemas, reasons,
registered bundles or numerical policy, close B-2, ratify a supported execution
profile, or authorize R3 publication. Results and their limitations are recorded
after the dedicated run; they do not replace the next coordinated public candidate.
