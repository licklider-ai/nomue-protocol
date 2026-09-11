#!/usr/bin/env python3
"""Supplemental deterministic checks for the targeted SR-D follow-up.

This script supplements, and does not replace, review-inputs/r3-srd-primary-
investigation/reproduce-sr-d.py (blob ef6e2c15...).  It answers four bounded
questions from the follow-up instruction in the pull request #231 body:

  A. Marcus, Peritz and Gabriel (1976) Table 1 (printed p. 658): count the
     printed cells that differ from the paper's own formula, by cell rather than
     by row, and show that a changed cell count is detected.  Two independent
     chi-square tail implementations and two source-independent closed-form
     checks separate arithmetic accuracy from transcription consistency.
  B. Mathematical scope versus numerical examples: an exact worst-case FWER
     enumeration for the fallback with four hypotheses; the closed test versus
     the shortcut under every selection order; the general proportional graph
     for two-family parallel Bonferroni gatekeeping on several (k, m) pairs; and
     an exact symbolic epsilon -> 0 limit (rational functions in epsilon, no
     floating point, no rounding) for the serial epsilon-graph construction.
  C. Dmitrienko, Offen and Westfall (2003): an independently written closed
     testing calculation reproducing Table III under the two singleton
     conventions, with decision-bearing differences.

Everything is exact rational arithmetic except the chi-square tails in A, which
are floating-point closed forms cross-checked by a second implementation.  No
random numbers, no simulation, Python 3 standard library only.

Run:  python3 review-inputs/r3-srd-targeted-followup/followup-checks.py
Exit status 0 when every recorded expectation is met.
"""

from __future__ import annotations

import itertools
import math
from fractions import Fraction as F

FAILURES: list[str] = []


def check(name: str, ok: bool, detail: str = "") -> None:
    status = "ok  " if ok else "FAIL"
    print(f"[{status}] {name}" + (f"  ({detail})" if detail else ""))
    if not ok:
        FAILURES.append(name)


def info(msg: str) -> None:
    print(f"[info] {msg}")


# ==========================================================================
# A. Marcus, Peritz and Gabriel (1976), Table 1
# ==========================================================================

# Printed Table 1 (p. 658), re-transcribed on 2026-09-09 from the page image
# (row order as printed, column by column).  Values are (5 % point, 1 % point).
TABLE1 = {
    (2, 2): (4.231, 7.290), (2, 3): (5.088, 8.352), (2, 4): (5.686, 9.090),
    (2, 5): (6.144, 9.653), (2, 6): (6.513, 10.106), (2, 7): (6.822, 10.484),
    (2, 8): (7.087, 10.808), (3, 3): (5.862, 9.295), (3, 4): (6.415, 9.970),
    (3, 5): (6.845, 10.494), (3, 6): (7.194, 10.919), (3, 7): (7.488, 11.277),
    (4, 4): (6.944, 10.611), (4, 5): (7.356, 11.110), (4, 6): (7.694, 11.518),
    (5, 5): (7.757, 11.593), (2, 2, 2): (5.435, 8.747), (2, 2, 3): (6.184, 9.661),
    (2, 2, 4): (6.723, 10.320), (2, 2, 5): (7.144, 10.832), (2, 2, 6): (7.487, 11.250),
    (2, 3, 3): (6.885, 10.508), (2, 3, 4): (7.394, 11.128), (2, 3, 5): (7.799, 11.613),
    (2, 4, 4): (7.892, 11.723), (3, 3, 3): (7.552, 11.307), (3, 3, 4): (8.043, 11.897),
    (2, 2, 2, 2): (6.322, 10.019), (2, 2, 2, 3): (6.966, 10.848),
    (2, 2, 2, 4): (7.440, 11.457), (2, 2, 3, 3): (7.585, 11.633),
    (2, 2, 2, 2, 2): (7.248, 11.001),
}
ALPHAS = (0.05, 0.01)


def stirling1_unsigned(n: int) -> list[int]:
    row = [1]
    for i in range(n):
        new = [0] * (len(row) + 1)
        for m_, c in enumerate(row):
            new[m_] += i * c
            new[m_ + 1] += c
        row = new
    return row


def level_probabilities(lam: int) -> dict[int, F]:
    """p(m; lambda) for equal sample sizes as |s(lambda, m)| / lambda!.

    The source (p. 657) defines p(.; m; lambda) only as "the probability that the
    amalgamation process leads to exactly m different values" and refers to
    Barlow et al. (1972) for its values; the Stirling-number form is the
    investigator's (standard) formula, partially corroborated below by two
    orthant-probability identities that do not use Stirling numbers.
    """
    s = stirling1_unsigned(lam)
    return {m_: F(s[m_], math.factorial(lam)) for m_ in range(1, lam + 1)}


def chi2_sf_closed(df: int, x: float) -> float:
    """Implementation 1: closed forms for integer df (as in the earlier script)."""
    if df == 0:
        return 0.0
    if x <= 0:
        return 1.0
    if df % 2 == 0:
        n = df // 2
        term, total = 1.0, 0.0
        for i in range(n):
            if i > 0:
                term *= (x / 2) / i
            total += term
        return math.exp(-x / 2) * total
    n = (df - 1) // 2
    total = math.erfc(math.sqrt(x / 2))
    coeff = math.sqrt(2 * x / math.pi) * math.exp(-x / 2)
    term = 1.0
    for i in range(1, n + 1):
        if i > 1:
            term *= x / (2 * i - 1)
        total += coeff * term
    return total


def _gammainc_upper_regularized(a: float, x: float) -> float:
    """Implementation 2: Q(a, x) by series / continued fraction (independent of 1)."""
    if x <= 0:
        return 1.0
    lg = math.lgamma(a)
    if x < a + 1:
        # series for P(a, x)
        ap, s, d = a, 1.0 / a, 1.0 / a
        for _ in range(10000):
            ap += 1
            d *= x / ap
            s += d
            if abs(d) < abs(s) * 1e-16:
                break
        return 1.0 - s * math.exp(-x + a * math.log(x) - lg)
    # Lentz continued fraction for Q(a, x)
    tiny = 1e-300
    b = x + 1 - a
    c = 1 / tiny
    d = 1 / b
    h = d
    for i in range(1, 10000):
        an = -i * (i - a)
        b += 2
        d = an * d + b
        if abs(d) < tiny:
            d = tiny
        c = b + an / c
        if abs(c) < tiny:
            c = tiny
        d = 1 / d
        delta = d * c
        h *= delta
        if abs(delta - 1) < 1e-16:
            break
    return math.exp(-x + a * math.log(x) - lg) * h


def chi2_sf_gamma(df: int, x: float) -> float:
    if df == 0:
        return 0.0
    return _gammainc_upper_regularized(df / 2, x / 2)


def dg2_sf(lams, t2: float, sf) -> float:
    """pr(D_g^2 > t^2) from the equal-n mixture formula on printed p. 658."""
    probs = [level_probabilities(lam) for lam in lams]
    total = 0.0
    for ms in itertools.product(*[range(1, lam + 1) for lam in lams]):
        prob = 1.0
        for pj, m_ in zip(probs, ms):
            prob *= float(pj[m_])
        total += prob * sf(sum(ms) - len(lams), t2)
    return total


def dg2_critical(lams, alpha: float, sf) -> float:
    lo, hi = 0.0, 60.0
    for _ in range(200):
        mid = (lo + hi) / 2
        if dg2_sf(lams, mid, sf) > alpha:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def computed_table(sf) -> dict:
    return {lams: tuple(dg2_critical(lams, a, sf) for a in ALPHAS) for lams in TABLE1}


def differing_cells(printed: dict, computed: dict, tol: float) -> list[tuple]:
    """Every (row, column, printed, computed) cell whose absolute gap exceeds tol."""
    out = []
    for lams, cells in printed.items():
        for col, (pv, cv) in enumerate(zip(cells, computed[lams])):
            if abs(pv - cv) > tol:
                out.append((lams, ALPHAS[col], pv, round(cv, 4)))
    return out


def row_count_predicate(printed: dict, computed: dict, tol: float) -> bool:
    """The predicate used by the earlier script's "58 of 64" check: it counts rows
    that contain at least one differing cell and asserts the pair length, so it
    cannot distinguish six differing rows with six, seven or eight differing cells."""
    rows = {}
    for lams, cells in printed.items():
        flags = [abs(pv - cv) > tol for pv, cv in zip(cells, computed[lams])]
        if any(flags):
            rows[lams] = tuple(round(cv, 3) if f else None for f, cv in zip(flags, computed[lams]))
    return len(rows) == 6 and all(len(v) == 2 for v in rows.values())


def part_a() -> None:
    print("A. Marcus Table 1 cell accounting\n")
    comp1 = computed_table(chi2_sf_closed)
    comp2 = computed_table(chi2_sf_gamma)
    max_gap = max(abs(a - b) for lams in TABLE1 for a, b in zip(comp1[lams], comp2[lams]))
    check("A-1 two independent chi-square tail implementations give the same 64 critical points (max gap < 1e-6)", max_gap < 1e-6, f"max gap {max_gap:.2e}")

    total_cells = 2 * len(TABLE1)
    check("A-2 Table 1 has 32 rows and 64 cells", len(TABLE1) == 32 and total_cells == 64)
    for tol in (0.0005, 0.001, 0.002, 0.005, 0.01):
        cells = differing_cells(TABLE1, comp1, tol)
        rows = {c[0] for c in cells}
        info(f"tolerance {tol}: {len(cells)} differing cells in {len(rows)} rows; {total_cells - len(cells)} of 64 agree")
    cells = differing_cells(TABLE1, comp1, 0.001)
    rows = {c[0] for c in cells}
    expected_cells = {
        ((2, 3, 4), 0.05), ((2, 2, 2, 2), 0.05), ((2, 2, 2, 3), 0.05), ((2, 2, 2, 4), 0.05),
        ((2, 2, 3, 3), 0.05), ((2, 2, 2, 2, 2), 0.05), ((2, 2, 2, 2, 2), 0.01),
    }
    check("A-3 at tolerance 0.001 exactly 7 cells in 6 rows differ, so 57 (not 58) of 64 printed cells agree", len(cells) == 7 and len(rows) == 6 and total_cells - len(cells) == 57, f"{len(cells)} cells, {len(rows)} rows")
    check("A-4 the seven differing cells are the six 5 % cells named in PR #236 Section 4.6 plus the (2,2,2,2,2) 1 % cell", {(c[0], c[1]) for c in cells} == expected_cells, "; ".join(f"{c[0]} {int(c[1]*100)}%: printed {c[2]} computed {c[3]}" for c in cells))
    agreeing_gaps = [abs(pv - cv) for lams, cs in TABLE1.items() for pv, cv in zip(cs, comp1[lams]) if abs(pv - cv) <= 0.001]
    differing_gaps = [abs(pv - cv) for lams, cs in TABLE1.items() for pv, cv in zip(cs, comp1[lams]) if abs(pv - cv) > 0.001]
    last_digit = [(lams, a, pv, round(cv, 4)) for lams, cs in TABLE1.items() for a, pv, cv in zip(ALPHAS, cs, comp1[lams]) if 0.0005 < abs(pv - cv) <= 0.001]
    check("A-5 the 0.001 tolerance is not borderline for the seven cells: every differing cell is at least 0.0032 from the formula; the widest agreeing gap is 0.0008", min(differing_gaps) > 0.003 and max(agreeing_gaps) < 0.001, f"max agreeing gap {max(agreeing_gaps):.4f}, min differing gap {min(differing_gaps):.4f}")
    check("A-5b six further cells, all 1 % points, differ from the formula only in the last printed digit (gap 0.0005 to 0.0008); at the rounding tolerance 0.0005 the count is therefore 13 cells in 11 rows, 51 of 64", len(last_digit) == 6 and all(a == 0.01 for _, a, _, _ in last_digit) and len(differing_cells(TABLE1, comp1, 0.0005)) == 13, "; ".join(f"{l} {int(a*100)}%: {pv} vs {cv}" for l, a, pv, cv in last_digit))
    check("A-6 the earlier row-count predicate is satisfied by the printed table (as observed: it reported a pass)", row_count_predicate(TABLE1, comp1, 0.001))

    # Mutation 1: a second cell in an already differing row changes.  The row
    # predicate still passes; the cell count changes from 7 to 8.
    mutated = dict(TABLE1)
    mutated[(2, 3, 4)] = (7.394, 11.200)
    c_mut = differing_cells(mutated, comp1, 0.001)
    check("A-7 detection: altering (2,3,4) 1 % to 11.200 leaves the row predicate passing but the cell count moves 7 -> 8", row_count_predicate(mutated, comp1, 0.001) and len(c_mut) == 8 and len({c[0] for c in c_mut}) == 6, f"{len(c_mut)} cells")
    # Mutation 2: one differing cell is replaced by its computed value.  The row
    # predicate still passes; the cell count changes from 7 to 6.
    mutated2 = dict(TABLE1)
    mutated2[(2, 2, 2, 2, 2)] = (7.248, 11.183)
    c_mut2 = differing_cells(mutated2, comp1, 0.001)
    check("A-8 detection: correcting (2,2,2,2,2) 1 % to 11.183 leaves the row predicate passing but the cell count moves 7 -> 6", row_count_predicate(mutated2, comp1, 0.001) and len(c_mut2) == 6, f"{len(c_mut2)} cells")
    # Mutation 3: a cell in an agreeing row changes; both predicates detect it.
    mutated3 = dict(TABLE1)
    mutated3[(2, 2)] = (4.231, 7.400)
    c_mut3 = differing_cells(mutated3, comp1, 0.001)
    check("A-9 detection: altering (2,2) 1 % to 7.400 fails both the row predicate and the cell count (7 -> 8 in 7 rows)", (not row_count_predicate(mutated3, comp1, 0.001)) and len(c_mut3) == 8 and len({c[0] for c in c_mut3}) == 7)

    # Independent accuracy checks that do not use Stirling numbers.
    # (2,2): p(1;2) = p(2;2) = 1/2 because P(X1 >= X2) = 1/2 for exchangeable
    # continuous variables; so pr(D^2 > t) = 0.5 pr(chi2_1 > t) + 0.25 pr(chi2_2 > t).
    t = 4.231
    direct = 0.5 * chi2_sf_gamma(1, t) + 0.25 * chi2_sf_gamma(2, t)
    check("A-10 independent closed form for (2,2): 0.5 pr(chi2_1 > 4.231) + 0.25 pr(chi2_2 > 4.231) = 0.0500", abs(direct - 0.05) < 2e-4, f"{direct:.5f}")
    # Level probabilities by orthant probabilities.  The amalgamation gives one
    # level iff every partial mean is >= the overall mean, i.e. Y_j = S_j/j - S_l/l
    # >= 0 for j < l.  For iid normals corr(Y_i, Y_j) = sqrt((1/j - 1/l)/(1/i - 1/l)).
    def orthant_one_level(lam: int) -> float:
        var = [1 / j - 1 / lam for j in range(1, lam)]
        if lam == 3:
            rho = math.sqrt(var[1] / var[0])
            return 0.25 + math.asin(rho) / (2 * math.pi)
        if lam == 4:
            r12 = math.sqrt(var[1] / var[0])
            r13 = math.sqrt(var[2] / var[0])
            r23 = math.sqrt(var[2] / var[1])
            return 0.125 + (math.asin(r12) + math.asin(r13) + math.asin(r23)) / (4 * math.pi)
        raise ValueError
    for lam in (3, 4):
        lp = level_probabilities(lam)
        check(f"A-11 lambda={lam}: orthant probability of one level = {float(lp[1])} = |s({lam},1)|/{lam}! (no Stirling numbers used)", abs(orthant_one_level(lam) - float(lp[1])) < 1e-12, f"{orthant_one_level(lam):.12f}")
        check(f"A-12 lambda={lam}: probability of {lam} levels = P(X1 < ... < X{lam}) = 1/{lam}! matches the Stirling row", lp[lam] == F(1, math.factorial(lam)))
    check("A-13 Marcus Table 3 single-block 5 % points 3.820, 4.528, 5.049, 5.460 (printed p. 659) reproduce from the same formula", all(abs(dg2_critical((k_,), 0.05, chi2_sf_gamma) - v) < 0.001 for k_, v in ((3, 3.820), (4, 4.528), (5, 5.049), (6, 5.460))))
    print()


# ==========================================================================
# B. Mathematical scope versus numerical examples
# ==========================================================================


def fallback_fwer_exact(alpha_prime: list[F], truth: list[bool]) -> F:
    """Exact P(at least one true null rejected) for Wiens's fallback under
    independent valid p-values with P(p_i <= c) = c for true nulls and p_i = 0
    (always rejected) for false nulls.  Levels are accumulated as on p. 213."""
    n = len(alpha_prime)

    def rec(i: int, prev_rejected: bool, prev_level: F) -> F:
        if i == n:
            return F(0)
        level = alpha_prime[i] + prev_level if prev_rejected else alpha_prime[i]
        if not truth[i]:  # false null, always rejected, no error
            return rec(i + 1, True, level)
        # true null: rejected with probability = level (valid p-value, worst case)
        return level + (1 - level) * rec(i + 1, False, level)

    return rec(0, False, F(0))


def subsets(m: int):
    for r in range(1, m + 1):
        for c in itertools.combinations(range(m), r):
            yield frozenset(c)


def remove_vertex(alpha, G, I, j):
    """(A3)/(A4) with generic arithmetic (Fractions or rational functions)."""
    I2 = I - {j}
    a2 = {l: alpha[l] + alpha[j] * G[j][l] for l in I2}
    G2 = {l: {} for l in I2}
    for l in I2:
        for k in I2:
            if l == k:
                G2[l][k] = alpha[l] * 0
            else:
                den = 1 - G[l][j] * G[j][l]
                G2[l][k] = (G[l][k] + G[l][j] * G[j][k]) / den if not _is_zero(den) else alpha[l] * 0
    return a2, G2


def _is_zero(x) -> bool:
    return x.is_zero() if isinstance(x, RF) else x == 0


def graph_levels(alpha, G, m, J, order=None):
    """Levels for intersection J by removing the vertices outside J."""
    a = dict(alpha)
    g = {l: dict(G[l]) for l in G}
    cur = frozenset(range(m))
    for j in (order if order is not None else sorted(set(range(m)) - set(J))):
        a, g = remove_vertex(a, g, cur, j)
        cur = cur - {j}
    return a


def closed_rejections(levels_fn, m, p):
    rej = set()
    for i in range(m):
        if all(any(a[l] > 0 and p[l] <= a[l] for l in H) for H in subsets(m) if i in H for a in [levels_fn(H)]):
            rej.add(i)
    return frozenset(rej)


def shortcut_all_orders(alpha, G, m, p):
    """Set of rejection sets over every admissible selection order of the shortcut."""
    results = set()

    def walk(a, g, I, rejected):
        cand = [i for i in I if a[i] > 0 and p[i] <= a[i]]
        if not cand:
            results.add(frozenset(rejected))
            return
        for j in cand:
            a2, g2 = remove_vertex(a, g, I, j)
            walk(a2, g2, I - {j}, rejected + [j])

    walk(dict(alpha), {l: dict(G[l]) for l in G}, frozenset(range(m)), [])
    return results


def dow_parallel_weights(k, m, w):
    """Dmitrienko et al. Algorithm 1 (printed p. 2390), transcribed directly."""
    gate = set(range(k))

    def fn(H):
        v = [F(0)] * m
        gates_in = [i for i in H if i in gate]
        secs_in = [i for i in H if i not in gate]
        if len(gates_in) == k:
            for i in gates_in:
                v[i] = w[i]
        elif gates_in:
            rem = 1 - sum(w[i] for i in gates_in)
            den = sum(w[i] for i in secs_in)
            for i in gates_in:
                v[i] = w[i]
            for i in secs_in:
                v[i] = w[i] * rem / den
        else:
            den = sum(w[i] for i in secs_in)
            for i in secs_in:
                v[i] = w[i] / den
        return v

    return fn


def dow_serial_weights(k, m, w):
    """Dmitrienko et al. Algorithm 2 (printed p. 2391)."""
    gate = set(range(k))

    def fn(H):
        v = [F(0)] * m
        gates_in = [i for i in H if i in gate]
        secs_in = [i for i in H if i not in gate]
        if gates_in:
            den = sum(w[i] for i in gates_in)
            for i in gates_in:
                v[i] = w[i] / den
        else:
            den = sum(w[i] for i in secs_in)
            for i in secs_in:
                v[i] = w[i] / den
        return v

    return fn


def proportional_parallel_graph(k, m, w, alpha):
    """Investigator construction (Section 5 of the follow-up report): initial levels
    (w_i alpha for gatekeepers, 0 for secondaries); gatekeeper -> secondary edges
    w_j; secondary -> secondary edges w_j / (1 - w_i); no other edges.
    Assumes k >= 1, m - k >= 1, all w_i > 0, sum of gatekeeper weights 1, sum of
    secondary weights 1.  With a single secondary there are no secondary edges."""
    a = {i: (w[i] * alpha if i < k else F(0)) for i in range(m)}
    G = {i: {j: F(0) for j in range(m)} for i in range(m)}
    for i in range(k):
        for j in range(k, m):
            G[i][j] = w[j]
    for i in range(k, m):
        for j in range(k, m):
            if i != j:
                G[i][j] = w[j] / (1 - w[i])
    return a, G


# ---- exact rational functions in epsilon ------------------------------------


def _ptrim(c):
    while c and c[-1] == 0:
        c.pop()
    return c


def _padd(a, b):
    n = max(len(a), len(b))
    return _ptrim([(a[i] if i < len(a) else 0) + (b[i] if i < len(b) else 0) for i in range(n)])


def _pmul(a, b):
    if not a or not b:
        return []
    out = [F(0)] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        if x == 0:
            continue
        for j, y in enumerate(b):
            out[i + j] += x * y
    return _ptrim(out)


def _pdivmod(a, b):
    a = list(a)
    q = [F(0)] * max(len(a) - len(b) + 1, 1)
    while len(a) >= len(b) and a:
        coef = a[-1] / b[-1]
        deg = len(a) - len(b)
        q[deg] = coef
        for i, y in enumerate(b):
            a[deg + i] -= coef * y
        _ptrim(a)
    return _ptrim(q), a


def _pgcd(a, b):
    while b:
        _, r = _pdivmod(a, b)
        a, b = b, r
    if a:
        lead = a[-1]
        a = [x / lead for x in a]
    return a


class RF:
    """Rational function in epsilon with exact Fraction coefficients."""

    __slots__ = ("n", "d")

    def __init__(self, n, d=None):
        if isinstance(n, RF):
            self.n, self.d = n.n, n.d
            return
        if not isinstance(n, list):
            n = [F(n)]
        if d is None:
            d = [F(1)]
        n, d = _ptrim([F(x) for x in n]), _ptrim([F(x) for x in d])
        if not d:
            raise ZeroDivisionError("zero denominator")
        if not n:
            self.n, self.d = [], [F(1)]
            return
        g = _pgcd(n, d)
        if len(g) > 1:
            n, _ = _pdivmod(n, g)
            d, _ = _pdivmod(d, g)
        lead = d[-1]
        self.n = [x / lead for x in n]
        self.d = [x / lead for x in d]

    @staticmethod
    def eps():
        return RF([F(0), F(1)])

    def is_zero(self):
        return not self.n

    def __add__(self, o):
        o = o if isinstance(o, RF) else RF(o)
        return RF(_padd(_pmul(self.n, o.d), _pmul(o.n, self.d)), _pmul(self.d, o.d))

    __radd__ = __add__

    def __neg__(self):
        return RF([-x for x in self.n], self.d)

    def __sub__(self, o):
        return self + (-(o if isinstance(o, RF) else RF(o)))

    def __rsub__(self, o):
        return RF(o) - self

    def __mul__(self, o):
        o = o if isinstance(o, RF) else RF(o)
        return RF(_pmul(self.n, o.n), _pmul(self.d, o.d))

    __rmul__ = __mul__

    def __truediv__(self, o):
        o = o if isinstance(o, RF) else RF(o)
        return RF(_pmul(self.n, o.d), _pmul(self.d, o.n))

    def limit0(self) -> F:
        """Exact limit as epsilon -> 0+ (raises if the limit is infinite)."""
        if not self.n:
            return F(0)
        a = next(i for i, x in enumerate(self.n) if x != 0)
        b = next(i for i, x in enumerate(self.d) if x != 0)
        if a > b:
            return F(0)
        if a == b:
            return self.n[a] / self.d[b]
        raise ZeroDivisionError("infinite limit")

    def is_constant(self) -> bool:
        return len(self.n) <= 1 and len(self.d) <= 1


def serial_epsilon_graph(k, m, w, alpha):
    """The serial epsilon-graph construction used in PR #236 (reproduce-sr-d.py),
    here with a symbolic epsilon: gatekeeper -> gatekeeper edges
    (w_j / (1 - w_i)) (1 - eps); gatekeeper -> secondary edges w_j eps;
    secondary -> secondary edges w_j / (1 - w_i).  Requires k >= 2."""
    e = RF.eps()
    a = {i: RF(w[i] * alpha if i < k else 0) for i in range(m)}
    G = {i: {j: RF(0) for j in range(m)} for i in range(m)}
    for i in range(k):
        for j in range(k):
            if i != j:
                G[i][j] = RF(w[j] / (1 - w[i])) * (1 - e)
        for j in range(k, m):
            G[i][j] = RF(w[j]) * e
    for i in range(k, m):
        for j in range(k, m):
            if i != j:
                G[i][j] = RF(w[j] / (1 - w[i]))
    return a, G


def part_b() -> None:
    print("B. Mathematical scope versus numerical examples\n")
    alpha = F(5, 100)

    # B-1: fallback, I = 4, exact worst-case FWER for all 15 configurations with a true null
    ap = [F(2, 100), F(15, 1000), F(1, 100), F(5, 1000)]
    worst = {}
    for truth in itertools.product([True, False], repeat=4):
        if not any(truth):
            continue
        worst["".join("T" if t else "F" for t in truth)] = fallback_fwer_exact(ap, list(truth))
    check("B-1 fallback with I = 4, alpha' = (0.02, 0.015, 0.01, 0.005): exact worst-case FWER <= 0.05 in all 15 true/false configurations (independent valid p-values, false p = 0)", all(v <= alpha for v in worst.values()), "max " + f"{float(max(worst.values())):.5f}" + " at " + max(worst, key=worst.get))
    # the general-I bound of PR #236 Section 5.3 is attained with equality only when every hypothesis is true or false-then-true chains exhaust alpha
    check("B-2 the configuration FFFT (three false nulls first) attains exactly alpha = sum of alpha'_i", worst["FFFT"] == alpha)

    # B-3: shortcut equals closed test under every selection order (Remark (iii)), two graphs
    grid = [F(1, 1000), F(8, 1000), F(12, 1000), F(2, 100), F(26, 1000), F(4, 100), F(6, 100)]
    a_loop = {0: F(2, 100), 1: F(2, 100), 2: F(1, 100)}
    G_loop = {0: {0: F(0), 1: F(1, 2), 2: F(1, 2)}, 1: {0: F(1, 2), 1: F(0), 2: F(1, 2)}, 2: {0: F(0), 1: F(0), 2: F(0)}}
    ok_all = True
    multi = 0
    for p in itertools.product(grid, repeat=3):
        sets = shortcut_all_orders(a_loop, G_loop, 3, list(p))
        closed = closed_rejections(lambda H: graph_levels(a_loop, G_loop, 3, H), 3, list(p))
        if len(sets) > 1:
            multi += 1
        if sets != {closed}:
            ok_all = False
    check("B-3 Bretz Figure 5 (bottom, loop) graph: every selection order of the shortcut gives the closed-test rejection set on a 343-point grid", ok_all, f"{multi} grid points had more than one admissible order at some step")
    w4 = [F(9, 10), F(1, 10), F(1, 2), F(1, 2)]
    a_par, G_par = proportional_parallel_graph(2, 4, w4, alpha)
    ok_all = True
    for p in itertools.product([F(1, 1000), F(1, 100), F(3, 100), F(6, 100)], repeat=4):
        sets = shortcut_all_orders(a_par, G_par, 4, list(p))
        closed = closed_rejections(lambda H: graph_levels(a_par, G_par, 4, H), 4, list(p))
        if sets != {closed}:
            ok_all = False
    check("B-4 parallel gatekeeping graph (0.9, 0.1, 0.5, 0.5): every selection order of the shortcut gives the closed-test rejection set on a 256-point grid", ok_all)

    # B-5: proportional graph = Algorithm 1 for several (k, m), all intersections, exact
    cases = [
        (1, 3, [F(1), F(1, 4), F(3, 4)]),
        (2, 3, [F(3, 5), F(2, 5), F(1)]),
        (3, 4, [F(1, 2), F(3, 10), F(1, 5), F(1)]),
        (2, 6, [F(7, 10), F(3, 10), F(1, 10), F(2, 10), F(3, 10), F(4, 10)]),
        (3, 7, [F(1, 2), F(3, 10), F(1, 5), F(1, 10), F(1, 5), F(3, 10), F(2, 5)]),
        (4, 6, [F(1, 4), F(1, 4), F(1, 4), F(1, 4), F(1, 3), F(2, 3)]),
    ]
    for k, m, w in cases:
        a_v, G = proportional_parallel_graph(k, m, w, alpha)
        fn = dow_parallel_weights(k, m, w)
        ok = True
        for H in subsets(m):
            gw = graph_levels(a_v, G, m, H)
            dw = fn(H)
            if any(gw[i] != dw[i] * alpha for i in H):
                ok = False
        check(f"B-5 proportional graph = Dmitrienko Algorithm 1 weights x alpha for all {2**m - 1} intersections, k={k}, m={m}, weights {[str(x) for x in w]}", ok)
    # removal order independence for one non-trivial case, all orders, all intersections of size <= 3
    k, m, w = 3, 5, [F(1, 2), F(3, 10), F(1, 5), F(2, 5), F(3, 5)]
    a_v, G = proportional_parallel_graph(k, m, w, alpha)
    ok = True
    for H in subsets(m):
        outside = sorted(set(range(m)) - H)
        seen = {tuple(sorted(graph_levels(a_v, G, m, H, order=list(o)).items())) for o in itertools.permutations(outside)}
        if len(seen) != 1:
            ok = False
    check("B-6 proportional graph k=3, m=5: the generated levels do not depend on the removal order (all orders, all 31 intersections)", ok)

    # B-7: exact symbolic epsilon -> 0 limits for the serial epsilon-graph
    for k, m, w in [
        (2, 3, [F(9, 10), F(1, 10), F(1)]),
        (2, 4, [F(9, 10), F(1, 10), F(1, 2), F(1, 2)]),
        (2, 4, [F(1, 3), F(2, 3), F(1, 3), F(2, 3)]),
        (3, 5, [F(1, 2), F(3, 10), F(1, 5), F(2, 5), F(3, 5)]),
        (3, 6, [F(1, 2), F(3, 10), F(1, 5), F(1, 10), F(3, 5), F(3, 10)]),
    ]:
        a_v, G = serial_epsilon_graph(k, m, w, alpha)
        fn = dow_serial_weights(k, m, w)
        ok = True
        nonconst = 0
        for H in subsets(m):
            gw = graph_levels(a_v, G, m, H)
            for i in H:
                if not gw[i].is_constant():
                    nonconst += 1
                if gw[i].limit0() != fn(H)[i] * alpha:
                    ok = False
        check(f"B-7 serial epsilon-graph, exact rational functions in epsilon: lim_(eps->0) levels = Algorithm 2 weights x alpha for all {2**m - 1} intersections, k={k}, m={m}, weights {[str(x) for x in w]}", ok, f"{nonconst} level entries carried an epsilon-dependent term before the limit")
    # the last remaining gatekeeper passes its level exactly (no limit needed): row of H1 after removing H2 in k=2, m=4
    a_v, G = serial_epsilon_graph(2, 4, w4, alpha)
    a2, G2 = remove_vertex(a_v, G, frozenset(range(4)), 1)
    check("B-8 k=2, m=4: after removing the other gatekeeper, the surviving gatekeeper's edges to the secondaries are exactly w_j (constant in epsilon), as the proof in the report states", all(G2[0][j].is_constant() and G2[0][j].limit0() == w4[j] for j in (2, 3)), f"{[str(G2[0][j].limit0()) for j in (2, 3)]}")
    check("B-9 k=2, m=4: the surviving gatekeeper's level is alpha minus an O(epsilon) term (limit alpha, not constant)", (not a2[0].is_constant()) and a2[0].limit0() == alpha)
    # k = 1 boundary: the coded construction gives the gatekeeper a row summing to epsilon, so the limit levels for
    # the secondary-only intersections are 0, not Algorithm 2's w_j / W.  The construction needs k >= 2.
    a_v, G = serial_epsilon_graph(1, 3, [F(1), F(1, 4), F(3, 4)], alpha)
    lv = graph_levels(a_v, G, 3, frozenset({1, 2}))
    check("B-10 boundary: with k = 1 the epsilon construction as coded yields limit levels 0 for {H2, H3}, not Algorithm 2's (alpha/4, 3 alpha/4); k >= 2 is a needed assumption", lv[1].limit0() == 0 and lv[2].limit0() == 0)
    # rounding artefact of the earlier finite-epsilon reading for non-terminating levels
    lvl = F(1, 60)
    rounded = F(round(float(lvl) * 10**8), 10**8)
    check("B-11 the earlier eps_levels rounding (float, 1e-8) would misreport an exact level 1/60 = alpha/3 as unequal (illustrates why it is corroboration, not proof)", rounded != lvl, f"{rounded} vs {lvl}")
    print()


# ==========================================================================
# C. Dmitrienko, Offen and Westfall (2003): independent closed testing
# ==========================================================================


def alg1_weights(k, m, w, mask):
    """Algorithm 1 on a bitmask intersection (bit i set <=> H_i in H)."""
    gates = [i for i in range(k) if mask >> i & 1]
    secs = [i for i in range(k, m) if mask >> i & 1]
    v = [F(0)] * m
    if len(gates) == k:
        for i in gates:
            v[i] = w[i]
    elif gates:
        rem = 1 - sum(w[i] for i in gates)
        tot = sum(w[i] for i in secs)
        for i in gates:
            v[i] = w[i]
        for i in secs:
            v[i] = w[i] * rem / tot
    else:
        tot = sum(w[i] for i in secs)
        for i in secs:
            v[i] = w[i] / tot
    return v


def with_table2_singletons(vfn):
    """Table II convention (printed p. 2394): p_1000 = p_1, p_0100 = p_2, i.e. a
    singleton intersection is tested at full level (weight 1)."""

    def fn(mask):
        v = vfn(mask)
        if mask & (mask - 1) == 0:  # exactly one bit set
            i = mask.bit_length() - 1
            v = [F(0)] * len(v)
            v[i] = F(1)
        return v

    return fn


def local_bonferroni(mask, p, v):
    vals = [p[i] / v[i] for i in range(len(p)) if mask >> i & 1 and v[i] > 0]
    return min(min(vals), F(1)) if vals else F(1)


def local_simes(mask, p, v, normalise):
    """Printed weighted Simes (p. 2393): min_l p_(l) / sum_{i<=l} v_(i); with
    normalise=True the weights are rescaled to sum to one over H first.  A term
    whose cumulative weight is zero is skipped (undefined in the printed formula)."""
    idx = [i for i in range(len(p)) if mask >> i & 1]
    idx.sort(key=lambda i: (p[i], i))
    tot = sum(v[i] for i in idx)
    cum = F(0)
    best = F(1)
    for i in idx:
        cum += (v[i] / tot) if normalise else v[i]
        if cum > 0:
            best = min(best, p[i] / cum)
    return best


def adjusted(m, p, vfn, local):
    adj = [F(0)] * m
    for mask in range(1, 1 << m):
        v = vfn(mask)
        assert sum(v) <= 1
        pH = local(mask, p, v)
        for i in range(m):
            if mask >> i & 1:
                adj[i] = max(adj[i], pH)
    return adj


def r4(xs):
    return [round(float(x), 4) for x in xs]


def part_c() -> None:
    print("C. Dmitrienko Table III under the two singleton conventions (independent implementation)\n")
    k, m = 2, 4
    w = [F(9, 10), F(1, 10), F(1, 2), F(1, 2)]
    v_alg1 = lambda mask: alg1_weights(k, m, w, mask)
    v_tab2 = with_table2_singletons(v_alg1)
    bonf = local_bonferroni
    simes_raw = lambda mask, p, v: local_simes(mask, p, v, False)
    simes_norm = lambda mask, p, v: local_simes(mask, p, v, True)
    printed = {
        1: ([F(24, 1000), F(3, 1000), F(26, 1000), F(2, 1000)], [0.0267, 0.0300, 0.0289, 0.0267], [0.0260, 0.0260, 0.0260, 0.0253]),
        2: ([F(84, 1000), F(3, 1000), F(26, 1000), F(2, 1000)], [0.0933, 0.0300, 0.0933, 0.0400], [0.0840, 0.0300, 0.0840, 0.0400]),
        3: ([F(48, 1000), F(3, 1000), F(26, 1000), F(2, 1000)], [0.0533, 0.0300, 0.0533, 0.0400], [0.0480, 0.0300, 0.0480, 0.0400]),
    }
    for s, (p, exp_b, exp_s) in printed.items():
        b_alg1 = adjusted(m, p, v_alg1, bonf)
        b_tab2 = adjusted(m, p, v_tab2, bonf)
        s_raw = adjusted(m, p, v_alg1, simes_raw)
        s_norm = adjusted(m, p, v_alg1, simes_norm)
        s_tab2raw = adjusted(m, p, v_tab2, simes_raw)
        check(f"C-1 scenario {s}: printed Bonferroni column = closure with Algorithm 1 weights (singleton gatekeeper at weight w_i)", r4(b_alg1) == exp_b, f"{r4(b_alg1)}")
        check(f"C-2 scenario {s}: printed Simes column = closure with weights rescaled to sum 1 within H = printed formula with Table II singletons", r4(s_norm) == exp_s and r4(s_tab2raw) == exp_s, f"{r4(s_norm)}")
        if s == 1:
            check("C-3 scenario 1: Bonferroni with Table II singletons gives mortality 0.0289, not the printed 0.0300 (decision-bearing for alpha in [0.0289, 0.0300))", r4(b_tab2) == [0.0267, 0.0289, 0.0289, 0.0267], f"{r4(b_tab2)}")
            check("C-4 scenario 1: printed Simes formula with unrescaled Algorithm 1 weights gives vent-free days 0.0267, not the printed 0.0260 (decision-bearing for alpha in [0.0260, 0.0267))", r4(s_raw)[0] == 0.0267 and r4(s_raw) != exp_s, f"{r4(s_raw)}")
            # where the printed 0.0260 comes from: H_1010 = min(p1/0.9, p3/1.0) = p3
            v1010 = v_alg1(0b0101)
            check("C-5 scenario 1: the printed Simes value 0.0260 for vent-free days equals p_3 = 0.026, attained at H_1010 = min(p_1/0.9, p_3/(0.9+0.1))", local_simes(0b0101, p, v1010, False) == p[2] and s_norm[0] == p[2])
        else:
            check(f"C-6 scenario {s}: the singleton convention does not change the Bonferroni column here", r4(b_tab2) == exp_b)

    # decision-bearing at alpha = 0.05
    alpha = F(5, 100)
    p = [F(4, 100), F(6, 1000), F(2, 100), F(2, 100)]
    b1, b2 = adjusted(m, p, v_alg1, bonf), adjusted(m, p, v_tab2, bonf)
    check("C-7 alpha = 0.05, p = (0.04, 0.006, 0.02, 0.02): Bonferroni adjusted p_2 is 0.0600 (Algorithm 1 singleton, H_2 not rejected) versus 0.0444 (Table II singleton, H_2 rejected)", r4(b1)[1] == 0.06 and r4(b2)[1] == 0.0444 and b1[1] > alpha >= b2[1], f"{r4(b1)} vs {r4(b2)}")
    p = [F(46, 1000), F(3, 100), F(1, 100), F(1, 100)]
    s1, s2 = adjusted(m, p, v_alg1, simes_raw), adjusted(m, p, v_alg1, simes_norm)
    check("C-8 alpha = 0.05, p = (0.046, 0.03, 0.01, 0.01): weighted-Simes adjusted p_1 is 0.0511 (unrescaled, H_1 not rejected) versus 0.0460 (rescaled, H_1 rejected)", r4(s1)[0] == 0.0511 and r4(s2)[0] == 0.046 and s1[0] > alpha >= s2[0], f"{r4(s1)} vs {r4(s2)}")

    # Condition 1 (p. 2390): gatekeeper adjusted p-values must not depend on the secondary p-values
    grid = [F(1, 1000), F(5, 1000), F(2, 100), F(26, 1000), F(3, 100), F(45, 1000), F(6, 100), F(2, 10)]
    ok_raw = ok_tab2 = ok_norm = True
    for p in itertools.product(grid, repeat=4):
        p = list(p)
        target = [min(p[0] / w[0], F(1)), min(p[1] / w[1], F(1))]
        b = adjusted(m, p, v_alg1, bonf)
        if b[:2] != target:
            ok_raw = False
        sr = adjusted(m, p, v_alg1, simes_raw)
        if sr[:2] != target:
            ok_raw = False
    check("C-9 Condition 1 holds exactly for Bonferroni and for unrescaled weighted Simes with Algorithm 1 singletons: adjusted p_i = min(p_i / w_i, 1) on a 4096-point grid", ok_raw)
    base = [F(24, 1000), F(3, 1000), F(26, 1000), F(2, 1000)]
    moved = list(base)
    moved[2] = F(266, 10000)
    sn_base, sn_moved = adjusted(m, base, v_alg1, simes_norm), adjusted(m, moved, v_alg1, simes_norm)
    check("C-10 the printed (rescaled) Simes convention violates Condition 1: moving p_3 from 0.026 to 0.0266 moves the vent-free-days adjusted p from 0.0260 to 0.0266 (decision changes at alpha = 0.0265)", sn_base[0] == F(26, 1000) and sn_moved[0] == F(266, 10000) and sn_base[0] <= F(265, 10000) < sn_moved[0])
    bt_base = adjusted(m, base, v_tab2, bonf)
    moved2 = list(base)
    moved2[2] = F(27, 1000)
    bt_moved = adjusted(m, moved2, v_tab2, bonf)
    check("C-11 the Table II Bonferroni convention also violates Condition 1: mortality adjusted p moves from 0.0289 to 0.0300 when p_3 moves from 0.026 to 0.027", r4(bt_base)[1] == 0.0289 and r4(bt_moved)[1] == 0.03)
    # dominance: unrescaled weighted Simes local p-value >= rescaled one for every H (so validity of the
    # rescaled test at level alpha implies validity of the unrescaled test); both >= p_H under weights summing to 1
    ok = True
    for p in itertools.product(grid, repeat=4):
        for mask in range(1, 1 << m):
            v = v_alg1(mask)
            if local_simes(mask, list(p), v, False) < local_simes(mask, list(p), v, True):
                ok = False
    check("C-12 for every intersection and grid point the unrescaled weighted-Simes p-value is >= the rescaled one (the unrescaled test is the more conservative of the two)", ok)
    # Condition 2 (>= form): Bonferroni under both conventions; weighted Simes under either convention
    fails = {}
    for vname, vfn in (("Algorithm 1 singletons", v_alg1), ("Table II singletons", v_tab2)):
        for lname, local in (("Bonferroni", bonf), ("Simes unrescaled", simes_raw), ("Simes rescaled", simes_norm)):
            n = 0
            for p in itertools.product(grid[::2], repeat=4):
                a = adjusted(m, list(p), vfn, local)
                if min(a[2], a[3]) < min(a[0], a[1]):
                    n += 1
            fails[(vname, lname)] = n
    check("C-13 Condition 2 (>= form) holds for weighted Bonferroni under both singleton conventions on a 256-point grid", fails[("Algorithm 1 singletons", "Bonferroni")] == 0 and fails[("Table II singletons", "Bonferroni")] == 0)
    check("C-14 Condition 2 fails for the weighted-Simes version under every convention on the same grid (counts of violating points)", all(fails[(v, l)] > 0 for v in ("Algorithm 1 singletons", "Table II singletons") for l in ("Simes unrescaled", "Simes rescaled")), "; ".join(f"{v} / {l}: {n}" for (v, l), n in fails.items()))
    # concrete counterexamples, computed independently by hand in the report
    p = [F(48, 1000), F(3, 100), F(1, 1000), F(1, 1000)]
    a = adjusted(m, p, v_alg1, simes_raw)
    check("C-15 counterexample (unrescaled Simes, Algorithm 1 singletons), alpha = 0.05, p = (0.048, 0.03, 0.001, 0.001): adjusted p = (0.0533, 0.3000, 0.0480, 0.0480), so both secondaries are rejected while no gatekeeper is", r4(a) == [0.0533, 0.3, 0.048, 0.048] and min(a[0], a[1]) > alpha >= max(a[2], a[3]), f"{r4(a)}")
    p = [F(2, 100), F(21, 1000), F(1, 1000), F(3, 100)]
    a = adjusted(m, p, v_alg1, simes_norm)
    check("C-16 counterexample (rescaled Simes, the printed Table III convention), alpha = 0.0215, p = (0.02, 0.021, 0.001, 0.03): adjusted p = (0.0222, 0.0300, 0.0210, 0.0300), so H_3 is rejected while no gatekeeper is", r4(a) == [0.0222, 0.03, 0.021, 0.03] and min(a[0], a[1]) > F(215, 10000) >= a[2], f"{r4(a)}")
    print()


def main() -> int:
    print("SR-D targeted follow-up checks (exact arithmetic unless stated)\n")
    part_a()
    part_b()
    part_c()
    if FAILURES:
        print(f"{len(FAILURES)} check(s) failed:")
        for f_ in FAILURES:
            print("  -", f_)
        return 1
    print("all checks passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
