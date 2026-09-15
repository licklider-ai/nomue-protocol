# Responsibility matrix

Status: **UNISSUED CANDIDATE**. No T08 or T09 implementation is part of this packet.

| Rule                                  | Schema                                       | Relational validator                                    | T08 numerical adapter                            | T09 lifecycle/report                                |
| ------------------------------------- | -------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| Raw representation / closure          | Types, required fields, enums, ranges        | Strict parser then schema                               | Consumes admitted structure                      | Consumes defined parts                              |
| Local refs / Cartesian coverage       | Local shapes and array cardinalities         | Single implementation of identities and associations    | Reuses validated associations                    | Binds report to context                             |
| Observed balance / units / model      | Boolean/field shape, not truth               | Computes structural facts and admissibility diagnostics | Consumes these facts for candidate check         | Maps carrier/dependencies                           |
| 22 declarations                       | Required field and array shape               | Identity coverage, no recomputed truth                  | Owns exact target, projection and 22 comparisons | Publishes results atomically                        |
| J-cost / B / S-C / Z-B                | No calculation                               | No calculation                                          | Sole numerical evaluator                         | No independent numerical evaluator                  |
| Report parts and evidence association | Closed local definitions                     | Record/evidence scope, keys and declared-value binding  | Produces typed numerical results                 | Owns final report/CLI/lifecycle                     |
| Integrity                             | Digest metadata syntax                       | No digest computation                                   | Owns integrity calculation                       | Reports independent integrity check                 |
| Execution/refusal                     | Existing outcome invariant and reason syntax | Local harness input refusal only                        | Worker integration later                         | Final delivery, latched failure and refusal mapping |

T06's T08 admissibility responsibility is the executable check consumer. This T07
implementation supplies its structural predicates as requested; it does not create
a parallel numeric/admissibility interpretation. T08 reuses these typed results or
ports them with equivalence tests, rather than independently choosing new rules.

All 16 candidate Requirement IDs retain their owners. COVERAGE.json maps each clause
to its original T06 surfaces; schema shape, relation facts, numerical truth and final
publication have separate responsibility. T07's fixture/mutation corpus validates
this representation boundary. T10 will separately own the numerical candidate corpus
and independent expected values; no T10 work is claimed here.

T08 receives exact schema IDs and all-22 association checks, plus the documented
accepted/conformance/admissibility/refusal distinction. T09 receives closed report
components and explicit deferrals for root assembly, lifecycle, public reason
allocation, aggregation and CLI. Neither receives permission to alter frozen public
membership, comparison, projection, version binding or reference-support semantics.
