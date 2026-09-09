#!/usr/bin/env python3
"""Independent finite audit of the fixed Troendle report; no author imports.

Integer sum contrasts avoid floating point. Occupancy weights and a binomial
identity provide second counting routes. This is not a general bootstrap proof.
"""
from collections import Counter
from fractions import Fraction as Q
from itertools import combinations_with_replacement, permutations, product
from math import comb


def tails(observed, rows, ordering):
    # Complement of the simultaneous strict-lower event, not max-statistic code.
    counts = []
    for rank, index in enumerate(ordering):
        below = sum(all(row[j] < observed[index] for j in ordering[rank:])
                    for row in rows)
        counts.append(Q(len(rows) - below, len(rows)))
    return counts


def decisions(observed, rows, ordering, alpha):
    remaining = set(ordering)
    answer = set()
    for index in ordering:
        hits = sum(any(row[j] >= observed[index] for j in remaining)
                   for row in rows)
        if hits * alpha.denominator >= alpha.numerator * len(rows):
            return answer
        answer.add(index)
        remaining.remove(index)
    return answer


def contrast(data, control, treatment):
    return tuple(sum(data[i][j] for i in treatment) -
                 sum(data[i][j] for i in control) for j in range(len(data[0])))


def allocations(data):
    n = len(data)
    result = []
    for mask in range(1 << n):
        if mask.bit_count() == n // 2:
            control = tuple(i for i in range(n) if mask & (1 << i))
            treatment = tuple(i for i in range(n) if not mask & (1 << i))
            result.append(contrast(data, control, treatment))
    return result


def small_sample():
    data = ((0, 0), (0, 1), (2, 1), (3, 2))
    observed = contrast(data, (0, 1), (2, 3))
    six = allocations(data)
    assert len(six) == 6 and observed == (5, 2)
    assert tails(observed, six, (0, 1)) == [Q(1, 6), Q(1, 3)]
    all_draws = [contrast(data, (a, b), (c, d))
                 for a, b, c, d in product(range(4), repeat=4)]
    assert len(all_draws) == 256
    assert tails(observed, all_draws, (0, 1)) == [Q(12, 256), Q(37, 256)]
    # 10 unordered subject pairs per group, weighted 1 (repeat) or 2 (distinct).
    pair_sums = Counter()
    for a, b in combinations_with_replacement(range(4), 2):
        pair_sums[tuple(data[a][j] + data[b][j] for j in (0, 1))] += 1 if a == b else 2
    weighted = Counter()
    for control, cw in pair_sums.items():
        for treatment, tw in pair_sums.items():
            weighted[tuple(treatment[j] - control[j] for j in (0, 1))] += cw * tw
    assert weighted == Counter(all_draws)
    marginals = [Counter() for _ in range(2)]
    for sums, weight in pair_sums.items():
        for j in (0, 1):
            marginals[j][sums[j]] += weight
    assert dict(marginals[0]) == {0: 4, 2: 4, 3: 4, 4: 1, 5: 2, 6: 1}
    assert dict(marginals[1]) == {0: 1, 1: 4, 2: 6, 3: 4, 4: 1}
    assert 4 * (2 + 1) == 12
    assert 1 * 11 + 4 * 5 + 6 == 37
    assert decisions(observed, six, (0, 1), Q(1, 6)) == set()
    assert decisions(observed, six, (0, 1), Q(1, 5)) == {0}
    # Affine transformation is deliberately a counting identity, not calibration.
    for rank, i in enumerate((0, 1)):
        p_obs = Q(1, 2) - Q(observed[i], 20)
        count = sum(min(Q(1, 2) - Q(row[j], 20) for j in (0, 1)[rank:]) <= p_obs
                    for row in all_draws)
        assert Q(count, 256) == tails(observed, all_draws, (0, 1))[rank]
    print('6 allocations:', sorted(tuple(str(Q(x, 2)) for x in row) for row in six))
    print('256 ordered draws and weighted occupancy: counts 12, 37; tails 3/64, 37/256 PASS')


def source_example():
    # Transcribed from PDF 4 / printed p.372; signed sums are five times means.
    data = ((0, 1), (1, 0), (-1, 0), (-1, -1), (1, 0),
            (50, 4), (49, 5), (52, 5), (48, 6), (51, 5))
    observed = contrast(data, range(5), range(5, 10))
    rows = allocations(data)
    assert observed == (250, 25) and len(rows) == 252
    assert sum(row[0] >= 40 for row in rows) == 126
    assert sum(any(x >= 25 for x in row) for row in rows) == 126
    assert tails(observed, rows, (0, 1)) == [Q(1, 252)] * 2
    assert decisions(observed, rows, (0, 1), Q(1, 20)) == {0, 1}
    # Independent lower bound: write coordinate 1 as 50*high + residual.
    # Five high and five low subjects. Residuals lie in [-2,2], so the sum
    # difference of ten residuals lies in [-20,20]. Hence difference >=25
    # iff the treatment high-count exceeds the control high-count.
    assert sum(x >= 25 for x, _ in data) == 5
    assert all(-2 <= x - 50 * (x >= 25) <= 2 for x, _ in data)
    equal = sum(comb(5, j) ** 2 for j in range(6))
    assert equal == comb(10, 5) == 252
    lower = (1 - Q(equal, 2**10)) / 2
    assert lower == Q(193, 512) > Q(1, 4)
    print('252 allocations: 126/252 at T1>=8; SS H2=1/2; SR=(1/252,1/252) PASS')
    print('High-count binomial identity: P(T1>=5)=(1-252/1024)/2=193/512 PASS')


def finite_m():
    rejected = []
    for x, y, a, b in product(range(2), repeat=4):
        sample = (x, y)
        if decisions((y-x,), ((sample[b]-sample[a],),), (0,), Q(1, 20)):
            rejected.append((x, y, a, b))
    assert rejected == [(0, 1, 0, 0), (0, 1, 1, 0), (0, 1, 1, 1)]
    assert Q(len(rejected), 16) == Q(3, 16)
    # A separate alpha-atom diagnostic: LLN does not kill the strict indicator.
    # For odd M and conditional q=alpha=1/2, its probability is exactly 1/2.
    for m in (1, 3, 5, 11, 101):
        assert Q(sum(comb(m, j) for j in range((m+1)//2)), 2**m) == Q(1, 2)
    # Discrete true tail example: masses 3/4,1/8,1/8 at 0,1,2; alpha=1/4.
    mass = {0: Q(3, 4), 1: Q(1, 8), 2: Q(1, 8)}
    survival = {x: sum(w for y, w in mass.items() if y >= x) for x in mass}
    strict = sum(mass[x] for x in mass if survival[x] < Q(1, 4))
    atom = sum(mass[x] for x in mass if survival[x] == Q(1, 4))
    assert strict == atom == Q(1, 8) and strict + atom == Q(1, 4)
    print('M=1 Bernoulli witness: three listed errors / 16 = 3/16 PASS')
    print('Alpha equality: odd-M binomial strict event=1/2; tail mass 1/8+1/8=1/4 PASS')


def adversarial():
    aligned = ((3, 3), (0, 0), (0, 0), (0, 0))
    broken = ((3, 0), (0, 3), (0, 0), (0, 0))
    assert [sorted(r[j] for r in aligned) for j in (0, 1)] == [sorted(r[j] for r in broken) for j in (0, 1)]
    assert tails((3, 3), aligned, (0, 1))[0] == Q(1, 4)
    assert tails((3, 3), broken, (0, 1))[0] == Q(1, 2)
    assert decisions((3, 3), aligned, (0, 1), Q(1, 4)) == set()
    assert decisions((3, 3), aligned, (1, 0), Q(1, 3)) == {0, 1}
    rows = ((3, 0), (3, 0), (0, 0), (0, 1))
    assert tails((3, 1), rows, (0, 1)) == [Q(1, 2), Q(1, 4)]
    assert decisions((3, 1), rows, (0, 1), Q(1, 3)) == set()
    trials = first_true = tied = 0
    for flat in product(range(2), repeat=6):
        rows = (flat[:3], flat[3:])
        for observed in product(range(3), repeat=3):
            orders = [o for o in permutations(range(3))
                      if all(observed[o[j]] >= observed[o[j+1]] for j in range(2))]
            baseline = None
            for order in orders:
                raw = tails(observed, rows, order)
                adjusted = {index: max(raw[:rank+1]) for rank, index in enumerate(order)}
                if baseline is None:
                    baseline = adjusted
                else:
                    assert baseline == adjusted
                    tied += 1
                for alpha in (Q(0), Q(1, 4), Q(1, 2), Q(3, 4), Q(1)):
                    rejected = decisions(observed, rows, order, alpha)
                    assert rejected == {i for i in order if adjusted[i] < alpha}
                    trials += 1
                    for mask in range(1, 8):
                        true = {j for j in range(3) if mask & (1 << j)}
                        rank = next(r for r, j in enumerate(order) if j in true)
                        threshold = max(observed[j] for j in true)
                        qtrue = Q(sum(any(row[j] >= threshold for j in true) for row in rows), 2)
                        assert qtrue <= raw[rank]
                        if rejected & true:
                            assert qtrue < alpha
                        first_true += 1
    print(f'3-coordinate exhaustive audit: {trials} decisions, {first_true} first-true inclusions, {tied} tie-order comparisons PASS')
    print('Broken alignment, inclusive ties, strict alpha, stop and cumulative maxima PASS')


if __name__ == '__main__':
    small_sample()
    source_example()
    finite_m()
    adversarial()
    print('ALL INDEPENDENT BOUNDED CHECKS PASSED')
