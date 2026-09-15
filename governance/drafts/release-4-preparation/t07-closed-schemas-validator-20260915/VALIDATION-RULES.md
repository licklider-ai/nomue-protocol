# Validation rules

Status: **UNISSUED CANDIDATE**. Deterministic local API, not final verifier output.

## Entry points

`validateRecord(rawText)` performs strict input, shape, relations and structural
admissibility facts. `validateComponent(name, rawText)` checks one named report part.
`validateQuantityEvidence(rawText, recordText)` additionally binds all 22 quantity
entries to the Record. `validateCheckResult(rawText, recordText)` binds its scope.
`schemaFor` is a test/local compilation facility, not a replacement raw-input path.
Unknown raw input never enters relational logic before strict parsing and schema success.

## Ordered phases and multiple errors

1. Existing raw-size guard; strict JSON syntax, duplicate members, invalid Unicode,
   negative-zero priority; existing parsed-resource guards. Safety refusal is separate
   from public-domain membership. Malformed/nonfinite numeric representation is not
   numerical mismatch.
2. Exact known candidate bundle context, without fallback or network lookup. A different
   string is NRS-UNSUPPORTED-BUNDLE, not a nearby-version attempt. Missing/wrong-type
   bundle is schema/conformance failure.
3. Closed schema validation: NRS-SCHEMA-INVALID. Among schema violation locations,
   choose the lexicographically smallest JSON Pointer by UTF-16 code units, including
   missing/extra property names. No locale, Ajv English message or schema traversal
   order determines the returned primary code/path.
4. Collection uniqueness before dereference: observation IDs, factor IDs, cell IDs,
   factor_order, each factor's levels, summary cell IDs, contrast kinds. First failing
   group in that fixed order yields NRS-BTF-IDENTITY-AMBIGUOUS.
5. Exact local reference chain: design->dataset, analysis->design, result->analysis;
   complete factor_order; observation->cell; summary->cell. Missing/wrong typed target
   yields NRS-BTF-LOCAL-REFERENCE-INVALID. Unknown factor_order association remains
   the RFC identity-ambiguity case. Array index orders repeated reference diagnostics.
6. Exact Cartesian tuples and coverage: NRS-BTF-CELL-COVERAGE-INVALID. Four unique
   summaries plus valid target references imply each cell exactly once; three unique
   allowed contrast kinds imply A/B/AB exactly once.
7. Structural admissibility: false model declaration, then observed unequal/insufficient
   counts, then repeated units. Respectively NRS-BTF-MODEL-NOT-DECLARED,
   NRS-BTF-CELL-COUNTS-UNSUPPORTED, NRS-BTF-UNIT-NOT-UNIQUE. Missing/nonboolean model
   fails the earlier schema stage. No real-world assumption is statistically tested.

Only one issue is returned, so output is bounded. All discovered schema errors are
normalized before selecting its diagnostic path; input-size guards bound work.
This order is an implementation-independent candidate diagnostic algorithm, not a
new normative restriction on a later Public Check's complete reason set. Two failing
conditions are not reinterpreted as one scientific fact. Existing numerical fail
priority and T09 propagation are unchanged and not executed here.

## Local reference namespaces

| Source                                | Target namespace                                    | Missing / wrong target                   | Uniqueness                                                        |
| ------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------- |
| design.dataset_id                     | Single dataset.dataset_id                           | Semantic reference failure               | Single object                                                     |
| analysis.design_id                    | Single design.design_id                             | Semantic reference failure               | Single object                                                     |
| result.analysis_id                    | Single analysis.analysis_id                         | Semantic reference failure               | Single object                                                     |
| observation.cell_id / summary.cell_id | design.cells[].cell_id                              | Semantic reference failure               | Unique target cell IDs; every summary exactly once                |
| factor_order[]                        | design.factors[].factor_id                          | Identity ambiguity / missing association | Exactly the two distinct factors                                  |
| cell.levels[position]                 | level_order of factor at that factor_order position | Cell-cover failure                       | Levels unique within factor; same spelling across factors allowed |

Namespaces do not collapse into a single global local-ID set. A reference equal to an
ID of the wrong object type does not resolve. IDs are case-sensitive and opaque;
no dereference or normalization occurs. Foreign Contract/schema/profile constants
fail shape; foreign bundle fails exact routing. Report evidence binds record_id,
revision_id, bundle, exact check/version and result_id in explicit validation context.

## 22 quantities and representation

Counts x4 and residual df x1 are safe integers with T06 ranges. Means x4, estimates
x3, SS x3, SSE x1, F x3 and p x3 are finite binary64 declarations with T06 sign/range
constraints. Missing fields/array cardinality/unknown kinds are schema failures;
duplicate or wrongly associated summaries/contrasts are relational failures.
Evidence uses the same eight canonical quantity names and exactly the permitted
discriminators. Its 22 keys are unique and cover the declared result exactly once,
independent of array order. Context binding compares evidence.declared to the existing
Record declaration only, not a mathematical recomputation.

AJV strictNumbers rejects Infinity/NaN even at the lower-level schema API. The raw
entry uses parseStrictJson, rejecting lexical -0 and negative tokens that parse to
negative zero. Positive underflow to parsed zero follows represented-input semantics.
Subnormal declarations and permitted zero are well-formed; positive SSE remains
required. No target rounding, exact F, cost predicate, S-C, Z-B or numerical comparison
is reimplemented. A plausible but numerically incorrect declaration can pass T07.

## Result categories and downstream meaning

The local Result type distinguishes accepted, input_refusal, resource_refusal,
unsupported_bundle, conformance_failure (structural/semantic), admissibility_failure,
and boundary_failure. These are task-local diagnostics, not new Protocol outcomes.
Accepted does not claim integrity, public-domain membership or numerical pass.
Admissibility failure retains the structurally valid Record for downstream handling.
T09 remains responsible for translating dependencies into not_run, carrier eligibility,
final report reason lists and execution failure suppression. Resource refusal does
not claim public non-membership; this module supplies no whole-invocation guarantee.
