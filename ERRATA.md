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
in this repository's `main` branch and in nomue-verifier commit
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
