"""Oracle capture for the Welch comparison corpora (Batch 2 addendum U8).

Recomputes, for each dataset of the requested corpus, the SciPy oracle
values (ttest_ind with equal_var=False, plus t.ppf and confidence_interval
for the Phase 2A corpus) and the mpmath oracle values at a UNIFIED 60-digit
working precision (the original Phase 1 capture used 50 digits; the Phase 2A
capture already used 60 - this script replaces both procedures with one).

The mpmath path is end-to-end high precision from the raw observations:
means and sample variances as exact fractions, then standard error, Welch t,
Welch-Satterthwaite df, and the two-sided p-value via the regularized
incomplete beta,

    p = I_x(df/2, 1/2)  with  x = df / (df + t^2),

which equals 2 * P(T <= -|t|). Because tail p-values can fall below the
smallest positive binary64 subnormal (the TAIL_UNDERFLOW dataset exists to
demonstrate exactly this), the mpmath p is recorded BOTH as a binary64
float (possibly 0.0 after underflow) and as a 30-significant-digit decimal
string, which is the honest record of the oracle value.

This script is NOT part of pnpm check: it needs a Python environment
(scipy + mpmath) and is run manually to (re)produce the captured artifacts
under evidence/development/. See commands.txt in each oracle directory.

Usage:
    tsx tooling/src/evidence/export-oracle-datasets.ts <tmp>/datasets.json
    python tooling/oracle-capture/capture_oracle.py \
        --datasets <tmp>/datasets.json --corpus phase1 \
        --out evidence/development/phase-1/oracle/python-output.json
"""

from __future__ import annotations

import argparse
import json
import sys
from fractions import Fraction

import mpmath
from scipy import stats

MPMATH_DIGITS = 60
P_STRING_DIGITS = 30


def exact_mean_var(values: list[float]) -> tuple[Fraction, Fraction]:
    """Mean and n-1 sample variance as exact fractions of the binary64 inputs."""
    fracs = [Fraction(v) for v in values]
    n = len(fracs)
    mean = sum(fracs) / n
    var = sum((v - mean) ** 2 for v in fracs) / (n - 1)
    return mean, var


def mp_from_fraction(f: Fraction) -> mpmath.mpf:
    return mpmath.mpf(f.numerator) / mpmath.mpf(f.denominator)


def capture_dataset(g1: list[float], g2: list[float], with_ci: bool) -> dict:
    mpmath.mp.dps = MPMATH_DIGITS

    mean1, var1 = exact_mean_var(g1)
    mean2, var2 = exact_mean_var(g2)
    n1, n2 = len(g1), len(g2)

    a = mp_from_fraction(var1) / n1
    b = mp_from_fraction(var2) / n2
    se = mpmath.sqrt(a + b)
    mean_diff = mp_from_fraction(mean1 - mean2)
    t = mean_diff / se
    df_num = (a + b) ** 2
    df_den = a**2 / (n1 - 1) + b**2 / (n2 - 1)
    df = df_num / df_den

    # Two-sided p via the regularized incomplete beta (independent of any
    # Student t CDF library path shared with the reference kernel).
    x = df / (df + t**2)
    p_mp = mpmath.betainc(df / 2, mpmath.mpf(1) / 2, 0, x, regularized=True)

    scipy_result = stats.ttest_ind(g1, g2, equal_var=False)

    row = {
        "n1": n1,
        "mean1": float(mean1),
        "var1": float(var1),
        "n2": n2,
        "mean2": float(mean2),
        "var2": float(var2),
        "mean_difference": float(mean_diff),
        "standard_error": float(se),
        "test_statistic": float(t),
        "scipy_statistic": float(scipy_result.statistic),
        "scipy_df": float(scipy_result.df),
        "scipy_pvalue": float(scipy_result.pvalue),
        "degrees_of_freedom": float(df),
        "p_value_mpmath": float(p_mp),
        "p_value_mpmath_str": mpmath.nstr(p_mp, P_STRING_DIGITS),
        "mpmath_digits": MPMATH_DIGITS,
    }

    if with_ci:
        crit_scipy = float(stats.t.ppf(0.975, scipy_result.df))
        ci = scipy_result.confidence_interval(confidence_level=0.95)
        # mpmath 0.975 quantile via root finding on the same incomplete-beta
        # CDF (matches the original Phase 2A capture procedure).
        def cdf(u: mpmath.mpf) -> mpmath.mpf:
            xx = df / (df + u**2)
            tail = mpmath.betainc(df / 2, mpmath.mpf(1) / 2, 0, xx, regularized=True) / 2
            return tail if u < 0 else 1 - tail

        crit_mp = mpmath.findroot(lambda u: cdf(u) - mpmath.mpf("0.975"), mpmath.mpf(crit_scipy))
        row.update(
            {
                "scipy_critical_value": crit_scipy,
                "mpmath_critical_value": float(crit_mp),
                "scipy_ci_low": float(ci.low),
                "scipy_ci_high": float(ci.high),
            }
        )

    return row


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--datasets", required=True)
    parser.add_argument("--corpus", required=True, choices=["phase1", "phase2a", "tail", "floor"])
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    with open(args.datasets, encoding="utf-8") as f:
        corpora = json.load(f)["corpora"]
    datasets = corpora[args.corpus]

    with_ci = args.corpus == "phase2a"
    out = {}
    for name, data in datasets.items():
        out[name] = capture_dataset(data["groupA"], data["groupB"], with_ci)

    with open(args.out, "w", encoding="utf-8", newline="\n") as f:
        json.dump(out, f, indent=2)
        f.write("\n")

    print(
        f"capture_oracle: corpus={args.corpus} datasets={len(out)} "
        f"mpmath_digits={MPMATH_DIGITS} -> {args.out}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
