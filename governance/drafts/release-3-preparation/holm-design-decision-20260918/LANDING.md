# Integration, RFC impact and next milestones

Informative plan; no authoritative change is applied. Reuse the fixed PR #330
M1/M2 proposals and M3 previews rather than cloning them as new evidence. Their
old linear dependency chain and 537-property map are not complete ownership
evidence for the proposed successor graph and result shapes.

## Work sequence and exit evidence

| Milestone               | Work                                                                                                                      | Exit evidence / accountable role                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| D0 design checkpoint    | Independently review this fixed packet and dispose Q1-Q3                                                                  | Fixed-head report; contributor repairs; steward records any required design disposition separately                                 |
| D1 unissued successor   | Implement local validation, explicit dependency graph, report/refusal reference policy and genuine schema/storage results | Versioned unissued schemas/runtime; 44-case matrix expanded and executed; exact numerical byte comparison and changed-scope review |
| D2 integrated candidate | Complete conformance manifest/runner, shared invocation/dispatcher/output protocol and legacy compatibility               | Source-bound new/legacy suites, actual-host/resource evidence, API accepts independent expected context                            |
| D3 coordinated overlay  | Couple normative anchors, requirements, IDs, schemas, checks, reasons, bundles, surfaces and authority assignments        | Complete isolated unissued diff; generation/validation/conformance green; boundary and RFC-delta review                            |
| D4 formal decision      | Assemble exact source, numerical, implementation, RFC and unresolved-finding dispositions                                 | Attributable steward decision after the applicable window; no automatic approval                                                   |
| D5 freeze/publication   | Apply only authorized changes, preserve Release 1 history, freeze and execute publication gates                           | Exact released snapshot and release evidence, separate from candidate readiness                                                    |

These are planning labels, not new research/release gates. Work on other R3
capabilities remains possible in parallel; finishing all fourteen is not required
for this first bounded capability. Conversely, finishing Holm does not close R3.

## Repository and evidence integration

This packet branches from main and links PR #330 by immutable commit; it neither
merges that open branch nor imports its runtime into main. Before assembling D1,
inventory and preserve any unpublished successor work; do not treat a past
normal-case observation or conversation summary as committed passing evidence.

PR #330 pins historical authority/tooling as well as candidate inputs. Reconcile
the current-main delta explicitly; do not blindly refresh historical INPUTS.json
to turn a mismatch green. Keep old snapshots/checkers reproducible at their fixed
checkout. New integration evidence gets new pins, with changes explained.
Current main includes the #351 Release 1 df=1 kernel fix and development-review
instructions. Run final compatibility against that or a later fixed main; old
receipts do not attest the new integration. Holm numerical applicability is
assessed by the actual three source files and domain, not by a global main hash.

The shared checker product is developed in `nomue-verifier`. Existing Protocol
draft experiments are preserved as research assets; do not fork a second shared
implementation under `reference/`. Final Protocol integration advances
`reference/SOURCE-PIN.json` through the synchronization workflow, with exact
consumer regressions. Repository moves and source pins alone do not qualify a
changed implementation or transfer a reviewer verdict to it.

## Coordinated change checklist

| Surface                                | Required successor work                                                                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contract/Profile/requirements          | Final anchor-bound local-conformance, caller-binding, schema/storage and refusal duties; no unallocated ID presented as issued                           |
| Record/expected/report/refusal schemas | Explicit successor identities; truthful references/results; old versions preserved; no guessed aliases                                                   |
| Public checks/reasons                  | NRS-VERIFY-0017 blocker identities and actual reason propagation; NRS-VERIFY-0012 owned reasons; check-owned comparison constants, rationale and vectors |
| Bundles/output protocol                | Exact supported dispatcher and caller API; reports bundle-selected, refusal protocol invocation-selected; no partial support flag                        |
| Public-contract-surfaces/meta-schemas  | Version report reference/blocker fields and multiple reasons; retain blocking-reason propagation constant; assess additive ID grammar and all consumers  |
| Conformance                            | Permanent fixture/manifest/runner links, independently fixed expectations, failure mutations and legacy regressions                                      |
| Shared verifier/reference consumer     | Reviewed implementation in nomue-verifier; synchronized SOURCE-PIN and matched runtime/evidence                                                          |
| Authority/generated views              | Every new authoritative source assigned; regenerate and prove zero unexpected drift                                                                      |
| Release boundary                       | Release 1 history audit, source/public-snapshot boundary review, finding closure and green final validation/conformance                                  |

This checklist supplements, not replaces, PR #330 COUPLING.md. It does not claim
that completing a table substitutes for the actual coordinated implementation.

## RFC impact, not a timing decision

NRS-VERIFY-0005 is CORE separation, not a normative mandate for candidate.4's
linear order. Phase 1's gating paragraph is informative. NRS-CORE-0011 is
STABLE-INTENT despite its namespace; it requires refusal when a normal report
cannot be produced but does not by itself prohibit every reportable refusal.
NRS-SEC-0004's CORE no-partial-success rule remains binding.

The repaired design explicitly preserves these additional duties:

| Clause and tier                | Disposition and coupled impact                                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NRS-CANON-0005, CORE           | Canonicalization/projection/digest failure always refuses; no partial digest or K-unavailable report state                                                 |
| NRS-CANON-0016, EXPERIMENTAL   | K compares original stored bytes with canonical bytes; a K-fail diagnostic report rejects ingress/storage/exchange and never repairs or forwards them      |
| NRS-CANON-0017, EXPERIMENTAL   | I requires K pass and hashes the raw-preserving stored-byte projection; a separate idempotency/projection comparison prevents reserialization-only success |
| NRS-VERIFY-0027, EXPERIMENTAL  | Only verified original bytes can be forwarded after all required checks/lifecycle pass                                                                     |
| NRS-VERIFY-0017, CORE          | Every not_run row identifies blocking prerequisites and propagates their actual reasons, including transitive/multiple blockers                            |
| NRS-VERIFY-0012, STABLE-INTENT | Failed/error/not_run results retain owned reasons; final issuance registers codes and exact mappings together                                              |

The reference digest uses the stored-byte projection even on K failure; in that
diagnostic report it identifies rejected bytes and does not claim canonical
Record validity. The successor report schema/field ownership and conformance
fixtures must express that distinction. K-fail I is not_run, not a comparison
against a reserialized value. Independent raw-projection vectors are required.

The chosen propagation retains the main meta-schema's
`dependency_propagation: not_run_with_blocking_reason_codes` constant. Do not
promote PR #330's alternative generic-prerequisite enum value. No change to that
constant is needed by this choice. Report schemas still change to carry explicit
blocking identities and potentially several propagated reasons; the existing
single-reason candidate restriction cannot be copied unchanged. Document those
schema-version impacts in public-contract-surfaces at landing. Other planned
meta-schema ID-grammar changes still need their own version/consumer assessment;
if implementation proposes a propagation constant change, reopen this disposition.

Q2's reportable schema failure restores the established Phase 1/2A behavior
(including NRS-SCHEMA-INVALID in the Phase 2A expectation set); candidate.4's
blanket schema_error refusal was different. This supports a preservation rather
than CORE-meaning-change assessment for that part alone. New storage/reference
semantics, expected-context errors and the additive legacy unsupported-argument
boundary still require their explicit surface/API/RFC assessment. It is not a
blanket timing exemption for the whole successor.

Q1 changes gating, Q2 changes failure/report and reference behavior, and Q3 adds
real result states and storage ownership. These are material candidate-surface
deltas requiring versioning and an exact RFC impact disposition, not editorial
repairs or an assumed exemption. The proposed route preserves existing CORE
meaning; independent review may identify a contrary impact.

The unchanged-scope earliest consideration remains 2026-10-09T11:50:18Z for
Issue #274. Do not apply that date automatically to this successor. Record scope,
affected requirement tiers, compatibility, and whether material expansion or
meaning change requires reopening the window under governance/RFC.md. A CORE
meaning change invokes the applicable 60-day process and named-steward decision.
Neither an automatic reset nor an automatic exemption is decided here. No RFC
comment, opening/closing action or formal adoption is performed by this packet.
