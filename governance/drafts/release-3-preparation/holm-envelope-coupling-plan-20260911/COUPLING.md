# Full-envelope integration design handoff

## Concrete finding

PR #311's body is not wire-compatible with a registered Record or verification
report. Copying it into the Phase 2A envelope would still bind the old ITGC payload
and profile. Its short record/revision labels fail the existing URI grammar, and
its single `outcome` vocabulary cannot distinguish a verifier refusal from a
check that ran and failed. A successor closed Record, payload and report design
is therefore the next implementation unit.

This handoff recommends a candidate design; it does not allocate identities,
change existing requirements or freeze the recommendation.

## Field placement

| Body field or missing field                         | Proposed full-envelope placement                                      | Binding rule to preserve                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Body `kind`                                         | Replaced by successor schema identity; envelope retains `record_type` | Old D0 and body markers are not issued Contract/schema identifiers                                         |
| `record_id`, `revision_id`                          | Envelope only, using producer-assigned URI identifiers                | Exact strings; no rewriting, aliasing or implicit retrieval                                                |
| `created_at`                                        | Envelope UTC timestamp                                                | Included in digest; does not prove trusted time                                                            |
| `$schema`, `profile_id`, `interpretation_bundle_id` | Exact successor versions in envelope                                  | Dispatch by exact bundle; no fallback to ITGC                                                              |
| `declaration`                                       | Payload, retaining all D0 entities and array order                    | Selected and unrelated declaration content remain bound                                                    |
| `inputs`                                            | Payload supplied-p associations                                       | Replace the duplicated synthetic revision carrier in the new version; bind to envelope revision explicitly |
| `result`                                            | Payload numeric result owned by analysis/family/result identifiers    | Exact hex numerators and display words; verify every row                                                   |
| `integrity`                                         | Envelope, outside digest projection                                   | Exclude this one member only; validate all metadata separately                                             |
| Expected context                                    | Separate caller input                                                 | Pin actual URI identities and the full declaration/input association independently                         |
| Scoped report                                       | Separate artifact with exact record reference                         | Independently computed digest, bundle and check version remain inseparable from judgment                   |

Removing `inputs.revision` in a successor is a proposed versioned change, not a
reinterpretation of the existing sidecar. The body experiment and old bridge keep
their original representations. A private adapter may use local fixture labels
only after actual envelope/context identity equality is established and retained
in the report; it never reports the synthetic labels as public identity. Prefer
passing explicit ownership into the future check directly when the implementation
is promoted, avoiding an accidental second identity source.

Record/revision IDs are producer-assigned. New Protocol-issued schema, Contract,
Profile, bundle and check identifiers follow ID-POLICY.md's HTTPS family grammar
at allocation time. A Contract identifies the operation; a check identifies its
verification procedure. The former is not replaced by a library name or a new
method alias. No instance ID is required to use the nomue domain.

The current check-result schema has a legacy URN-only `check_id` pattern; merely
using HTTPS identifiers in its existing version fails structural validation.
Similarly, existing result scopes accept URI identifiers, whereas D0 local result
labels alone do not. The successor report needs an explicitly designed scope
carrier for record/revision plus local analysis/family/result association, or an
explicit URI identity mapping. Concatenating strings and assuming they identify
the same result is not an established rule.

## Byte, integrity and identity sequence

1. Snapshot the supplied bytes. Apply bounded ingress and strict JSON eligibility,
   preserving the existing pre-routing error priority before selecting a bundle.
2. Dispatch by exact supported bundle and validate the corresponding closed
   envelope/payload and integrity metadata. Compare storage bytes to their JCS
   form; never silently rewrite a submitted Record.
3. Implement the stored-byte projection required by NRS-CANON-0017, excluding exactly
   `integrity`. Compute the domain-separated digest over the stored projection;
   independently confirm canonicalization idempotency. Do not rely solely on
   generating fresh JSON from the parsed object and hashing that generated text.
4. Compare the declared digest with the computed digest. The report references
   the computed value. The declaration and input context are compared with an
   independently supplied context, including exact actual record/revision IDs.
5. Perform declaration relations, Contract/domain admission and full ordered
   association checks before numeric work; then compare every exact and display
   row using the reviewed Holm candidate. Preserve stage and all relation codes.
6. Return a separate report or refusal, with the original verified bytes available
   unchanged to the caller. No second parse to obtain a different application
   payload and no mutation to the Record or lifecycle state field.

This is a candidate pipeline outline. Exact priority where envelope failures,
conformance failures and context failures coexist is a review item in CASES.json;
the body experiment's coarse precedence is not silently promoted. The existing
normative pre-routing priority and current supported-bundle behavior remain fixed.

The digest candidate reuses NRS-CORE-0006 and NRS-CANON-0022, including the existing
`nomue/record-content/v1` plus LF tag. This is a reuse proposal for the successor
bundle, not evidence that a registered bundle already supports the new payload.
A correct digest detects content disagreement; it does not authenticate source
labels, demonstrate globally unique revision history, or establish scientific truth.
A single offline Record cannot prove no conflicting content was published elsewhere
under the same revision identifier.

## Reporting: preserve cause and execution stage

The four body outcomes are deliberately insufficient as a public mapping key.
For example `input_refused` may arise before a Record can be interpreted or after
a conformance judgment. The next implementation carries a structured internal
cause and stage from its source; it does not recover them by parsing error prose.

| Detected situation                                                   | Proposed artifact/check placement                                     | Execution and result treatment                                    |
| -------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Raw syntax, duplicate name, invalid Unicode or negative-zero number  | Existing verifier-level refusal class                                 | No numerical outcome or invented Record reference                 |
| Missing, non-string or unsupported bundle                            | Existing routing/unsupported-bundle refusal                           | No default bundle or schema guessing                              |
| Enforced resource limit                                              | Resource refusal with actual enforced category                        | No partial arithmetic success                                     |
| Successor schema or declaration relation failure after valid routing | Conformance failure or bounded relation check, as explicitly assigned | Completed failure with registered reasons; arithmetic not run     |
| Digest differs                                                       | Integrity check                                                       | Completed failure; arithmetic gated off in the proposed design    |
| External expected context differs                                    | New scoped association check                                          | Completed failure after its prerequisites; arithmetic not run     |
| Unsupported Holm family/input domain                                 | Contract admission check                                              | Completed failure; arithmetic not run                             |
| Every exact value and display matches                                | Holm arithmetic check                                                 | `execution: completed`, `outcome: pass` within supplied-p scope   |
| Any exact value or display differs                                   | Holm arithmetic check                                                 | `execution: completed`, `outcome: fail`, with registered reasons  |
| Worker fails after the arithmetic check starts                       | Holm arithmetic check if a valid report can be formed                 | `execution: error`, no outcome, reasons plus bounded error object |
| Module/dependency setup prevents any valid report                    | Verifier-level internal failure                                       | Refusal, not fabricated errored-result metadata                   |

The final assignment for post-routing declaration/context failures is a design
choice still to be reviewed; it cannot be inferred from today's `mismatch` or
`input_refused` labels. Schema failure and source-authenticity claims remain
separate. Diagnostics record the full D0 relation code set, without inventing a
priority inside that set. Public reason IDs are allocated only in the coupled
registry change; this table creates none.

The successor guarantee boundary retains scientific validity and declaration
truth as `not_asserted` and explicitly communicates supplied-p-only scope and no
FWER assertion. Existing report versions are closed: adding the body's FWER or
source-authenticity fields requires the new report version. The present Phase 2A
report's other non-claims are examined individually, not silently dropped.
No p-generation check is fabricated solely to label it `not_run`; the guarantee
boundary states it was outside the supported operation.

## Coupled artifact map

Paths below are current owners or parent directories. New filenames and permanent
IDs are assigned in the reviewed successor change, not reserved by this plan.

| Change                               | Existing ownership / destination                                                     | Required evidence                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Bounded Contract and Profile         | `spec/` capability documents; `registries/requirements.yaml`                         | Research reuse disposition and exact scoped requirements                                        |
| Record and payload versions          | `schemas/record/`, `schemas/profiles/`                                               | Closed shape, all variant and foreign ownership negatives                                       |
| Report scope and numeric evidence    | `schemas/reports/`, successor shared execution schema                                | Exact URI identity, local scope, non-claims and all outcomes                                    |
| Public checks and reasons            | `registries/public-checks.yaml`, `registries/reason-codes.yaml`                      | Check-specific stage/order rules, reason completeness, no Record tolerance                      |
| Versioned interpretation             | `registries/interpretation-bundles.yaml`, `registries/public-contract-surfaces.yaml` | Exact combination; legacy versions and unsupported-bundle refusal preserved                     |
| Authority and requirements           | `authority/authority-manifest.yaml`, `registries/requirements.yaml`                  | One owner per target and one anchor per normative requirement                                   |
| Conformance and implementation       | `conformance/`, `reference/verifier/`                                                | Pre-execution independent expectations, bounded runtime, byte-forwarding and all-row comparison |
| Generated views and release evidence | `generated/`, applicable gate/evidence records                                       | Regeneration and old-bundle regressions; fixed reviewed candidate                               |

## Next bounded implementation unit

Implement a disposable full-envelope exercise covering all nine envelope fields,
proper instance identifiers, lossless payload storage, exact expected-context
binding, stored-byte digest verification and separate stage-aware results. Keep it
outside registered bundle dispatch while its successor schema and reason mapping
are reviewed. CASES.json is the initial acceptance matrix for that exercise.

After its fixed-head review and the applicable research/RFC decisions, promote
Contract, schemas, reasons, checks, bundle, conformance, reference implementation
and generated views together. This plan does not close S4/S5, B-2 or the R3 release.
