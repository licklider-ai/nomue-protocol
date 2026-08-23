# Offline Verification Run-Log (Development Evidence)

**Status: Informative, development evidence** (not Release 1 gate evidence

- see [../../release-1/README.md](../../release-1/README.md) for that
  distinction). Evidence toward gate R1-04 (external offline verification in
  clean environments,
  [../../../authority/release-1-gates.yaml](../../../authority/release-1-gates.yaml)).
  Publishing this evidence does not close the gate; a steward decision does.

## What `run-log.json` proves, and what it does not

Regenerate with:

```bash
pnpm exec tsx tooling/src/evidence/run-offline-verification.ts
```

The script monkey-patches Node's network-capable built-ins
(`node:http`/`node:https`/`node:net`/`node:dns`/`node:tls` request/connect
functions, plus global `fetch`/`XMLHttpRequest`/`WebSocket` if present) to
throw instead of connecting, **before** importing the reference verifier or
anything it depends on, then verifies six real fixtures spanning the
Phase 1 bundle, the Phase 2A bundle, a refusal path, a resource-limit
refusal, the hostile-URI adversarial fixture (B-009), and an emitter
fixture (E-003, a digest-mismatch case). `network_call_attempts` in the
run-log records every guarded call that fired; an empty array is the
positive result.

**This is application-level (Node API) interception, not OS-level network
isolation.** It does not use a network namespace, a firewall rule, or
packet-level capture (tcpdump/wireshark-equivalent) - building that was
considered for this evidence and explicitly not attempted: it requires
modifying system or security settings, which this project's agent tooling
does not do autonomously (see the batch completion report that introduced
this evidence for the full reasoning). A sufficiently determined bypass - a
native addon making a raw syscall, or a future dependency shipping its own
compiled networking code - would not be caught by this method. The
run-log's own `method` and `scope_limitation` fields say this explicitly,
so this evidence is not overclaimed by omission.

## Reproducing this evidence yourself

The point of "offline verification in a clean environment" (gate R1-04) is
that a third party can reproduce it without trusting this repository's own
claim. Run the command above yourself, in an environment with no network
access at all (a real OS-level guarantee, stronger than what this script's
own instrumentation provides) - if the reference verifier still completes
and this script still reports `zero_network_calls_detected`, that is
independent confirmation.
