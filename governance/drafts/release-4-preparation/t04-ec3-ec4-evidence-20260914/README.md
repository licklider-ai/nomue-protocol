# T04 EC3 / EC4 research evidence

Status: measurement preparation; EC3 and EC4 remain open until the saved evidence
and combined report are complete. This is author research, not independent review,
public policy adoption, or an issued reference implementation.

The branch starts from execution baseline
`3880db43a64e1758494f3c78f6850daab0e3e9e9` and reads numerical candidate
`66fa2bc201c86c62f21bb94825479427c24d8522` through an immutable exported snapshot.
It does not merge or rewrite the numerical research history. Existing supervisor,
G5 procedure, ingress dependencies, evidence and receipts remain unchanged.

## Reproduction

With the repository's locked Node dependencies installed, on Linux x86_64 with
Docker and cgroup v2 memory/PID controllers:

```sh
python3 -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/prepare.py /tmp/r4-ec3-stage
docker build -t r4-ec3-research /tmp/r4-ec3-stage
python3 -B governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/run_suite.py /tmp/r4-ec3-stage /tmp/r4-ec3-results
```

Both destination directories are new. The runner creates and removes only its own
uniquely named containers. It never prunes unrelated containers or images.
The image uses CPython 3.12.14 and Node 24.14.0; each execution captures the actual
image identity, executable hash, kernel and Docker version. These tags specify
runtime versions; only the captured image ID identifies the measured image bytes.

## Scope and predeclared selection criteria

`profiles.json` compares Small, Medium and Large engineering envelopes. The
historical worker settings are comparison inputs, not adopted public semantics.
Choose the smallest tested family that preserves the existing 5 MiB raw-input
allowance, completes the frozen normal corpus, and contains all negative controls.
A finite corpus cannot establish universal completion over J-cost(B,S-C).

Small deliberately explores a narrower 1 MiB raw-input/128 MiB tree envelope.
Medium reserves 512 MiB for the complete process tree, with a separate 256 MiB
worker address-space limit and 128 MiB Node old-space setting. Large explores
1 GiB tree / 512 MiB worker capacity and larger output envelopes. These are
constructive allocation and output budgets, not observed-maximum multipliers.
A size cap always remains a reference execution refusal boundary, not a public
numerical membership rule. G5's compact witness bound does not bound the full
report: the latter has a separate serialization/delivery cap.

The outer observer starts its wall measurement before container launch and ends
after report delivery, process-tree termination and container removal. It checks
cgroup memory/PID limits and absence of surviving container processes. CPU quota
limits rate, not total CPU seconds; the worker additionally uses RLIMIT_CPU.
Docker stop has a two-second signal escalation interval and a separate twelve-
second control-plane command timeout. Neither is a hard real-time kernel promise.
Control probes shorten only their own deadlines/CPU limits, with effective values
recorded; they do not redefine the nominal candidate profile.

The main supervisor's process-group cleanup is reused unchanged. The outer PID
namespace/cgroup supplies the additional boundary for escaped process-group
children, parent preparation and report construction. The research adapter does
not claim that the historical supervisor alone supplied this boundary.

AI-assisted author preparation is not an independent clearance. The next review
is the one combined T04 Independent Close Review requested by the steward.
