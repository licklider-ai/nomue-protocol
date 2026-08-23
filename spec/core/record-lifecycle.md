# Record Lifecycle State Model

**Status: Normative.** v0 of the Record lifecycle state semantics
(Batch 6, design approved by the steward; rulings recorded in
[ADR-0028](../../governance/decisions/ADR-0028-record-lifecycle-v0.md)).
The three skeleton intents are CORE by ratified mixed-placement decision;
axis names, the precondition grammar, and the clarification format are
STABLE-INTENT; the disclosure-notice artifact type is EXPERIMENTAL and
managed separately from the CORE intents. Agent session state and
interactive protocols remain Layer 2
([layer-boundary.md](layer-boundary.md), NRS-CORE-0001/0002).

## Skeleton intents

<a id="NRS-CORE-0013"></a>
**NRS-CORE-0013 - State is orthogonal axes, never a single enum** (stability: CORE, status: active)
A Record's lifecycle state MUST be represented as a tuple of independent
axis values and MUST NOT be collapsed into a single state enum or any
aggregate verdict; in particular no axis value and no combination of axis
values may constitute an overall verification status
([verification-principles.md#NRS-VERIFY-0001](verification-principles.md#NRS-VERIFY-0001)).

<a id="NRS-CORE-0014"></a>
**NRS-CORE-0014 - Preconditions are declaratively machine-decidable** (stability: CORE, status: active)
Every state-gated operation MUST declare its precondition as data - a
conjunction of axis-value predicates - such that any implementation can
decide it from the state tuple alone; a precondition MUST NOT exist only
as prose or only as imperative code private to one implementation.

<a id="NRS-CORE-0015"></a>
**NRS-CORE-0015 - Insufficiency is structured** (stability: CORE, status: active)
When an operation cannot proceed because information is missing (as
opposed to present-but-disqualifying), the response MUST be a structured
`needs_clarification` object enumerating machine-readably what is missing
and the expected form of each answer; free-text-only insufficiency
reports do not satisfy this requirement.

Informative note: state is a DERIVED PROJECTION over the artifact graph
(Record content, verification reports, attestations, approval elements,
disclosure notices, trust root, registries), computed by a pure function -
never a mutable field inside the immutable, content-addressed Record. Each
axis has exactly one truth-carrier and the projection cites it; no state
fact is stored twice. The Record envelope is unchanged by this model.

## The six axes

<a id="NRS-CORE-0016"></a>
**NRS-CORE-0016 - Axis set and value domains** (stability: STABLE-INTENT, status: active)
The v0 axis set MUST be: `profile_eligibility`
(`eligible`/`ineligible`/`not_evaluated`), `check` (an execution-level
summary `all_completed`/`some_not_run`/`some_error`/`not_evaluated` plus
per-check carriers - outcome values are deliberately absent from the axis
value; `not_evaluated` applies when no verification report exists),
`freshness` (`current`/`stale`/`not_evaluable`), `approval`
(`scope_consistent`/`scope_mismatch`/`absent`), `verification`
(`none`/`report_exists`/`nomue_attested` - artifact existence and
linkage only), and `disclosure` (`active`/`withdrawn`/`superseded`); the
Execution axis of the internal design is excluded (a run is an upstream
historical fact carried as provenance content, not a Layer 1 state).

Informative note: the `check` axis summarizing EXECUTION (did every
covered check run) is not an outcome aggregate - whether checks passed
remains readable only per check in the report, and the precondition
predicate vocabulary (below) contains no outcome-aggregating predicate;
`tooling/tests/lifecycle.test.ts` pins this in the negative, promoting
the design document's own self-check to a test.

Informative note (v0 positioning): normative lifecycle semantics are carried
by this document, the lifecycle-operations registry, and the referenced
schemas and requirements. The reference implementation is non-normative
evidence only (NRS-GOV-0006). If those authoritative artifacts do not
determine a projection or evaluation detail, that detail remains an explicit
specification gap until repaired through the authority/conflict process;
reference code does not fill the gap by precedent.

Informative note (refusal boundary): input that results in a verifier
refusal is not a verified artifact bundle; lifecycle state projection is
not defined for such input. A consumer handles only the refusal's
`refusal_kind` and `reason_codes` (see
[../verification/relying-party-interface.md](../verification/relying-party-interface.md)).

## Operations and preconditions

<a id="NRS-CORE-0017"></a>
**NRS-CORE-0017 - Precondition grammar and registry** (stability: STABLE-INTENT, status: active)
Preconditions MUST be carried in the operations registry
([../../registries/lifecycle-operations.yaml](../../registries/lifecycle-operations.yaml))
as `{operation, preconditions: [{axis, predicate}]}` with predicates drawn
from the registry meta-schema's CLOSED vocabulary; an implementation MUST
refuse an operation whose precondition evaluates to violated, reporting
reason code `NRS-LIFECYCLE-PRECONDITION-NOT-MET` with the violated
predicates named, and MUST NOT accept a predicate outside the closed
vocabulary.

Informative note: an operation-gate refusal is an operation-level result
carrying registered reason codes; it is not a verifier refusal artifact
(those remain input-processing refusals with their own closed kinds). The
initial operation set is `attest`, `approve`, `supersede`, `withdraw`,
`include_in_snapshot`, `re_attest`.

## Clarification shape

<a id="NRS-CORE-0018"></a>
**NRS-CORE-0018 - Clarification format** (stability: STABLE-INTENT, status: active)
A `needs_clarification` response MUST validate against the clarification
schema
([../../schemas/lifecycle/clarification-0.1.schema.json](../../schemas/lifecycle/clarification-0.1.schema.json)):
`clarification_type` fixed, the gated `operation`, and `missing[]` entries
each carrying `what` (the missing element), `why` (which predicate was
not evaluable), and `expected_form` (a schema reference, an enum of
acceptable values, or an explicit free-text marker). How an agent
converses to obtain the answers is Layer 2 (NRS-CORE-0002); the shape of
the finalized ask is this clause.

## Disclosure notices

<a id="NRS-CORE-0019"></a>
**NRS-CORE-0019 - Disclosure notice artifact** (stability: EXPERIMENTAL, status: active)
A withdrawal or supersession fact MUST be carried as a disclosure-notice
satellite artifact
([../../schemas/lifecycle/disclosure-notice-0.1.schema.json](../../schemas/lifecycle/disclosure-notice-0.1.schema.json))
referencing the subject Record revision - never as a mutation of the
Record itself - and notices are append-only: a notice, once issued, MUST
NOT be deleted or edited (correction is a further notice). A
`supersession` notice MUST name the superseding revision.

## State view artifact (informative)

The projection's output format is the state-view artifact
([../../schemas/lifecycle/state-view-0.1.schema.json](../../schemas/lifecycle/state-view-0.1.schema.json),
EXPERIMENTAL): the axis tuple, each axis value with its truth-carrier
pointer, the evaluation time as an explicit input (the trust-root
discipline), and the referenced Record revision. It is a derived,
reproducible view - two implementations projecting the same artifact
graph at the same declared time produce the same view - and it carries no
field whose value cannot be recomputed from its cited carriers.

Informative note (first consumer): the next-stage MCP reference
implementation is planned as the first consumer of this contract - the
state view, the precondition registry, and the clarification shape are
exactly the surface an agent-facing adapter reads and returns. Relying
parties read state per
[../verification/relying-party-interface.md](../verification/relying-party-interface.md)'s
state section.
