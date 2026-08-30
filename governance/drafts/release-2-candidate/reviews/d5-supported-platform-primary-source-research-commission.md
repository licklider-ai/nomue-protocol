# D5 supported-platform primary-source research commission

## Status and boundary

This commission records the research method used to prepare the R2-D5
supported-platform predicate. It is non-authoritative candidate-development
material. The research baseline is commit
`cb4c04ad5898d6e95797d252c5ecd2d839fc42c7`.

The commission does not select a Node release, V8 release, operating system,
architecture, executable identity, supported execution profile, supported domain,
runtime truth-error bound, Public Check, bundle, or Release 2 issuance state. It
does not change the current runtime or authority surfaces.

## Questions

The investigation answers the following questions before implementation fixes a
design:

1. Which binary64 results and operation order does current ECMAScript require for
   the operations used by the reviewed Student-t tail graph?
2. What do Node platform identifiers, support tiers, and implementation sources
   establish, and what do they leave unproved?
3. Which execution-state changes can invalidate a static platform assumption?
4. Can a static runtime matrix, a finite startup test, or a per-invocation check
   establish the premise required by the input-specific truth-error proof?
5. What is the minimum fail-closed predicate that can bind the premise to the value
   actually returned?
6. Does that answer cover only the `(degreesOfFreedom, testStatistic)` tail graph,
   or also the upstream paired-data G4 graph?

## Independent method

Three read-only passes were commissioned without a preferred implementation:

| Role                             | Independent question                                                                                | Required source class                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Normative-semantics investigator | What observable arithmetic does the language standard require?                                      | ECMAScript and IEEE standards                                                        |
| Runtime/platform investigator    | What do Node and V8 establish about builds, backends, native integration, and floating-point state? | Official Node and V8 documentation and source                                        |
| Falsification investigator       | How can each proposed predicate form false-accept or false-refuse?                                  | Primary standards, upstream implementation material, and the pinned repository graph |

A fourth, separately assigned adjudication pass reconciled the reports, checked the
decisive primary-source conflict, stated the threat model, and classified each
proposed control as required, diagnostic, or held. The coordinating synthesis pass
then checked the cited standard versions and the exact repository scope before
recording the disposition.

The public provenance is role-based; implementation-tool identities are outside the
evidentiary claim.

## Predeclared fail-closed rules

The investigation may recommend an implementation candidate, but it may not:

- infer numerical conformance from `process.platform`, `process.arch`, or a version
  string alone;
- treat Node support tiers or a finite Test262/project corpus as a universal proof;
- treat agreement between a graph execution and a later replay as proof that every
  intermediate of the returned execution had the required semantics;
- silently expand a tail-only result into upstream G4 or end-to-end paired-t
  support;
- admit unreviewed native callbacks or mutable execution state without stating the
  trust boundary; or
- activate runtime support when a required predicate component is unavailable.

## Outputs

The independent results are retained under
`review-inputs/r2-d5-supported-platform-primary-source-research/`. The adjudicated
project decision is recorded in
`d5-supported-platform-primary-source-research-disposition.md`.

## Recommission conditions

Primary-source research is recommissioned if the arithmetic graph, language target,
runtime family, threat model, native integration profile, or intended support scope
materially changes, or if a superseding standard or implementation source conflicts
with the recorded facts.
