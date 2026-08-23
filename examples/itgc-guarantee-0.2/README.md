# ITGC Guarantee Example Record (Phase 2A)

**Informative, non-normative.** A complete valid Record under the Phase 2A
bundle `urn:nomue:bundle:itgc-guarantee:0.2.0-draft.1`; not a conformance
fixture. The Phase 1 example remains at
[../minimal-itgc-record/](../minimal-itgc-record/README.md).

| File                         | Content                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `record.json`                | A complete valid Phase 2A Record                                                 |
| `expected-verification.json` | The verification report (`generated_at` and `verifier.source_commit` normalized) |
| `canonical-content.json`     | The JCS canonical form of the digest projection                                  |
| `hashes.sha256`              | SHA-256 hashes of the three files above                                          |

Verify it yourself:

```bash
pnpm nomue-record verify examples/itgc-guarantee-0.2/record.json
```

## About the data and the result

The observations are **synthetic**: ten invented numbers, five biological
replicates per group, from no real experiment. The declared result carries:

- the **unstandardized arithmetic mean difference** (first group in
  `group_order` minus the second) as the supported effect estimate,
- its Welch standard error,
- the **two-sided 95% Welch-Satterthwaite confidence interval**,
- the Welch test statistic, degrees of freedom, and p-value.

## What this example does not contain or claim

- no standardized effect size (deliberately absent; `not_asserted`),
- no significance boolean and no significant/non-significant classification,
- declaration truth is not verified (admissibility judges declared structure
  only),
- scientific validity is `not_asserted`,
- no Figure/Methods/Results binding, no attestation.
