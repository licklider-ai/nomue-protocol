"""Reviewer derivation checks for the R3 Holm promotion proposal (S3); standard library only.
Expected values come from closed-testing enumeration and correctly rounded float conversion,
never from the candidate implementation. Explicit raises; valid under python -O."""
from fractions import Fraction as Q
from itertools import combinations
import random
import struct

U = 1 << 1074


def require(condition, message):
    if not condition:
        raise ValueError(message)


def holm(ps):
    """S3 target on the lattice: rank products, cumulative maximum, cap, inverse mapping."""
    lattice = [int(p * U) for p in ps]
    require(all(Q(a, U) == p for a, p in zip(lattice, ps)), 'dyadic inputs')
    m = len(lattice)
    order = sorted(range(m), key=lambda i: (lattice[i], i))
    adjusted, running = [0] * m, 0
    for rank, i in enumerate(order, 1):
        running = max(running, (m - rank + 1) * lattice[i])
        adjusted[i] = min(U, running)
    return [Q(a, U) for a in adjusted]


def closed_testing(ps):
    m = len(ps)
    out = []
    for i in range(m):
        best = Q(0)
        for k in range(1, m + 1):
            for subset in combinations(range(m), k):
                if i in subset:
                    best = max(best, min(Q(1), k * min(ps[j] for j in subset)))
        out.append(best)
    return out


def step_down(ps, alpha):
    """Scheme 1 with inclusive comparison, as confirmed by PR #289."""
    m = len(ps)
    order = sorted(range(m), key=lambda i: (ps[i], i))
    rejected = set()
    for rank, i in enumerate(order, 1):
        if ps[i] <= alpha / (m - rank + 1):
            rejected.add(i)
        else:
            break
    return rejected


def display(q):
    return struct.pack('>d', float(q)).hex()


def main():
    rng = random.Random(20260911)
    for _ in range(400):
        m = rng.randint(1, 7)
        ps = [Q(rng.randint(0, 64), 64) for _ in range(m)]
        if rng.random() < 0.3:
            ps = [rng.choice(ps) for _ in ps]
        adjusted = holm(ps)
        require(adjusted == closed_testing(ps), 'closed-testing equivalence')
        alpha = Q(rng.randint(1, 63), 64)
        require({i for i in range(m) if adjusted[i] <= alpha} == step_down(ps, alpha), 'step-down equivalence for 0<alpha<1')
    require(all(a <= 1 for a in holm([Q(3, 4), Q(1)])) and step_down([Q(3, 4), Q(1)], Q(1)) == set(), 'alpha=1 non-equivalence')
    x = Q(1, 4) + Q(3, 1 << 54)
    a = holm([x, Q(3, 4), Q(1)])[0]
    b = Q(3, 4) + Q(8, 1 << 54)
    require(a == Q(3, 4) + Q(9, 1 << 54) and a != b and display(a) == display(b) == '3fe8000000000004', 'exact versus display collision')
    require(Q(0.05) != Q(1, 20), 'binary64 0.05 is not 1/20')
    require(holm([Q(1, 64), Q(1, 32), Q(1, 8)]) == [Q(3, 64), Q(1, 16), Q(1, 8)], 'proposal three-member vector')
    require(len(format(U, 'x')) == 269, 'adjusted hex width')
    print('derivation checks passed: closed testing, step-down domain, alpha=1, collision, level identity, vector, width')


if __name__ == '__main__':
    main()
