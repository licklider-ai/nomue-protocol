# Capability Evolution Roadmap

**Status: Informative planning document.** This file does not define Protocol
meaning, issue identifiers, register support, open an RFC, set a release date, or
change any current review window. Authoritative meaning and support remain governed
by the specification, registries, RFC process, and Release Policy.

## Operating model

Scientific research may run ahead of implementation. Implementation should continue
as bounded vertical slices: each Analysis Contract reaches its own research,
review, numerical, conformance, and decision closure before it is treated as
supported Protocol meaning.

Several independently closed Contracts may later share a publication train, but a
shared publication does not merge their semantic or evidence obligations.

Research planning is intentionally broader and may run far ahead of this
implementation roadmap. See the [Protocol Research Frontier Map](research-frontier-map.md).
Its research bands do not change current capability, RFC, or release ordering.

## Current work

- **Paired two-condition continuous / paired t** — Release 2 public review and
  candidate development are in progress. The current priority is to close the
  bounded Release 2 numerical evidence and decision sequence without expanding its
  reviewed scope.

## Research-complete successor candidates

The completed P1-A Research Gate provides a design handoff for two separate
rank-based successor Contracts:

- **Paired Wilcoxon signed-rank** — remaining work includes the exact rank/equality
  rule, exact-computability/resource boundary, deterministic output projection, and
  the final output guarantee boundary, including the unresolved interval semantics.
- **Independent Mann-Whitney / rank-sum** — remaining work includes the exact
  rank/equality rule, exact-computability/resource boundary, deterministic output
  projection, and a successor Contract/Public Check surface. The initial research
  handoff deliberately does not provide a confidence interval for the probability-
  of-superiority effect.

These are separate Analysis Contracts and should close independently even if later
published together.

## Early research priorities

- **Independent multi-group continuous inference** — research should establish the
  omnibus and contrast estimands, comparison-family definition, multiplicity
  semantics, admissibility/refusal boundaries, and reusable numerical evidence
  requirements before a Contract is frozen.
- **Survival / time-to-event inference** — start long-lead research early because
  censoring, time origin, event definitions, and tie semantics add data meaning in
  addition to numerical procedure choices.

## Later research queue

The following remain candidates for later Research Gate work. Their ordering is not
fixed by this document:

- repeated-measures continuous inference;
- factorial and interaction inference;
- categorical outcomes;
- correlation and linear-model inference;
- count outcomes;
- nonlinear and dose-response inference.

Nonlinear and iterative-fitting procedures should not be rushed into a public
recomputation Contract before convergence, initialization, solver identity, and
numerical-tolerance semantics are sufficiently bounded.

## Promotion rule

A planning position in this roadmap is not support. A capability becomes Protocol-
backed only through the normal public path: applicable Research Gate, RFC and review,
complete authoritative change set, conformance and independent evidence, recorded
decision, and published supported bundle.
