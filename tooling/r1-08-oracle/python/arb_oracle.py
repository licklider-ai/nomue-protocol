"""
Arb/acb enclosure oracle for Welch quantities via FLINT (python-flint).
Uses exact rational string inputs; no binary64 intermediate authority.
mpmath output is witness-only, not authority.
"""

from __future__ import annotations

import json
import sys
from fractions import Fraction

from flint import acb, arb, ctx
import mpmath


def _acb_from_frac(frac: Fraction, prec: int) -> acb:
    ctx.prec = prec
    return acb(frac.numerator) / acb(frac.denominator)


def _parse_frac(s: str) -> Fraction:
    if s in ("SE_ZERO", "INSUFFICIENT_OBSERVATIONS", "DF_UNDEFINED"):
        raise ValueError(f"degenerate fraction: {s}")
    if "/" not in s:
        return Fraction(s)
    n, d = s.split("/", 1)
    return Fraction(int(n), int(d))


def _reg_beta_lower(a: acb, b: acb, x: acb, prec: int) -> acb:
    ctx.prec = prec
    beta_ab = acb.gamma(a) * acb.gamma(b) / acb.gamma(a + b)
    return acb.beta_lower(x, a, b) / beta_ab


def _reg_beta_upper(a: acb, b: acb, x: acb, prec: int) -> acb:
    return acb(1) - _reg_beta_lower(a, b, x, prec)


def t_cdf_lower(t: acb, df: acb, prec: int) -> acb:
    """Match @stdlib/stats-base-dists-t-cdf/lib/main.js tail logic."""
    ctx.prec = prec
    x = float(t.real.mid())
    v = float(df.real.mid())
    if x == 0.0:
        return acb(0.5)
    x2 = x * x
    half = acb(0.5)
    df_half = df / 2
    if v > 2.0 * x2:
        z = acb(x2) / (df + acb(x2))
        p = _reg_beta_upper(half, df_half, z, prec) / 2
    else:
        z = df / (df + acb(x2))
        p = _reg_beta_lower(df_half, half, z, prec) / 2
    if x > 0.0:
        return acb(1) - p
    return p


def two_sided_p_from_t(t: acb, df: acb, prec: int) -> acb:
    abs_t = acb(abs(t.real.mid()))
    return 2 * t_cdf_lower(-abs_t, df, prec)


def quantile_adaptive(p_target: float, df_frac: Fraction, prec: int) -> acb:
    ctx.prec = prec
    df = _acb_from_frac(df_frac, prec)
    left = acb(0)
    right = acb(1)
    while float(t_cdf_lower(right, df, prec).real.upper()) < p_target:
        right *= 2
        if float(right.real.upper()) > 1e300:
            raise RuntimeError("quantile bracket expansion failed")

    for _ in range(256):
        mid = (left + right) / 2
        cdf = t_cdf_lower(mid, df, prec)
        cmid = float(cdf.real.mid())
        width = float((right - left).real.upper())
        if width < 2 ** (-min(prec, 80) + 6):
            return mid
        if abs(cmid - p_target) < 2 ** (-40):
            return mid
        if cmid < p_target:
            left = mid
        else:
            right = mid
    raise RuntimeError("quantile bisection did not converge")


def acb_enclosure(a: acb) -> dict:
    return {
        "lower": float(a.real.lower()),
        "upper": float(a.real.upper()),
        "mid": float(a.real.mid()),
    }


def mpmath_witness_p(t_abs: float, df: float, dps: int) -> float:
    """Witness-only: I_x(df/2, 1/2) equals the two-sided Welch p-value."""
    mpmath.mp.dps = dps
    x = mpmath.mpf(df) / (mpmath.mpf(df) + mpmath.mpf(t_abs) ** 2)
    a = mpmath.mpf(df) / 2
    b = mpmath.mpf(0.5)
    return float(mpmath.betainc(a, b, 0, x, regularized=True))


def process_case(case: dict, base_prec: int = 128) -> dict:
    se_sq = _parse_frac(case["se_squared"])
    df_frac = _parse_frac(case["welch_df"])
    mean_diff = _parse_frac(case["mean_difference"])

    prec = base_prec
    last_err: Exception | None = None
    for _ in range(4):
        try:
            ctx.prec = prec
            se_sq_a = _acb_from_frac(se_sq, prec)
            se = acb.sqrt(se_sq_a)
            mean_a = _acb_from_frac(mean_diff, prec)
            t = mean_a / se
            df_a = _acb_from_frac(df_frac, prec)
            p = two_sided_p_from_t(t, df_a, prec)
            crit_p = 1 - (1 - 0.95) / 2
            crit = quantile_adaptive(crit_p, df_frac, prec)
            ci_lower = mean_a - crit * se
            ci_upper = mean_a + crit * se

            witness = mpmath_witness_p(abs(float(t.real.mid())), float(df_frac), 100)

            return {
                "case_id": case["case_id"],
                "prec": prec,
                "standard_error": acb_enclosure(se),
                "test_statistic": acb_enclosure(t),
                "p_value": acb_enclosure(p),
                "critical_value": acb_enclosure(crit),
                "ci_lower": acb_enclosure(ci_lower),
                "ci_upper": acb_enclosure(ci_upper),
                "mpmath_witness_p_100dps": witness,
                "oracle_kind": "acb_incomplete_beta_enclosure",
                "package": "python-flint",
            }
        except Exception as exc:  # noqa: BLE001
            last_err = exc
            prec *= 2
    raise RuntimeError(f"Arb/acb oracle failed: {last_err}")


def main() -> None:
    payload = json.load(sys.stdin)
    cases = payload.get("cases", [])
    results = [process_case(c) for c in cases]
    json.dump(
        {
            "results": results,
            "oracle_kind": "acb_incomplete_beta_enclosure",
            "package": "python-flint",
            "note": "mpmath column is witness-only",
        },
        sys.stdout,
        indent=2,
    )


if __name__ == "__main__":
    main()
