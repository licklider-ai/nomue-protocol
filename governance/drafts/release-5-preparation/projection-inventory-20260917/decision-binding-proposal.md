# Release 5 decision and mapping reference proposal

Status: informative, unissued preparation. Input commit:
`f7786eb58ae45a23ae5cee3a63061ee8eef20d9e`, 2026-09-17.
This resolves two author-side choices into reviewable proposals. It does not
freeze a design, issue identifiers, alter the opening RFC or close a gate.

## Timing unit: one existing analysis occurrence

Propose one required timing status on each analysis occurrence covered by the
R5-aware family successor. The successor Record composition owns this addition;
the family still owns the existing analysis identity, relationships and all design
facts. There is no new analysis selector, timing map keyed by copied IDs, or
Record-wide timing fallback. A single-analysis family has one such occurrence.
A multiple-analysis family has one for every analysis that its exact accepted
bundle defines as R5-covered. Coverage is fixed by that configuration, not by
whether a producer supplies timing. Until the family defines that coverage and
composition, it cannot participate.

Each R5 result binds one occurrence using its existing identity, exact Record
revision and consumed family identities. Conformance obtains every required timing
value before any R5 result. A missing value on a covered occurrence fails owning
Record conformance; it does not quietly remove that analysis from coverage. This
proposal does not introduce partial Record conformance or independently dispatch
mixed bundles within a Record. Duplicate or ambiguous analysis identities likewise
fail the owning binding/conformance rule before projection.

For each occurrence, timing covers the complete decision: its selected Contract,
the applicable Profile and bundle, and every declaration used by its eight fact
cells. Shared declarations and identities are included in every decision consuming
them. The reference event remains access to any outcome in that decision's supplied
dataset, including observations outside its analysis population. Analysis-local
storage does not narrow that dataset-wide event to the analysis subset.

Two analyses sharing a dataset can truthfully have different statuses if their
complete decisions were finalized on different sides of the same access event.
If a shared projected declaration or shared Profile/bundle identity changes after
access, all consuming decisions lose eligibility to declare `pre_outcome`, even
if an earlier value is restored. An analysis-specific change affects the consuming
decision; unchanged decisions still require truthful declarations for the revision
being reported. No access history is reconstructed by the verifier.

Reordering analysis occurrences carries their own declarations with them. Identity,
not array index, binds timing and facts. The new revision has its own digest and
concrete source pointers; it need not have byte-identical evidence to the old
revision. Neither a revision change nor reordering alone establishes when the
selection decision was made. The producer applies the same RFC convention to the
actual decision history; the checker cannot establish that history.

### Fit to the opening RFC

The [RFC](../opening-rfc-candidate.md#timing-declaration-boundary) describes the
complete selection decision and dataset-wide event, but does not prescribe one
status for a whole multi-analysis Record. Its sole non-Profile input remains one
timing status for each projection; multiple projections do not introduce another
kind of input. Existing family carriers remain the sole identity carriers.
This is a proposed refinement of cardinality, not an already-adopted interpretation.
Acceptance needs a successor composition and an explicit owner decision. If that
decision changes the public question materially, follow the existing RFC process;
this draft neither resets nor guarantees preservation of the discussion window.

## Mapping reference: qualified table within a check version

Propose identifying a mapping by a structured pair: the exact family-specific R5
Public Check identifier and a local table key. Its version is the exact Public
Check version. The check definition binds this reference to one table owned by the
cross-cutting specification, one exact Profile version, accepted source surfaces,
and a fixed set of compatible Contract/bundle combinations. This uses the existing
check identifier family; it does not mint a `mapping` identifier family or make a
check identifier interchangeable with a Contract or Profile identifier.

The following is a conceptual reference grammar, not issued JSON field names:

| Component       | Proposed comparison and resolution rule                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Owning check    | Exact issued check identifier under the applicable ID policy, taken from accepted local configuration                                             |
| Table key       | Local lowercase ASCII key matching `[a-z][a-z0-9-]*`; compared byte-for-byte within the check definition; no URI or independently issued identity |
| Mapping version | Exact owning check version, with syntax supplied by the accepted check registry; no separate mapping version counter                              |

Do not serialize the pair by ambiguous string concatenation. A successor report
carries its distinguishable components (or reuses the result's already explicit
check identity/version) so a reader can recover the complete reference without
inference. The definition fixes one table key for its projection. Identical keys
under different check identifiers are different mappings. Reported components
must agree with the check instance and accepted bundle configuration.

Before registration, validate that each allowed combination resolves exactly one
mapping and each exact Profile version has one consistent table meaning across
all its supported combinations. A zero match, two matches, conflicting table bytes
or incompatible source surface blocks registration/configuration. A producer
cannot fix that defect by naming a preferred mapping in a Record. Distinct check
versions can refer to the same unchanged specification table, but cannot give an
unchanged Profile version contradictory meanings.

The accepted Protocol snapshot pins the check definition and owning specification
artifact. All resolution is local; URLs are identities, not network requests.
The runtime is not an authority that supplies missing table meaning. Replacing a
mapping's source, transform, applicability or meaning requires reviewed successor
semantics and a new check version; old check versions and old bundle interpretations
remain immutable. If the Profile meaning changes, its successor requirements also
apply. Cosmetic prose fixes that preserve meaning follow existing governance.

The deliberate trade-off is coupling mapping and check version changes rather than
adding an independently versioned registry. The RFC asks for the applicable mapping
identifier and version; the qualified pair and check version supply those without
assuming a new global identifier family. Schema encoding, registered identifiers,
meta-schema migration and authoritative artifact assignments remain R5-P5 work.
This document resolves the proposed reference method, not those acceptance gates.

## Planned checks and remaining limits

[The case specifications](case-specifications.md) expand the same 37 existing
locators. M03/M12 and T01/T02 cover cardinality and binding; M04/M07 and T09 cover
reference resolution, ambiguity and report mismatch. They remain handwritten plans.
No R5 schema, evaluator, fixture bytes or executed conformance result is produced.
Scientific source holds, family successors, mapping applicability, R3 population
meaning and failure/reason-code decisions remain open where already recorded.

Prepared with OpenAI Codex assistance in the author context. These choices concern
repository composition and reproducible references; no new external scientific
claim or primary-source inspection is asserted.
