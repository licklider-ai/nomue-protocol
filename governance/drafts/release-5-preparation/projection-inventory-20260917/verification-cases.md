# Planned Release 5 verification cases

Status: design inventory only. None is an executed R5 conformance fixture.
Case labels below are local document locators, not Protocol identifiers.
Public values and reason-code spellings remain unissued. Every positive case
requires a separately accepted family/schema/Contract/bundle and mapping first.

## Mapping and ownership

| Case | Construction                                                                | Expected boundary and evidence                                                                                       |
| ---- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| M01  | Complete independent-two-group successor                                    | Emit only mapped Profile facts, timing and consumed family identities; retain exact source paths and mapping version |
| M02  | Complete paired successor with explicit pair IDs                            | Expose the paired relationship and identity presence; reuse the Profile's complete-pair judgment                     |
| M03  | Complete multi-group successor bound to one analysis                        | Project that analysis's design and population; no first-element selection                                            |
| M04  | Unregistered Profile version with matching field names                      | Do not infer a mapping by names or use a nearby version; exact failure classification remains R5-P5 work             |
| M05  | Delete a required design declaration                                        | Owning conformance fails; no fabricated default or R5 projection                                                     |
| M06  | Keep pairing-present under the existing independent Profile                 | Owning admissibility blocks the dependent check; R5 does not overrule it                                             |
| M07  | Give two Profile-owned fields competing for the same fact                   | Reject the proposed mapping definition during mapping validation; no priority rule at verification time              |
| M08  | Count two conditions and many pair IDs                                      | Group/condition count comes from conditions; pair count is not group count                                           |
| M09  | Use R2 `within_pair_only`                                                   | Retain the reviewed meaning; do not turn it into the independent Profile's unsupported repeated-design value         |
| M10  | Remove pairing/clustering fields from a D0-style draft                      | No implicit `none`; require an accepted mapping or a Profile-owned successor carrier                                 |
| M11  | Keep four groups but declare a flattened factorial design                   | Rely on the owning Profile's exclusion; group count does not make it one-way                                         |
| M12  | Swap array order of two analyses with different populations                 | Evidence stays bound to the selected analysis, never the first/last element                                          |
| M13  | Inject a duplicate Contract ID into an R5-specific object                   | Successor schema rejects the extra carrier; family identity stays single-owned                                       |
| M14  | Substitute legacy `method_id` or D0 `contract_ref` for an accepted Contract | Never admit an R5 combination by aliasing or by string presence alone                                                |

## Timing and evidence

| Case | Construction                                                                                  | Expected boundary and evidence                                                                                                                                  |
| ---- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T01  | Supply each of `pre_outcome`, `post_outcome`, `unknown` under an otherwise admitted successor | All remain structurally representable; passing report retains the exact declared status and non-claims                                                          |
| T02  | Omit timing or supply null/unknown enum spelling                                              | Successor conformance fails without a default; exact schema is pending                                                                                          |
| T03  | Inspect an outcome later excluded from the analysis, then finalize selection                  | Under the proposed convention the truthful declaration cannot be `pre_outcome`; test as a declaration-semantics scenario, not detectable Record-only misconduct |
| T04  | Change a projected declaration after access, then restore its old value                       | Same convention as T03; no assertion that a verifier can discover hidden history                                                                                |
| T05  | Copy D0 `before` while other identities/declarations were finalized later                     | No automatic conversion to `pre_outcome`; a producer needs the separately defined R5 declaration                                                                |
| T06  | A selecting system receives outcome values in its input context                               | Treat as access for declaration instructions; report consistency cannot prove access history                                                                    |
| T07  | Conformance succeeds but admissibility fails                                                  | `not_run` retains exact dependency identity/version/scope/outcome, blocking reasons, timing and non-claims; no computed projection                              |
| T08  | Execution errors after conformance and partial evidence acquisition                           | Retain the already obtained timing and actually acquired evidence; fabricate no missing dependency result or projection                                         |
| T09  | Emit correct values with a wrong source path, Profile version or mapping version              | Detect evidence inconsistency in future report validation; no numerical-correctness or selection-quality claim                                                  |
| T10  | Emit passing evidence without its non-claim reference                                         | Reject incomplete future report evidence under the accepted report contract; no bare pass as a complete R5 result                                               |
| T11  | Producer falsely declares pre-outcome timing with no external history                         | Record-only check cannot establish falsehood; negative assurance case prevents an authentication or preregistration claim                                       |

## Historical preservation

| Case | Fixed comparison                                                | Required execution evidence before closure                                                                                                 |
| ---- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| H01  | Earlier bundles before/after integration                        | Exact bundle IDs and allowed-check lists unchanged; new R5 check appears only in new bundles                                               |
| H02  | Legacy Records without timing                                   | Existing checks/reports/fixtures remain equal; no automatic conversion or default timing                                                   |
| H03  | Unsupported successor bundle or R5 fields under a legacy schema | Exact dispatch/conformance rejects at its owning stage, without fallback                                                                   |
| H04  | Historical Release 1 assets                                     | Preserve `tooling/src/release/release-1-history.ts` and run `pnpm regression:phase1`; bind results to before/after commits                 |
| H05  | Earlier numerical evidence and generated views                  | `pnpm check:generated`, `pnpm evidence:phase2a --check`, `pnpm oracle:phase2a`; when applicable `pnpm snapshot:manifest --check-candidate` |
| H06  | R2/R3 successors after their separate issuance                  | Add their exact issued historical pins and replay suites; present unissued candidates do not satisfy this future requirement               |

## Execution requirements

For every future executable case, retain the input bytes, owning schema/check and
bundle identities, independent expected result, actual result and exact invocation.
Keep the existing conformance/admissibility cases separate from new R5 evidence
checks. Expected values are specified before execution and not generated from the
implementation alone. New evaluator code belongs in the public verifier repository.

T03–T06 and T11 primarily test the specification, producer instructions and report
claim boundary. They cannot be relabelled as verifier detection of undisclosed
events. H04/H05 commands above are required future integration checks, not a claim
that this source-inventory exercise ran a future R5 implementation.
