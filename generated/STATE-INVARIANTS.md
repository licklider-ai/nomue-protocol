<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/state-invariants.yaml (sha256:7576b927d10196606a4e541258deb97647da114397d9f71cde6cc45e51b7cffb)

Generation command: pnpm generate
-->

# State Invariants Index

Non-authoritative view of the state invariant registry.

| Invariant | Title | Scope | Stability | Machine testable | Failure reason code |
| --- | --- | --- | --- | --- | --- |
| bundle-supported | Interpretation bundle is supported | record | EXPERIMENTAL | yes | NRS-UNSUPPORTED-BUNDLE |
| numeric-domain-finite | Numeric values are within the finite binary64 domain | record | EXPERIMENTAL | yes | NRS-NON-FINITE-NUMERIC-VALUE |
| dataset-ref-resolves | Design references the declared dataset | design | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| design-ref-resolves | Analysis references the declared design | analysis | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| analysis-ref-resolves | Result references the declared analysis | result | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| exactly-two-groups | Exactly two groups are declared | design | EXPERIMENTAL | yes | NRS-GROUP-COUNT-NOT-TWO |
| group-order-permutation | group_order is a permutation of the declared groups | design | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| observation-ids-unique | Observation identifiers are unique | record | EXPERIMENTAL | yes | NRS-DUPLICATE-OBSERVATION-ID |
| experimental-unit-ids-unique | Experimental-unit identifiers are unique | record | EXPERIMENTAL | yes | NRS-DUPLICATE-EXPERIMENTAL-UNIT |
| observation-group-resolves | Every observation references a declared group | record | EXPERIMENTAL | yes | NRS-UNKNOWN-GROUP |
| group-min-size | Each group has at least two observations | design | EXPERIMENTAL | yes | NRS-GROUP-SIZE-BELOW-TWO |
| independence-declared | Independence is declared | design | EXPERIMENTAL | yes | NRS-INDEPENDENCE-NOT-DECLARED |
| method-is-welch | Declared method is the Welch two-sample t-test | analysis | EXPERIMENTAL | yes | NRS-UNSUPPORTED-METHOD |
| alternative-two-sided | Declared alternative is two-sided | analysis | EXPERIMENTAL | yes | NRS-UNSUPPORTED-ALTERNATIVE |
| result-summaries-match-group-order | Result group summaries follow group_order | result | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| result-references-analysis | Result is bound to the declared analysis | result | EXPERIMENTAL | yes | NRS-SEMANTIC-CONFORMANCE-FAILED |
| admissibility-declarations-present | Admissibility declarations are present | design | EXPERIMENTAL | yes | NRS-SCHEMA-INVALID |
| pairing-none | Pairing is none | design | EXPERIMENTAL | yes | NRS-PAIRING-NOT-SUPPORTED |
| repeated-measurements-none | Repeated measurements are none | design | EXPERIMENTAL | yes | NRS-REPEATED-MEASURES-NOT-SUPPORTED |
| clustering-none-declared | Clustering is none_declared | design | EXPERIMENTAL | yes | NRS-CLUSTERING-NOT-SUPPORTED |
| analysis-population-complete | Analysis population is all Record observations | design | EXPERIMENTAL | yes | NRS-SUBSET-ANALYSIS-NOT-SUPPORTED |
| missing-outcomes-none | Missing outcomes are none | design | EXPERIMENTAL | yes | NRS-MISSING-OUTCOMES-NOT-SUPPORTED |
| transformation-none | Transformation is none | design | EXPERIMENTAL | yes | NRS-TRANSFORMATION-NOT-SUPPORTED |
| weighting-none | Weighting is none | design | EXPERIMENTAL | yes | NRS-WEIGHTING-NOT-SUPPORTED |
| estimand-supported | Estimand kind is supported | analysis | EXPERIMENTAL | yes | NRS-UNSUPPORTED-ESTIMAND |
| confidence-level-supported | Confidence level is 0.95 | analysis | EXPERIMENTAL | yes | NRS-CONFIDENCE-LEVEL-MISMATCH |
| effect-direction-group-order | Effect-estimate direction follows group_order | result | EXPERIMENTAL | yes | NRS-DECLARED-RESULT-MISMATCH |
| standard-error-finite-positive | Standard error is finite and positive | result | EXPERIMENTAL | yes | NRS-NUMERICAL-COMPUTABILITY-FAILED |
| ci-order-valid | Confidence interval lower <= upper | result | EXPERIMENTAL | yes | NRS-CONFIDENCE-INTERVAL-ORDER-INVALID |
| ci-level-matches-analysis | Declared CI level matches the analysis confidence level | result | EXPERIMENTAL | yes | NRS-CONFIDENCE-LEVEL-MISMATCH |
| ci-method-supported | Declared CI method is supported | result | EXPERIMENTAL | yes | NRS-CONFIDENCE-INTERVAL-MISMATCH |
| dependent-checks-gated | Dependent checks do not run after failed admissibility | report | EXPERIMENTAL | yes | - |
| refusal-carries-no-outcome | Refusal object has no verification outcome | verifier | EXPERIMENTAL | yes | - |
| phase1-bundle-results-pinned | Phase 1 bundle results remain pinned | verifier | EXPERIMENTAL | yes | - |
| execution-outcome-valid | Execution and outcome combinations are valid | report | EXPERIMENTAL | yes | - |
| overall-verified-prohibited | Overall VERIFIED-style status is prohibited | report | EXPERIMENTAL | yes | - |
