# nomue Protocol Errata

Known defects in published nomue Protocol releases, and what they change for a
relying party.

An entry here records a defect found after publication. It does not withdraw a
published snapshot, reopen a release gate, resign a release, or renumber a
public check. A published snapshot is immutable; where a defect is in the
non-normative reference implementation rather than in the specification, the
specification's meaning is unchanged and the corrected behaviour is the one the
specification already required.

This file is informative. It carries no Protocol authority and defines no
Protocol meaning.

| ID   | Release   | Subject                                             | Status                    |
| ---- | --------- | --------------------------------------------------- | ------------------------- |
| ER-1 | Release 1 | Student-t centre precision at one degree of freedom | Corrected after Release 1 |
| ER-2 | Release 1 | Fixed Welch recompute tolerances on large-offset data | Open; successor check version planned |

---

## ER-1: Student-t centre precision at one degree of freedom

- **Affected artifact:** the reference verifier distributed with Release 1
  (tag [`release-1`](https://github.com/licklider-ai/nomue-protocol/releases/tag/release-1),
  published 2026-08-24).
- **Affected bundle:** `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`.
- **Affected checks:** `urn:nomue:check:welch-computability:0.2.1-draft.1` and
  `urn:nomue:check:welch-recompute:0.2.1-draft.1`.
- **Class:** defect in the non-normative reference implementation. The
  specification is unaffected.
- **Reported:** 2026-09-19, by repository audit.

### What is wrong

The Release 1 reference verifier evaluates the Student-t CDF by delegating to
its pinned dependency with no special handling at one degree of freedom. Near
the distribution centre at `df = 1` that path loses all representable
precision: it returns exactly `0.5`, so the two-sided p-value becomes exactly
`1`.

For one degree of freedom the Student-t distribution is the standard Cauchy
distribution, whose CDF has the closed form `F(t; 1) = 1/2 + atan(t)/pi`. At
`t = 7.45e-9`, `df = 1`:

| Quantity      | Release 1 reports | Correct value        |
| ------------- | ----------------- | -------------------- |
| `F(t; 1)`     | `0.5`             | `0.5000000023714086` |
| two-sided `p` | `1`               | `0.9999999952571827` |

The relative error is `4.74e-9`, about 47 times the `p_value` relative
tolerance of `1e-10` that the affected check version declares.

### Which Records are affected

Records whose Welch-Satterthwaite degrees of freedom are at or very near `1`
with a test statistic near zero. This region is inside the published support
boundary: two observations per group satisfies conformance, and the
computability check requires only finite degrees of freedom and a positive
standard error. When one group has zero sample variance the
Welch-Satterthwaite denominator reduces to the other group's term and `df` is
exactly `1`.

Records outside that region are unaffected.

### What it changes for a relying party

The defect moves the scoped verification outcome in **both** directions:

| Declared `p_value`                            | Release 1 verifier      | Corrected verifier                    |
| --------------------------------------------- | ----------------------- | ------------------------------------- |
| `1` (the quantized, incorrect value)          | **pass** — false accept | fail (`NRS-DECLARED-RESULT-MISMATCH`) |
| `0.9999999952571827` (mathematically correct) | **fail** — false reject | pass                                  |

The false-reject direction is the one a third party meets first: **a producer
who computes the p-value correctly is told by the Release 1 verifier that its
Record does not verify.** A relying party who saw such a failure in this region
should re-run against a corrected verifier before treating it as a defect in
the Record.

All other checks, all other regions, Record semantics, canonicalization rules
and registered identifiers are unaffected.

### Why no check version changes

The normative p-value is the mathematical definition bound to
`NRS-PROFILE-ITGC-0011`, not any implementation. The corrected value is the one
the specification already required, so no public check behaviour or tolerance
changed and no check version is renumbered. The reference verifier is
non-normative and, as
[AUTHORITY.md](AUTHORITY.md) states, may expose bugs without changing Protocol
meaning.

The published Release 1 snapshot, its signature, its Protocol snapshot hash and
its gate decisions are unchanged.

### Correction and how to check it

The correction evaluates the exact Cauchy form for `|t| <= 1`. It is available
to users as `@licklider/nomue-verifier@0.2.1-rc.1` or later, and in this
repository's `main` branch and nomue-verifier commit
`731d5a4fcd3ee67f7690d8087948e44239cbb165`; the intake record is
[`evidence/development/student-t-df1-center-reference-intake.md`](evidence/development/student-t-df1-center-reference-intake.md).

Conformance fixtures `A2-1-V-004` (positive) and `A2-1-P-005` (negative) pin the
corrected behaviour. Their expected p-value is derived from the exact Cauchy
identity rather than from the reference implementation, so an independent
verifier that carries the same centre-quantizing defect fails `A2-1-V-004` and
passes `A2-1-P-005` — the pair distinguishes a correct `df = 1` implementation
from a defective one. Before these fixtures, the lowest degrees of freedom
anywhere in the conformance corpus was `1.4705882352941178`, so no fixture
exercised this region.

To check an implementation directly, evaluate the closed form:

```text
F(t; 1)      = 1/2 + atan(t)/pi
two-sided p  = 1 + 2 * atan(-|t|) / pi
```

A conforming implementation reproduces `0.9999999952571827` at
`t = 7.45e-9`, `df = 1`.

---

## ER-2: Fixed Welch recompute tolerances on large-offset data

- **Affected release:** Release 1 (tag
  [`release-1`](https://github.com/licklider-ai/nomue-protocol/releases/tag/release-1)).
- **Affected checks:** `urn:nomue:check:welch-recompute:0.1.0-draft.1`,
  `urn:nomue:check:welch-recompute:0.2.0-draft.1` and
  `urn:nomue:check:welch-recompute:0.2.1-draft.1`.
- **Class:** limit of the specification's comparison rule, reproduced with an
  independent implementation of the reference kernel's documented arithmetic.
  It compares a declared value with a recomputed value under fixed tolerances (absolute `1e-12`; relative `1e-12`,
  or `1e-10` for the p-value and interval endpoints), and does not require the
  recomputation to be accurate enough for that tolerance on every input.
- **Reported:** 2026-09-27, by internal numerical study; reproduced by an
  independent review.

### What is wrong

When the values in each group share a large common offset compared with the
difference between the group means, a binary64 recomputation of the Welch
statistic loses accuracy in the group means. Two-pass procedures with ordinary
or compensated summation, including an independent reproduction of the reference kernel's documented
algorithm, can differ from the exact value by far more than the tolerance.
Example: observations `1.7e9 + k * 1e-6` against `1.7e9 + k * 2e-6`,
`k = 0, ..., n - 1`:

| n per group | Exact t | Compensated two-pass t | Relative error |
| --- | --- | --- | --- |
| 3 | -0.7985836518841365 | -0.7364596943186588 | 7.8% |
| 10 | -2.0942101745867383 | -2.116343116932037 | 1.06% |
| 30 | -4.034477696583975 | -4.047687547540484 | 0.33% |

A binary64 procedure can avoid this (for example by forming the difference of
the group sums as one correctly rounded sum), so whether a Record passes
depends on how the verifier computes.

### Which Records are affected

Records whose group means are large compared with the difference of the means
can be affected. In the example above, at the scale of raw epoch timestamps
with microsecond differences, the observed error reaches whole percent.
The examples do not establish a universal offset threshold or prevalence.

### What it changes for a relying party

The outcome can move in both directions on affected Records:

- a declaration that is correct for the exact values can **fail**;
- a declaration that matches the verifier's own rounding can **pass** while
  being about 0.3 to 10 percent from the exact value.

On such Records, a Release 1 recompute result alone cannot establish that
the declared values are close to the exact mathematical values. A successor
check version that compares with exact values under a documented domain is planned; Release 1 itself does not change.
