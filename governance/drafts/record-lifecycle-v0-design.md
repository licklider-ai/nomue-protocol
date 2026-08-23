# Record Lifecycle State Model v0 - Design Document (Batch 6, Stage 1)

**Status: DRAFT for steward approval - nothing here is implemented.** This
is the first-stage deliverable of Batch 6 (Z1); implementation (Z2-Z6)
begins only after approval, on a branch under the T3/U6 discipline.

## 1. Scope and boundary

Subject: the STATE SEMANTICS of the Record lifecycle - what states a
finalized, content-addressed Record and its satellite artifacts can be in,
how operations are gated by those states, and how insufficiency is
reported. Agent session state and interactive protocols remain Layer 2,
exactly per NRS-CORE-0001/0002: Layer 1 already may define _finalized_
clarification/decision/approval/execution FACTS while excluding the
interactive protocol that obtains them. ADR-0001 will receive an APPENDED
(never rewritten) refinement note: "Record lifecycle state semantics is
Layer 1" - a boundary CLARIFICATION under the existing decision, not a
re-scope.

## 2. The three skeleton intents (target: CORE)

1. **Orthogonal axes, not a state enum.** A Record's state is the tuple of
   independent axis values, never a single `state` field. A single enum
   forces false orderings (approved-but-unverified vs
   verified-but-unapproved have no common rank) and would re-introduce an
   overall verdict through the back door, colliding with NRS-VERIFY-0001.
2. **Declaratively machine-decidable preconditions.** Every gated
   operation declares its precondition as data (a conjunction of
   axis-value predicates), evaluable by any implementation from the state
   tuple alone - never as prose or as imperative code that only the
   reference implementation embodies.
3. **Structured insufficiency.** When an operation cannot proceed for lack
   of information, the answer is a `needs_clarification` DATA SHAPE: the
   machine-readable list of what is missing and the expected form of each
   answer - connecting the existing failure-model concept of
   `needs_clarification` to a concrete, schema-bound structure.

## 3. Central architecture decision: state is a projection, not a field

Records are immutable and content-addressed (NRS-CORE-0004/0005); a
mutable `state` stored inside one is a contradiction. Therefore: **a
Record's state on every axis is a DERIVED PROJECTION over the existing
artifact graph** (record content, verification report(s), attestations,
approval elements, trust root, registries) - computed by a pure,
specified function, never stored redundantly. This is the
no-duplicated-truth decision: each axis has exactly one truth-carrier,
and the state view cites its carrier. One axis (Disclosure) has facts
with NO existing carrier; it gets a NEW minimal satellite artifact
(a supersession/withdrawal notice), not a mutable Record field.

## 4. Axis selection (target: STABLE-INTENT)

From the internal design's seven candidates:

| Axis                | Verdict            | Rationale / truth-carrier                                                                                                                                                                                                                                        |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile Eligibility | **KEEP**           | Derived from the admissibility check over declared content (carrier: report's admissibility result). Meaningful for any consumer deciding "can this profile judge this Record".                                                                                  |
| Execution           | **EXCLUDE**        | The run of the original analysis is an upstream historical fact declared IN the content (provenance), completed before sealing; a run-state axis only has meaning during a session (Layer 2). Check-level execution is carried by the Check axis.                |
| Check               | **KEEP**           | Per-check `execution`×`outcome` (carrier: `verification_results`). Already exists; the axis exposes it as state without aggregation.                                                                                                                             |
| Freshness           | **KEEP**           | Whether a report/attestation still speaks about THIS revision under a still-registered bundle and an in-window trust-root generation (carriers: report's record_reference + registries; evaluation time stays an explicit input, per the trust-root discipline). |
| Approval            | **KEEP**           | The approval element and its scope-consistency check (carriers: approval element + D1 check). Already exists.                                                                                                                                                    |
| Verification        | **KEEP**           | Artifact-existence and coverage state ONLY: none / report-exists / nomue-attested (carriers: report, assertions vs trust root). Explicitly NOT an aggregate pass/fail - NRS-VERIFY-0001 stays intact; a relying party still reads scoped results itself.         |
| Disclosure          | **KEEP (minimal)** | Supersession lineage and withdrawal facts - required by the discrepancy-protocol withdrawal right (W3 draft, clause 6) and revision lineage. The ONE axis needing a new carrier (satellite notice artifact); publication mechanics beyond that stay operational. |

## 5. Alignment with existing elements (no duplicated truth)

| Existing element                        | Treatment in the state model                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `execution`×`outcome` per check         | REFERENCED as the Check axis's value domain; never copied into a second field.                                |
| `conformance` result                    | Input to Profile Eligibility (gate) - referenced, not restated.                                               |
| `verification_results` / `attestations` | Carriers for Check and Verification axes; the state view holds pointers (check_id, assertion_id), not copies. |
| approval element (D1)                   | Carrier for the Approval axis; `checkApprovalScope` remains the single evaluator.                             |
| `guarantee_boundary` non-claims         | Unchanged and outside the state model; state never asserts what these disclaim.                               |

The Z2 schema work therefore adds: (a) a **state-view artifact** (the
projection's output format, report-like, EXPERIMENTAL), (b) the
**clarification shape**, (c) the **disclosure notice** satellite artifact,
and (d) precondition declarations in a registry - and does NOT add any
mutable field to the Record envelope (a new bundle version is expected to
be UNNECESSARY; if review finds otherwise, the draft-3 discipline applies:
a true additive version proven by the previous version rejecting the new
field).

## 6. Transitions and preconditions (sketch)

Operations (initial set): `attest`, `approve`, `supersede`, `withdraw`,
`include-in-snapshot`, `re-attest`. Precondition form (declarative,
registry-carried):

```yaml
operation: attest
preconditions:
  - axis: check
    predicate: all_completed # no not_run/error among covered checks
  - axis: freshness
    predicate: current
  - axis: disclosure
    predicate: not_withdrawn
```

A precondition-violating operation is REFUSED, connected to the existing
refusal taxonomy (a new refusal reason code per Z3, not a new refusal
kind); negative fixtures pin each refusal.

## 7. Clarification shape (sketch)

```json
{
  "clarification_type": "needs_clarification",
  "operation": "attest",
  "missing": [
    {
      "what": "approval.scope",
      "why": "precondition approval=scope_consistent not evaluable: no approval element present",
      "expected_form": { "kind": "schema_ref", "ref": "urn:...:approval" }
    }
  ]
}
```

Machine-readable enumeration of what is missing, each with the expected
answer form (schema reference, enum, or free-text marker). How an agent
CONVERSES to fill it is Layer 2; the SHAPE of the finalized ask is Layer 1
(NRS-CORE-0002's exact split).

## 8. Stability placement and approval questions

- The three intents: **CORE** (per instruction). Question for the steward:
  register them CORE immediately under the ratified-decision precedent
  (as with the numerical contract), or EXPERIMENTAL-pending-RFC as the
  attestation/approval increments were? The design works either way.
- Axis names, precondition grammar, clarification format details:
  **STABLE-INTENT** (semantic intent fixed, representation may move
  during Public Draft).
- New artifacts (state view, disclosure notice): EXPERIMENTAL at
  introduction, as with every prior new surface.

## 9. Z2-Z6 implementation preview (after approval, on a branch)

Z2 schemas (state view, clarification, disclosure notice) + registries;
Z3 transition/precondition registry + negative fixtures (refusal-linked);
Z4 clarification fixtures (normal/missing); Z5 per-axis
{valid/failing/not-run/out-of-scope} fixture matrix integrated with the
D1 family, plus unknown-extension → UNVERIFIED interaction as defined
behavior; Z6 layer-boundary/ADR-0001 appendix, capability-matrix and
relying-party-interface exposure, and an informative note that the MCP
reference implementation is this contract's first consumer.
