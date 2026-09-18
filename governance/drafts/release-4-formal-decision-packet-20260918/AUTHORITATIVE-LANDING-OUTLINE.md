# Release 4 authoritative landing outline

Status: **Informative outline; no authoritative change or implementation is authorized**.

## Coupled change set

Only after recorded FD1-FD6 dispositions may an authoritative landing be prepared.
It must be one reviewable change set, or an explicitly linked atomic sequence,
containing the selected versions of every affected surface below.

| Surface                           | Required action                                                                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Normative specification           | Add the accepted balanced 2-by-2 Contract, Profile, declarations, model prerequisites, estimands, all-22 numerical procedure, D01-D07, result aggregation, refusal ordering, and non-claims                        |
| Requirement registry              | Allocate final Requirement IDs and bind each to one normative anchor, stability tier, schema, conformance evidence and public-surface entry                                                                        |
| Identifier and surface registries | Register final Contract, Profile, schema, Check and Bundle HTTPS identifiers; update `registries/public-contract-surfaces.yaml` with explicit schema-version impact                                                |
| Schemas                           | Add successor Record/payload/report/refusal schemas; preserve historical schemas and load exactly one final report root                                                                                            |
| Public checks                     | Register ordered conformance, integrity, admissibility, computability and recompute checks; keep comparison semantics and any tolerances solely in `registries/public-checks.yaml` with rationale and test vectors |
| Reasons and report                | Register accepted reason ownership and precedence; represent D07 in the detailed report without adding or reinterpreting a CLI exit code                                                                           |
| Interpretation Bundle             | Add an exact successor Bundle binding Contract, Profile, schemas, ordered checks, check-set revision and canonicalization; do not modify existing Bundle dispatch                                                  |
| Authority and generated views     | Assign every new authoritative path in `authority/authority-manifest.yaml`, then run generation and generated-view checks                                                                                          |
| Shared verifier                   | Implement and review the selected procedure in `licklider-ai/nomue-verifier` with exact Bundle dispatch, bounded controlled execution, fail-closed refusal, and no fallback                                        |
| Reference consumer                | Advance `reference/SOURCE-PIN.json` only to an exact reviewed shared-verifier source and retain the consumer boundary; no duplicate Protocol-local verifier authority                                              |
| Conformance and oracles           | Add hand-authored positive/negative fixtures, independent exact/numerical expectations, boundary and metamorphic cases, malformed-byte cases, and failure-precedence tests                                         |
| Compatibility                     | Rerun Release 1 history, canonicalization, dispatch, report, refusal and conformance evidence; demonstrate that every existing identifier and CLI meaning is unchanged                                             |
| Release state                     | Keep all new surfaces unsupported and unpublished until exact-target implementation, compatibility, freeze and publication reviews pass                                                                            |

## Sequencing

1. Record the formal FD1-FD6 decision after the controlling RFC window.
2. Prepare the authoritative Protocol overlay and the shared-verifier implementation
   as unissued, unsupported candidates with exact cross-repository source pins.
3. Review semantics, implementation, conformance, independent numerical evidence,
   authority, generated views, source/public boundary and historical compatibility
   together at fixed heads.
4. Repair only against explicit findings and obtain close-only confirmation where
   the review permits it.
5. Freeze the accepted candidate, rerun required evidence at the freeze, and
   perform a separate publication/release review.
6. Publish or activate support only under an explicit release authorization.

## Mandatory gates

The landing review must show that:

1. every normative clause, Requirement, registry entry, schema, Check, reason,
   Bundle, fixture and generated artifact is mutually consistent;
2. final identifiers first appear with their authoritative meanings and no draft
   identifier becomes an alias;
3. all-22 computation, D01 projection/comparison, D07 aggregation, J-cost/Z-B,
   underflow, nonrepresentable and failure-priority rules are actually enforced;
4. Public-supported, reference-supported and finite observed sets remain distinct;
5. independent expectations cover the selected domain and claimed boundaries;
6. unsupported bundles, platforms and out-of-domain inputs fail closed;
7. invocation failure cannot produce a completed or partial numerical report;
8. NRS-VERIFY-0025 retains exactly its existing five meanings; and
9. Release 1 signed history and issued behavior remain intact.

## Explicitly excluded

This landing does not add confidence intervals, multiplicity, simple effects,
unbalanced or wider factorial designs, covariates, mixed effects, causal claims,
producer probability carriers, broader platform promises, approval, attestation,
or an overall verification verdict.
