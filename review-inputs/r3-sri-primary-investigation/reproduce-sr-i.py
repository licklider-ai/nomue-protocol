#!/usr/bin/env python3
"""Reproduction diagnostics for the SR-I independent primary-source investigation.

Scope: small recomputations that test the investigator's reading of
Games and Howell (1976), Tamhane (1979), and Dunnett (1980b). They are
investigator-side diagnostics, not oracle evidence, not a numerical
contract, and not a claim that any procedure is adopted.

Two computational routes are used for the Studentized-range quantiles:
  route B: an own fixed-node quadrature of the classical integral
           representation of the Studentized range distribution, with the
           quantile found by root-finding (this file);
  route A: scipy.stats.studentized_range.cdf evaluated at the route-B
           quantile (an independent implementation of the same law); the
           returned probability is printed and should equal 1 - alpha.
The Studentized maximum modulus (SMM) quantiles use the same own
quadrature; scipy has no SMM law, so the SMM route is cross-checked
against closed forms (k* = 1 gives a Student t point; nu = infinity gives
the normal closed form) and against the printed values in the sources.

Requires numpy and scipy (versions printed at run time).
"""

from __future__ import annotations

import math
import sys

import numpy as np
import scipy
from scipy import optimize, stats

ALPHA = 0.05
_Z_NODES, _Z_WEIGHTS = np.polynomial.legendre.leggauss(400)
_U_NODES, _U_WEIGHTS = np.polynomial.legendre.leggauss(240)


def _z_grid(lo: float = -9.0, hi: float = 9.0) -> tuple[np.ndarray, np.ndarray]:
    half = (hi - lo) / 2
    return lo + half * (_Z_NODES + 1), half * _Z_WEIGHTS


def _s_grid(nu: float) -> tuple[np.ndarray, np.ndarray]:
    """Nodes s = sqrt(chi2_nu / nu) mapped through the chi-square probability integral."""
    u = 0.5 * (_U_NODES + 1)
    w = 0.5 * _U_WEIGHTS
    s = np.sqrt(stats.chi2.ppf(u, nu) / nu)
    return s, w


def range_cdf_known_scale(q: np.ndarray, k: int) -> np.ndarray:
    """P(range of k iid N(0,1) <= q) for an array of q."""
    z, wz = _z_grid()
    q = np.atleast_1d(q)[:, None]
    inner = stats.norm.pdf(z) * (stats.norm.cdf(z + q) - stats.norm.cdf(z)) ** (k - 1)
    return k * (inner * wz).sum(axis=1)


def sr_cdf_own(q: float, k: int, nu: float) -> float:
    if math.isinf(nu):
        return float(range_cdf_known_scale(np.array([q]), k)[0])
    s, ws = _s_grid(nu)
    return float((range_cdf_known_scale(q * s, k) * ws).sum())


def sr_quantile_own(k: int, nu: float, alpha: float = ALPHA) -> float:
    return optimize.brentq(lambda q: sr_cdf_own(q, k, nu) - (1 - alpha), 0.5, 25.0, xtol=1e-8)


def sr_cdf_scipy(q: float, k: int, nu: float) -> float:
    if math.isinf(nu):
        nu = 1e7
    return float(stats.studentized_range.cdf(q, k, nu))


def smm_cdf(m: float, kstar: int, nu: float) -> float:
    if math.isinf(nu):
        return (2 * stats.norm.cdf(m) - 1) ** kstar
    s, ws = _s_grid(nu)
    return float((((2 * stats.norm.cdf(m * s) - 1) ** kstar) * ws).sum())


def smm_quantile(kstar: int, nu: float, alpha: float = ALPHA) -> float:
    return optimize.brentq(lambda m: smm_cdf(m, kstar, nu) - (1 - alpha), 0.5, 25.0, xtol=1e-8)


def sidak_t(kstar: int, nu: float, alpha: float = ALPHA) -> float:
    """Two-sided Sidak t point: P(|t_nu| <= c) = (1 - alpha)^(1/k*)."""
    gamma_two_sided = 1 - (1 - alpha) ** (1 / kstar)
    if math.isinf(nu):
        return float(stats.norm.ppf(1 - gamma_two_sided / 2))
    return float(stats.t.ppf(1 - gamma_two_sided / 2, nu))


def welch_df(a: float, b: float, nu_i: float, nu_j: float) -> float:
    """Welch / Satterthwaite df with a = s_i^2/n_i, b = s_j^2/n_j."""
    return (a + b) ** 2 / (a * a / nu_i + b * b / nu_j)


def banner(title: str) -> None:
    print("\n" + "=" * 78)
    print(title)
    print("=" * 78)


def self_checks() -> None:
    banner("0. Self-checks of the own quadrature")
    # k = 2: q_{2,nu}/sqrt2 equals the two-sided t point.
    for nu in (4, 10, 30):
        q = sr_quantile_own(2, nu) / math.sqrt(2)
        t = stats.t.ppf(0.975, nu)
        print(f"k=2, nu={nu}: q/sqrt2 own {q:.5f} vs t_{{nu,.025}} {t:.5f}")
        assert abs(q - t) < 2e-4
    # SMM with k* = 1 equals the two-sided t point.
    for nu in (4, 12):
        m = smm_quantile(1, nu)
        t = stats.t.ppf(0.975, nu)
        print(f"k*=1, nu={nu}: SMM own {m:.5f} vs t_{{nu,.025}} {t:.5f}")
        assert abs(m - t) < 2e-4
    # Known-variance range point, k = 4: 3.633 in standard tables.
    q_inf = sr_quantile_own(4, float("inf"))
    print(f"k=4, nu=inf: q own {q_inf:.4f}; scipy cdf at that point {sr_cdf_scipy(q_inf, 4, float('inf')):.5f}")


# ---------------------------------------------------------------------------
# 1. Games and Howell (1976) Table V recomputation (printed p. 123)
# ---------------------------------------------------------------------------
def games_howell_table_v() -> None:
    banner("1. Games-Howell (1976) Table IV/V recomputation, printed pp. 122-123")
    means = {1: 29.40, 2: 29.86, 3: 26.00, 4: 32.86}
    vars_ = {1: 0.3000, 2: 0.4762, 3: 0.000, 4: 0.2857}
    ns = {1: 5, 2: 7, 3: 10, 4: 14}
    printed = {
        (4, 3): (6.86, 48.021, 13, 2.93, 6.4408, 7.2792),
        (4, 1): (3.46, 12.202, 7, 3.32, 2.5196, 4.4004),
        (2, 3): (3.86, 14.799, 6, 3.46, 2.9563, 4.7637),
        (4, 2): (3.00, 10.088, 10, 3.06, 2.0895, 3.9105),
        (2, 1): (0.46, 1.286, 10, 3.06, -0.6355, 1.5555),
        (1, 3): (3.40, 13.880, 4, 4.07, 2.4023, 4.3977),
    }
    print(f"{'pair':>5} {'diff':>6} {'v':>8} {'nu exact':>9} {'nu int':>6} "
          f"{'q/sqrt2 int(B)':>15} {'scipy cdf':>10} {'printed':>8} "
          f"{'CI (int df, own)':>22} {'printed CI':>20}")
    for (k, kp), (d_p, v_p, nu_p, crit_p, lo_p, hi_p) in printed.items():
        a = vars_[k] / ns[k]
        b = vars_[kp] / ns[kp]
        se = math.sqrt(a + b)
        diff = means[k] - means[kp]
        v = diff / se
        nu = welch_df(a, b, ns[k] - 1, ns[kp] - 1)
        nu_int = int(round(nu))
        q = sr_quantile_own(4, nu_int)
        crit = q / math.sqrt(2)
        lo = diff - crit * se
        hi = diff + crit * se
        print(f"{k}-{kp:<3} {diff:6.2f} {v:8.3f} {nu:9.3f} {nu_int:6d} "
              f"{crit:15.4f} {sr_cdf_scipy(q, 4, nu_int):10.5f} {crit_p:8.2f} "
              f"{lo:10.4f} {hi:11.4f} {lo_p:9.4f} {hi_p:10.4f}")
        assert abs(v - v_p) < 0.002, (k, kp, v, v_p)
        assert nu_int == nu_p, (k, kp, nu, nu_p)
    q47 = sr_quantile_own(4, 7)
    print(f"\nq(.05,4,7): own {q47:.4f} (scipy cdf there {sr_cdf_scipy(q47, 4, 7):.5f}); "
          f"printed text uses 4.69 (p. 123), i.e. 4.69/1.4142 = {4.69/1.4142:.4f}")
    hw = (7.2792 - 6.4408) / 2
    se43 = math.sqrt(0.2857 / 14)
    print(f"q(.05,4,13): own {sr_quantile_own(4, 13):.4f}; implied by the printed 4-3 interval: "
          f"half-width {hw:.4f} / se {se43:.5f} * sqrt2 = {hw / se43 * math.sqrt(2):.4f}")
    a = vars_[4] / ns[4]
    b = vars_[1] / ns[1]
    nu = welch_df(a, b, 13, 4)
    print(f"pair 4-1 with fractional df {nu:.3f}: q/sqrt2 = {sr_quantile_own(4, nu)/math.sqrt(2):.4f} "
          f"(integer-rounded df 7 gives {q47/math.sqrt(2):.4f})")


# ---------------------------------------------------------------------------
# 2. Tamhane (1979) p. 475 inequality  q_{k,nu,alpha}/sqrt2 <= t_{nu,gamma}
# ---------------------------------------------------------------------------
def tamhane_inequality() -> None:
    banner("2. Tamhane (1979) p. 475: q_{nu,k,alpha}/sqrt2 <= t_{nu,gamma}, equality iff k = 2; "
           "and Dunnett (1980b) ordering GH <= T3 <= T2 at common df")
    worst = -np.inf
    print(f"{'k':>2} {'nu':>5} {'q/sqrt2 own':>12} {'scipy cdf':>10} {'Sidak t (T2)':>13} "
          f"{'SMM (T3)':>9} {'GH<=T3<=T2':>11}")
    for k in (2, 3, 4, 6, 8):
        kstar = k * (k - 1) // 2
        for nu in (3, 5, 6, 8, 10, 12, 24, 48, 120, float("inf")):
            q = sr_quantile_own(k, nu)
            qa = q / math.sqrt(2)
            t_gamma = sidak_t(kstar, nu)
            smm = smm_quantile(kstar, nu)
            ok = qa <= smm + 1e-6 and smm <= t_gamma + 1e-6
            worst = max(worst, qa - t_gamma)
            print(f"{k:2d} {nu:>5} {qa:12.4f} {sr_cdf_scipy(q, k, nu):10.5f} {t_gamma:13.4f} "
                  f"{smm:9.4f} {str(ok):>11}")
    print(f"\nmax over the grid of (q/sqrt2 - Sidak t) = {worst:.6f} "
          f"(<= 0 on the grid, with equality at k = 2 up to quadrature tolerance)")


# ---------------------------------------------------------------------------
# 3. Tamhane (1979) Table 2 critical points (printed p. 476)
# ---------------------------------------------------------------------------
def tamhane_table2() -> None:
    banner("3. Tamhane (1979) Table 2 (p. 476): q_{k,nu,alpha} and |m|_{k',nu,alpha}")
    for k, nu, q_p, m_p in ((4, 24, 3.901, 2.851), (8, 48, 4.481, 3.286)):
        kstar = k * (k - 1) // 2
        q = sr_quantile_own(k, nu)
        m = smm_quantile(kstar, nu)
        print(f"k={k} nu={nu}: q own {q:.4f} (scipy cdf {sr_cdf_scipy(q, k, nu):.5f}) printed {q_p}; "
              f"|m|_{{{kstar},{nu}}} own {m:.4f} printed {m_p}")
    for k, nu, m_p in ((4, 36, 2.775), (8, 72, 3.228)):
        kstar = k * (k - 1) // 2
        m = smm_quantile(kstar, nu)
        print(f"k={k} nu={nu}: |m|_{{{kstar},{nu}}} own {m:.4f} printed {m_p}")


# ---------------------------------------------------------------------------
# 4. Dunnett (1980b) Table 2 (printed p. 798): average A for C and T3, k = 4
# ---------------------------------------------------------------------------
def dunnett_table2() -> None:
    banner("4. Dunnett (1980b) Table 2 (p. 798): average A_{ij,alpha,k} for C and T3, k = 4")
    printed = {
        (7, 7, 7, 7): {1: (3.46, 3.09), 2: (3.46, 3.15), 4: (3.46, 3.29), 10: (3.46, 3.46), math.inf: (3.46, 3.66)},
        (7, 9, 11, 13): {1: (3.17, 2.95), 2: (3.22, 3.04), 4: (3.25, 3.17), 10: (3.28, 3.32), math.inf: (3.31, 3.49)},
        (14, 14, 14, 14): {1: (2.94, 2.83), 2: (2.94, 2.86), 4: (2.94, 2.91), 10: (2.94, 2.98), math.inf: (2.94, 3.06)},
        (56, 56, 56, 56): {1: (2.65, 2.68), 2: (2.65, 2.68), 4: (2.65, 2.69), 10: (2.65, 2.71), math.inf: (2.65, 2.72)},
    }
    k = 4
    kstar = 6
    cache: dict[float, float] = {}

    def sr(nu: float) -> float:
        if nu not in cache:
            cache[nu] = sr_quantile_own(k, nu)
        return cache[nu]

    for sizes, cols in printed.items():
        nus = [n - 1 for n in sizes]
        print(f"sample sizes {sizes}")
        for V, (c_p, t3_p) in cols.items():
            c_vals = []
            t3_vals = []
            for i in range(k):
                for j in range(i + 1, k):
                    nu_i, nu_j = nus[i], nus[j]
                    if math.isinf(V):
                        sr_star = sr(nu_i)
                        nu_hat = nu_i
                    else:
                        a, b = float(V), 1.0
                        sr_star = (sr(nu_i) * a + sr(nu_j) * b) / (a + b)
                        nu_hat = welch_df(a, b, nu_i, nu_j)
                    c_vals.append(sr_star / math.sqrt(2))
                    t3_vals.append(smm_quantile(kstar, nu_hat))
            print(f"  V={V!s:>4}: C own {np.mean(c_vals):.3f} printed {c_p:.2f} | "
                  f"T3 own {np.mean(t3_vals):.3f} printed {t3_p:.2f}")


# ---------------------------------------------------------------------------
# 5. Dunnett (1980b) p. 800 degrees-of-freedom identity
# ---------------------------------------------------------------------------
def dunnett_df_identity() -> None:
    banner("5. Dunnett (1980b) p. 800: 1/nu_hat = 1/nu' - 2V/((V+1)^2 nu_bar)")
    print("nu' taken on the reciprocal scale: 1/nu' = (V/(V+1))(1/nu_i) + (1/(V+1))(1/nu_j); "
          "nu_bar = harmonic mean of nu_i, nu_j")
    worst_recip = 0.0
    worst_arith = 0.0
    for nu_i, nu_j in ((6, 12), (6, 6), (4, 30), (10, 100)):
        for V in (0.1, 0.5, 1.0, 2.0, 10.0):
            nu_hat = welch_df(V, 1.0, nu_i, nu_j)
            nu_bar = 2 / (1 / nu_i + 1 / nu_j)
            inv_nu_prime_recip = (V / (V + 1)) / nu_i + (1 / (V + 1)) / nu_j
            rhs_recip = inv_nu_prime_recip - 2 * V / ((V + 1) ** 2 * nu_bar)
            nu_prime_arith = (V * nu_i + nu_j) / (V + 1)
            rhs_arith = 1 / nu_prime_arith - 2 * V / ((V + 1) ** 2 * nu_bar)
            worst_recip = max(worst_recip, abs(1 / nu_hat - rhs_recip))
            worst_arith = max(worst_arith, abs(1 / nu_hat - rhs_arith))
            assert min(nu_i, nu_j) - 1e-9 <= nu_hat <= nu_i + nu_j + 1e-9
    print(f"max |1/nu_hat - RHS| with reciprocal-scale nu' : {worst_recip:.2e} (identity holds)")
    print(f"max |1/nu_hat - RHS| with arithmetic-scale nu' : {worst_arith:.2e} (identity does not hold)")
    print("Also confirmed on the grid: min(nu_i, nu_j) <= nu_hat <= nu_i + nu_j "
          "(the Ury-Wiggins range quoted by Tamhane p. 474).")


# ---------------------------------------------------------------------------
# 6. Small independent Monte Carlo spot check of Dunnett (1980b) Table 1
# ---------------------------------------------------------------------------
def monte_carlo_spot_check(reps: int = 40000, seed: int = 20260908) -> None:
    banner(f"6. Independent Monte Carlo spot check of Dunnett (1980b) Table 1, c = 1, x1, {reps} replicates")
    rng = np.random.default_rng(seed)
    cases = (
        (4, (7, 7, 7, 7), {"GH": 0.0503, "C": 0.0246, "T2": 0.0366, "T3": 0.0392}),
        (4, (7, 9, 11, 13), {"GH": 0.0527, "C": 0.0306, "T2": 0.0407, "T3": 0.0438}),
        (8, (7,) * 8, {"GH": 0.0593, "C": 0.0225, "T2": 0.0323, "T3": 0.0424}),
    )
    for k, sizes, printed in cases:
        kstar = k * (k - 1) // 2
        nus = np.array([n - 1 for n in sizes], dtype=float)
        grid = np.linspace(nus.min(), 2 * nus.max(), 61)
        q_grid = np.array([sr_quantile_own(k, g) for g in grid])
        smm_grid = np.array([smm_quantile(kstar, g) for g in grid])
        t_grid = np.array([sidak_t(kstar, g) for g in grid])
        sr_int = {nu: sr_quantile_own(k, nu) for nu in set(nus.tolist())}
        inv_grid = 1 / grid[::-1]

        ybar = rng.standard_normal((reps, k)) / np.sqrt(np.array(sizes))
        s2 = rng.chisquare(nus, (reps, k)) / nus  # sigma_i^2 = 1 for all i (c = 1)
        tau = s2 / np.array(sizes)
        any_err = {name: np.zeros(reps, bool) for name in ("GH", "C", "T2", "T3")}
        for i in range(k):
            for j in range(i + 1, k):
                a, b = tau[:, i], tau[:, j]
                stat = np.abs(ybar[:, i] - ybar[:, j]) / np.sqrt(a + b)
                nu_hat = (a + b) ** 2 / (a * a / nus[i] + b * b / nus[j])
                # interpolation on reciprocal df, as in the sources' table interpolation
                q = np.interp(1 / nu_hat, inv_grid, q_grid[::-1])
                any_err["GH"] |= stat > q / math.sqrt(2)
                sr_star = (sr_int[nus[i]] * a + sr_int[nus[j]] * b) / (a + b)
                any_err["C"] |= stat > sr_star / math.sqrt(2)
                any_err["T2"] |= stat > np.interp(1 / nu_hat, inv_grid, t_grid[::-1])
                any_err["T3"] |= stat > np.interp(1 / nu_hat, inv_grid, smm_grid[::-1])
        print(f"k={k}, sizes={sizes}:")
        for name, err in any_err.items():
            rate = err.mean()
            se_rate = math.sqrt(rate * (1 - rate) / reps)
            print(f"  {name:>3}: own estimate {rate:.4f} (SE {se_rate:.4f}); "
                  f"Dunnett Table 1 printed {printed[name]:.4f}")


if __name__ == "__main__":
    print(f"python {sys.version.split()[0]}, numpy {np.__version__}, scipy {scipy.__version__}")
    self_checks()
    games_howell_table_v()
    tamhane_inequality()
    tamhane_table2()
    dunnett_table2()
    dunnett_df_identity()
    monte_carlo_spot_check()
