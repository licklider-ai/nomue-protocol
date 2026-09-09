"""Author diagnostics for supplied Ge et al. (2003), not a production kernel.

Exact integer tail counts; no external packages, random sampling or tolerance.
Run from repository root: python3 review-inputs/r3-supplied-source-scope/check-ge.py
"""

from fractions import Fraction as F
from itertools import combinations, product


def ranks_direct(row):
    return [sum(v >= x for v in row) for x in row]


def ranks_sorted(row):
    order = sorted(range(len(row)), key=lambda b: -row[b])
    out = [0] * len(row)
    start = 0
    while start < len(row):
        end = start + 1
        while end < len(row) and row[order[end]] == row[order[start]]:
            end += 1
        for pos in range(start, end):
            out[order[pos]] = end
        start = end
    return out


def stepdown(table, observed, minimum):
    m, b_count = len(table), len(table[0])
    order = sorted(range(m), key=lambda i: table[i][observed], reverse=not minimum)
    combine = min if minimum else max
    q = list(table[order[-1]])
    raw = [0] * m
    for pos in reversed(range(m)):
        i = order[pos]
        q = [combine(q[b], table[i][b]) for b in range(b_count)]
        raw[pos] = sum(x <= table[i][observed] if minimum else x >= table[i][observed] for x in q)
    out = [0] * m
    for pos, i in enumerate(order):
        out[i] = max(raw[:pos + 1])
    return out


def closure(table, observed, minimum):
    # Enumerate all intersections, independently of the ordered suffix recurrence.
    m, b_count = len(table), len(table[0])
    out = [0] * m
    combine = min if minimum else max
    for size in range(1, m + 1):
        for subset in combinations(range(m), size):
            threshold = combine(table[i][observed] for i in subset)
            count = 0
            for b in range(b_count):
                value = combine(table[i][b] for i in subset)
                count += value <= threshold if minimum else value >= threshold
            for i in subset:
                out[i] = max(out[i], count)
    return out


def audit_table(table):
    p = [ranks_direct(row) for row in table]
    assert p == [ranks_sorted(row) for row in table]
    b_count = len(table[0])
    for values, minimum in [(table, False), (p, True)]:
        outputs = []
        for observed in range(b_count):
            a = stepdown(values, observed, minimum)
            assert a == closure(values, observed, minimum)
            order = sorted(range(len(table)), key=lambda i: values[i][observed], reverse=not minimum)
            assert all(a[i] <= a[j] for i, j in zip(order, order[1:]))
            assert all(1 <= x <= b_count for x in a)
            outputs.append(a)
        # Complete-null calibration on the specified uniform finite table only.
        for numerator in range(b_count + 1):
            assert sum(min(a) <= numerator for a in outputs) <= numerator
    return b_count * 2


def main():
    comparisons = 0
    for flat in product(range(3), repeat=6):
        comparisons += audit_table([list(flat[:3]), list(flat[3:])])
    print('729 exhaustive 2 x 3 tables: ranks, ties, closure and complete-null calibration PASS')

    data = [[0, 1, 2, 4, 6, 9], [0, 0, 1, 1, 3, 8], [0, 3, 3, 4, 4, 5]]
    labels = list(combinations(range(6), 3))
    table = [[abs(2 * sum(row[j] for j in subset) - sum(row)) for subset in labels] for row in data]
    comparisons += audit_table(table)
    print('6-sample 3+3 complete orbit: B=20; all observed assignments PASS')
    print('orbit observed column 0 maxT:', [str(F(x, 20)) for x in stepdown(table, 0, False)])
    p = [ranks_direct(row) for row in table]
    print('orbit observed column 0 minP:', [str(F(x, 20)) for x in stepdown(p, 0, True)])

    # Author counterexample: row-local valid marginal p-values do not imply
    # subset pivotality. Complete reference: (U,U,1); partial truth: (U,21/20-U,0).
    null = [[F(j, 20) for j in range(1, 21)]] * 2 + [[F(1)] * 20]
    alpha = F(1, 20)
    errors = 0
    for j in range(1, 21):
        obs = [F(j, 20), F(21 - j, 20), F(0)]
        order = sorted(range(3), key=lambda i: obs[i])
        stage = []
        adjusted = [F(0)] * 3
        for pos, i in enumerate(order):
            stage.append(F(sum(min(null[k][b] for k in order[pos:]) <= obs[i] for b in range(20)), 20))
            adjusted[i] = max(stage)
        errors += min(adjusted[:2]) <= alpha
    assert errors == 2
    print('row-local/subset-pivotality counterexample: alpha=1/20; FWER=2/20=1/10 PASS')

    tied = [3, 3, 1, 0]
    assert ranks_sorted(tied) == [2, 2, 3, 4]
    assert [1, 2, 3, 4] != ranks_direct(tied)  # Naive ordinal ranks fail.
    aligned = [[4, 3, 2, 1], [4, 3, 2, 1]]
    broken = [aligned[0], list(reversed(aligned[1]))]
    assert stepdown([ranks_direct(r) for r in aligned], 0, True)[0] == 1
    assert stepdown([ranks_direct(r) for r in broken], 0, True)[0] == 2
    print('tie-rank and row-permutation mutations detected PASS')
    print(f'closure/shortcut comparisons: {comparisons}')
    print('ALL BOUNDED GE DIAGNOSTICS PASSED')


if __name__ == '__main__':
    main()
