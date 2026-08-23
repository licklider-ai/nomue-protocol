# R1-08 Independent Oracle Evidence Generator

**Status: Informative, evidence-authoring only.** This directory produced the
evidence bundle under
[../../evidence/development/r1-08-independent-oracle-v1/](../../evidence/development/r1-08-independent-oracle-v1/)
that gate R1-08 (independent numerical oracle and common-cause failure
control, [../../authority/release-1-gates.yaml](../../authority/release-1-gates.yaml))
closed against with decision `pass`. It is not part of the shipped verifier
and is never invoked by `pnpm check`; it runs only via `pnpm oracle:r1-08`.

## Why this directory calls a subprocess

`src/run.ts` uses `node:child_process` `spawnSync` to invoke a local Python
virtual environment (`python-flint`, for the FLINT/Arb arbitrary-precision
oracle in `python/arb_oracle.py`) — a real dependency on the execution
surface that the shipped verifier's code-path audits forbid
(NRS-SEC-0002, `tooling/src/phase1/audits.ts` `auditExecutionSurface`).

This is deliberately excluded from that audit
(`tooling/src/phase1/audits.ts`, `sourceFiles()`:
`!rel.startsWith("tooling/r1-08-oracle/")`) because:

- it processes a hardcoded, repository-local corpus of numeric test cases
  (`src/corpus.ts`) — it never reads, parses, or executes a Record or any
  Record-supplied content;
- it is a one-shot, human-triggered evidence-authoring tool, not a code path
  reachable from `nomue-record verify` or any other end-user command; and
- the independence argument for R1-08 itself depends on this oracle being an
  implementation genuinely disjoint from the shipped stats kernel
  (`reference/stats-kernel/`) and its dependencies (ADR-0010) — running it
  in-process inside the verifier, or reimplementing it in TypeScript, would
  undermine the disjoint-lineage argument the gate evidence relies on.

## Evidence immutability

Once generated and committed, the files under
`evidence/development/r1-08-independent-oracle-v1/` are frozen historical
evidence (the same convention as conformance fixtures: a correction adds a
new dated evidence bundle rather than silently rewriting the old one). Text
inside those generated files that describes the gate as still open reflects
the state at generation time, before the separate commit that closed the
gate; it is not live prose and is not re-derived by `pnpm validate`. The
authoritative current gate state is always
[../../authority/release-1-gates.yaml](../../authority/release-1-gates.yaml).

## Running it

The immutable historical evidence is reproduced only from its recorded clean
reproduction commit `6c4de5c1ac693f300efa424d56d3fb89e344558d`:

```bash
pnpm oracle:r1-08
```

A current or future Release Candidate must instead use candidate mode, which writes
to a separate evidence directory and explicitly identifies candidate C:

```bash
NOMUE_ORACLE_CANDIDATE_COMMIT=<40-hex-candidate> \
NOMUE_ORACLE_EVIDENCE_DIR=candidate-evidence/oracle-r1-08 \
pnpm oracle:r1-08
```

Candidate mode refuses to overwrite the historical evidence directory and verifies
that the execution checkout matches candidate C for the numerical kernel, oracle
tooling, package manifest, and lockfile before producing evidence. The candidate
workflow installs the exact Python dependencies from `environment/requirements.txt`
and archives the complete oracle evidence bundle rather than stdout alone.

Local reproduction requires a Python virtual environment with `python-flint` and
`mpmath` at the exact versions in `environment/requirements.txt`; `src/run.ts`
checks the repository-local venv locations on Windows and Unix. The shipped verifier
never invokes this Python path.
