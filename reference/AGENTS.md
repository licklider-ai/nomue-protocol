# Agent Instructions - reference/

Rules for this directory. Root rules in [../AGENTS.md](../AGENTS.md) also apply.

- Everything here is non-authoritative. Never treat reference code as a source
  of specification meaning, and never derive conformance expectations from it
  alone; numeric expectations are cross-checked against independent oracles.
- The reference stats kernel is never normative authority; the mathematical
  definitions in `spec/` govern, and the kernel's summation strategy is an
  implementation note.
- No private dependencies: no private packages, private repositories, private
  paths, or identifiers from private authority systems.
- Never implement behavior that the public specification does not define. If
  an implementation needs undefined behavior, fix the specification first or
  record the gap in a release gate (NRS-GOV-0006).
- The verifier never fetches URIs, never executes Record-supplied code,
  containers, scripts, plugins, or commands, never loads remote schemas, and
  never emits an overall VERIFIED-style status. The code-path audits in
  `pnpm validate` enforce the mechanically detectable part of this.
- An unsupported interpretation bundle is refused, never interpreted as a
  nearby version.
- New third-party dependencies require pinning in `pnpm-lock.yaml`, license
  and attribution recording, and - for anything numerical - an explicit note
  on whether it shares lineage with existing dependencies (see ADR-0010).
