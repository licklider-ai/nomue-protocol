<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/reason-codes.yaml (sha256:1bbe75c9898eb2692a34aafff2b9dba7a5a8de2f48bfde7f0145e3d6e47bbe05)

Generation command: pnpm generate
-->

# Reason Codes Index

Non-authoritative view of the reason code registry.

| Code | Title | Category | Stability |
| --- | --- | --- | --- |
| NRS-DUPLICATE-JSON-MEMBER | Duplicate JSON object member name | structural | EXPERIMENTAL |
| NRS-INVALID-UNICODE-STRING | JSON string is not a valid Unicode scalar-value sequence | structural | EXPERIMENTAL |
| NRS-NEGATIVE-ZERO-NUMBER | Negative-zero number token rejected | structural | EXPERIMENTAL |
| NRS-BUNDLE-ID-MISSING | Interpretation bundle identifier is missing | bundle | EXPERIMENTAL |
| NRS-BUNDLE-ID-INVALID | Interpretation bundle identifier is not a string | bundle | EXPERIMENTAL |
| NRS-SCHEMA-INVALID | Record fails schema validation | structural | EXPERIMENTAL |
| NRS-SEMANTIC-CONFORMANCE-FAILED | Record fails semantic conformance | semantic | EXPERIMENTAL |
| NRS-UNSUPPORTED-BUNDLE | Interpretation bundle not supported | bundle | EXPERIMENTAL |
| NRS-DIGEST-MISMATCH | Recomputed digest differs from declared digest | integrity | EXPERIMENTAL |
| NRS-GROUP-COUNT-NOT-TWO | Declared group count is not two | semantic | EXPERIMENTAL |
| NRS-DUPLICATE-OBSERVATION-ID | Observation identifier is not unique | semantic | EXPERIMENTAL |
| NRS-DUPLICATE-EXPERIMENTAL-UNIT | Experimental unit appears in more than one observation | semantic | EXPERIMENTAL |
| NRS-UNKNOWN-GROUP | Observation references an undeclared group | semantic | EXPERIMENTAL |
| NRS-GROUP-SIZE-BELOW-TWO | Group has fewer than two observations | semantic | EXPERIMENTAL |
| NRS-INDEPENDENCE-NOT-DECLARED | Independence is not declared | semantic | EXPERIMENTAL |
| NRS-UNSUPPORTED-METHOD | Declared method is not supported | semantic | EXPERIMENTAL |
| NRS-UNSUPPORTED-ALTERNATIVE | Declared alternative is not supported | semantic | EXPERIMENTAL |
| NRS-NON-FINITE-NUMERIC-VALUE | Numeric value outside the finite binary64 domain | structural | EXPERIMENTAL |
| NRS-ZERO-STANDARD-ERROR | Standard error is zero | precondition | EXPERIMENTAL |
| NRS-DECLARED-RESULT-MISMATCH | Declared result differs from recomputed result | comparison | EXPERIMENTAL |
| NRS-CANONICALIZATION-FAILED | Canonicalization or digest computation failed | integrity | EXPERIMENTAL |
| NRS-INTERNAL-VERIFIER-ERROR | Verifier internal error | internal | EXPERIMENTAL |
| NRS-PAIRING-NOT-SUPPORTED | Paired observations are not supported | admissibility | EXPERIMENTAL |
| NRS-REPEATED-MEASURES-NOT-SUPPORTED | Repeated measurements are not supported | admissibility | EXPERIMENTAL |
| NRS-CLUSTERING-NOT-SUPPORTED | Clustered experimental units are not supported | admissibility | EXPERIMENTAL |
| NRS-WEIGHTING-NOT-SUPPORTED | Weighted analysis is not supported | admissibility | EXPERIMENTAL |
| NRS-TRANSFORMATION-NOT-SUPPORTED | Outcome transformation is not supported | admissibility | EXPERIMENTAL |
| NRS-SUBSET-ANALYSIS-NOT-SUPPORTED | Subset or exclusion analysis is not supported | admissibility | EXPERIMENTAL |
| NRS-MISSING-OUTCOMES-NOT-SUPPORTED | Missing outcomes are not supported | admissibility | EXPERIMENTAL |
| NRS-UNSUPPORTED-ESTIMAND | Declared estimand is not supported | admissibility | EXPERIMENTAL |
| NRS-CONFIDENCE-LEVEL-MISMATCH | Confidence level differs from the supported level | admissibility | EXPERIMENTAL |
| NRS-STANDARD-ERROR-MISMATCH | Declared standard error differs from the recomputed value | comparison | EXPERIMENTAL |
| NRS-CONFIDENCE-INTERVAL-MISMATCH | Declared confidence interval differs from the recomputed interval | comparison | EXPERIMENTAL |
| NRS-CONFIDENCE-INTERVAL-ORDER-INVALID | Confidence-interval endpoints are reversed | comparison | EXPERIMENTAL |
| NRS-CRITICAL-VALUE-CALCULATION-FAILED | Critical value computation failed | computability | EXPERIMENTAL |
| NRS-NUMERICAL-COMPUTABILITY-FAILED | Supported quantities are not numerically computable | computability | EXPERIMENTAL |
| NRS-P-VALUE-UNDERFLOW | P-value numerical underflow | computability | EXPERIMENTAL |
| NRS-PARSE-FAILED | Input is not parseable JSON | structural | EXPERIMENTAL |
| NRS-FILE-SIZE-LIMIT-EXCEEDED | Input exceeds the file-size limit | resource | EXPERIMENTAL |
| NRS-NESTING-LIMIT-EXCEEDED | Input exceeds the nesting-depth limit | resource | EXPERIMENTAL |
| NRS-OBSERVATION-LIMIT-EXCEEDED | Input exceeds the observation-count limit | resource | EXPERIMENTAL |
| NRS-STRING-LIMIT-EXCEEDED | Input exceeds the string-length limit | resource | EXPERIMENTAL |
| NRS-RESOURCE-LIMIT-EXCEEDED | Input exceeds a declared resource limit | resource | EXPERIMENTAL |
| NRS-TIMEOUT-LIMIT-EXCEEDED | Processing exceeded the in-process time budget | resource | EXPERIMENTAL |
| NRS-MEMORY-LIMIT-EXCEEDED | Processing exceeded the in-process heap budget | resource | EXPERIMENTAL |
| NRS-SIGNATURE-NOT-YET-VERIFIED | Signature has not yet been verified | attestation | EXPERIMENTAL |
| NRS-SIGNATURE-ALGORITHM-NOT-ALLOWED | Signature algorithm is not on the allow-list | attestation | EXPERIMENTAL |
| NRS-SIGNATURE-INVALID | Signature does not verify against the assertion content | attestation | EXPERIMENTAL |
| NRS-SIGNATURE-VERIFICATION-ERROR | Signature verification could not run | attestation | EXPERIMENTAL |
| NRS-SIGNATURE-KEY-NOT-PINNED | Signature key is not pinned in the trust root | attestation | EXPERIMENTAL |
| NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY | Signature key is pinned but outside its validity window | attestation | EXPERIMENTAL |
| NRS-APPROVAL-ABSENT | No approval element is present to check | approval | EXPERIMENTAL |
| NRS-APPROVAL-SCOPE-MISMATCH | Approval scope does not identify the checked record | approval | EXPERIMENTAL |
| NRS-T-SQUARED-OVERFLOW | Squared test statistic overflows the tail-evaluation intermediate | computability | EXPERIMENTAL |
| NRS-LIFECYCLE-PRECONDITION-NOT-MET | Lifecycle operation precondition not met | precondition | EXPERIMENTAL |
