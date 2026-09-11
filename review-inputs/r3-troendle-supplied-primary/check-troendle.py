#!/usr/bin/env python3
"""Disposable exact diagnostics for Troendle (1995), not a production verifier.

No source code or output from the earlier Ge diagnostic is imported.
All probability spaces below are explicitly finite and uniformly weighted.
"""
from collections import Counter
from fractions import Fraction as F
from itertools import combinations, product


def stages(observed, draws, order=None, inclusive=True):
    """Equation (5); descending traversal of the paper's ascending order."""
    order = tuple(order) if order is not None else tuple(
        sorted(range(len(observed)), key=lambda i: (-observed[i], i)))
    raw = []
    for w, i in enumerate(order):
        remaining = order[w:]
        count = sum((max(d[j] for j in remaining) >= observed[i])
                    if inclusive else (max(d[j] for j in remaining) > observed[i])
                    for d in draws)
        raw.append(F(count, len(draws)))
    adjusted = tuple(max(raw[:w+1]) for w in range(len(raw)))
    return order, tuple(raw), adjusted


def reject(observed, draws, alpha, order=None):
    """Literal stop rule, independently using sets of exceeding draw IDs."""
    pending = list(order) if order is not None else sorted(
        range(len(observed)), key=lambda i: (-observed[i], i))
    rejected = []
    while pending:
        i = pending[0]
        events = set()
        for j in pending:
            events |= {b for b, d in enumerate(draws) if d[j] >= observed[i]}
        if F(len(events), len(draws)) >= alpha:
            break
        rejected.append(pending.pop(0))
    return tuple(rejected)


def statistic(data, assignment):
    n = len(assignment)//2
    k = len(data[0])
    return tuple(F(sum(data[a][i] for a in assignment[n:]) -
                   sum(data[a][i] for a in assignment[:n]), n) for i in range(k))


def finite_examples():
    data = ((0, 0), (0, 1), (2, 1), (3, 2))
    obs = statistic(data, (0, 1, 2, 3))
    without = tuple(statistic(data, a + tuple(j for j in range(4) if j not in a))
                    for a in combinations(range(4), 2))
    with_replacement = tuple(statistic(data, a) for a in product(range(4), repeat=4))
    # Hand counts: six unordered allocations and 256 ordered pooled draws.
    assert obs == (F(5, 2), F(1))
    assert stages(obs, without)[1] == (F(1, 6), F(1, 3))
    assert stages(obs, with_replacement)[1] == (F(3, 64), F(37, 256))
    assert reject(obs, without, F(1, 6)) == ()
    assert reject(obs, without, F(1, 5)) == (0,)
    # minP direction by an explicitly selected transformation, not empirical ranks.
    scaled_obs = tuple(F(1, 2) + v/10 for v in obs)
    scaled_draws = tuple(tuple(F(1, 2)+v/10 for v in d) for d in with_replacement)
    p_obs = tuple(1-v for v in scaled_obs)
    p_draws = tuple(tuple(1-v for v in d) for d in scaled_draws)
    for w, i in enumerate(stages(scaled_obs, scaled_draws)[0]):
        suffix = stages(scaled_obs, scaled_draws)[0][w:]
        count = sum(min(d[j] for j in suffix) <= p_obs[i] for d in p_draws)
        assert F(count, len(p_draws)) == stages(scaled_obs, scaled_draws)[1][w]
    print('4 subjects, 2+2: observed', tuple(map(str, obs)))
    print('without replacement B=6:', tuple(map(str, stages(obs, without)[1])))
    print('with replacement B=256:', tuple(map(str, stages(obs, with_replacement)[1])))


def exhaustive_tables():
    n_tables = comparisons = first_true_checks = 0
    for flat in product(range(3), repeat=6):
        draws = (flat[:2], flat[2:4], flat[4:])
        n_tables += 1
        for obs in draws:
            order, raw, adj = stages(obs, draws)
            levels = {F(0), F(1), *raw, *(q/2 for q in raw)}
            for alpha in levels:
                r = reject(obs, draws, alpha)
                assert r == tuple(i for i, q in zip(order, adj) if q < alpha)
                comparisons += 1
                for true in ((0,), (1,), (0, 1)):
                    first = next(w for w, i in enumerate(order) if i in true)
                    threshold = max(obs[i] for i in true)
                    qtrue = F(sum(max(d[i] for i in true) >= threshold for d in draws), 3)
                    assert qtrue <= raw[first]
                    if set(r).intersection(true):
                        assert qtrue < alpha
                    first_true_checks += 1
            if obs[0] == obs[1]:
                reverse = stages(obs, draws, (1, 0))
                assert dict(zip(order, adj)) == dict(zip(reverse[0], reverse[2]))
        # Calibration only for THIS uniform common-reference finite table.
        for alpha in (F(0), F(1, 6), F(1, 3), F(1, 2), F(2, 3), F(1)):
            assert F(sum(bool(reject(obs, draws, alpha)) for obs in draws), 3) <= alpha
    # Inclusive ties and aligned resampling are material.
    obs = (2, 2)
    aligned = ((2, 2), (0, 0), (1, 1), (0, 0))
    broken = ((2, 0), (0, 2), (1, 0), (0, 1))
    assert stages(obs, aligned)[1][0] == F(1, 4)
    assert stages(obs, broken)[1][0] == F(1, 2)
    assert stages(obs, aligned, inclusive=False)[1][0] == 0
    # A decrease requires cumulative maxima: raw stage tails are not adjusted p.
    obs = (2, 1)
    draws = ((0, 0), (2, 0), (3, 0), (0, 1))
    assert stages(obs, draws)[1:] == ((F(1, 2), F(1, 4)), (F(1, 2), F(1, 2)))
    assert reject(obs, draws, F(2, 5)) == ()
    print(f'{n_tables} tables: {comparisons} stop/adjustment checks; {first_true_checks} first-true checks PASS')
    print('ties, strict-alpha boundary, common-draw alignment, monotonicity mutations PASS')


def printed_example():
    # p.372, signed treatment-minus-control differences of means (known scale).
    data = ((0, 1), (1, 0), (-1, 0), (-1, -1), (1, 0),
            (50, 4), (49, 5), (52, 5), (48, 6), (51, 5))
    obs = statistic(data, tuple(range(10)))
    draws = tuple(statistic(data, a + tuple(j for j in range(10) if j not in a))
                  for a in combinations(range(10), 5))
    assert obs == (F(50), F(5))
    assert sum(d[0] >= 8 for d in draws) == 126
    assert stages(obs, draws)[1] == (F(1, 252), F(1, 252))
    single = F(sum(max(d) >= 5 for d in draws), 252)
    assert single >= F(1, 2)
    # Independent scalar convolution, 10**10 equiprobable with-replacement draws.
    sums = Counter({0: 1})
    for _ in range(5):
        nxt = Counter()
        for s, c in sums.items():
            for x, _ in data:
                nxt[s+x] += c
        sums = nxt
    count = sum(ca*cb for a, ca in sums.items() for b, cb in sums.items() if b-a >= 25)
    lower = F(count, 10**10)
    assert lower == F(193, 512) >= F(1, 4)
    print('p.372: 252 allocations; P(T1*>=8)=1/2; single-step H2=', single,
          '; step-down=', tuple(map(str, stages(obs, draws)[1])))
    print('p.372 with-replacement lower bound via T1*>=5:', lower)


def monte_carlo_failure():
    # k=1, N=N0=1; independent Bernoulli(1/2) observations; one resample.
    errors = 0
    total = 0
    for x, y in product((0, 1), repeat=2):
        for a, b in product(range(2), repeat=2):
            original = (x, y)
            estimate = F(original[b]-original[a] >= y-x)
            errors += estimate < F(1, 20)
            total += 1
    assert F(errors, total) == F(3, 16) > F(1, 20)
    print('finite M=1 Bernoulli null: FWER=3/16 > alpha=1/20; no finite-M guarantee PASS')


if __name__ == '__main__':
    finite_examples()
    exhaustive_tables()
    printed_example()
    monte_carlo_failure()
    print('ALL BOUNDED TROENDLE DIAGNOSTICS PASSED')
