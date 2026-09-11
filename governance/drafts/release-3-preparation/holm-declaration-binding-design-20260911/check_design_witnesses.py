"""Reviewer-side design witnesses: exact Holm vectors and document-budget sizing. No bridge is run."""
from fractions import Fraction as Q
from struct import pack
import json

U = 1 << 1074


def require(condition, message):
    if not condition:
        raise ValueError(message)


def holm(values):
    """Ordinary Holm on the 2^-1074 lattice, independent of the pinned candidate code."""
    lattice = [int(p * U) for p in values]
    require(all(Q(a, U) == p for a, p in zip(lattice, values)), 'dyadic inputs')
    m = len(lattice)
    order = sorted(range(m), key=lambda i: (lattice[i], i))
    adjusted, running = [0] * m, 0
    for rank, i in enumerate(order, 1):
        running = max(running, (m - rank + 1) * lattice[i])
        adjusted[i] = min(U, running)
    return adjusted


def display(a):
    return pack('>d', float(Q(a, U))).hex()


def encoding(p):
    return pack('>d', float(p)).hex()


# Node costs measured on the pinned D0 example (commit 25de2d2b, example.json
# blob f11c27ef): one all_pairs member, family overhead, analysis, result slot
# per member id, one observation, and fixed dataset/design overhead.
MEMBER, FAMILY, ANALYSIS, SLOT_BASE, SLOT_ID, OBSERVATION, DATASET, DESIGN = 8, 8, 21, 8, 1, 5, 5, 23


def maximal_nodes(groups=16, analyses=16, families=16, members=120, observations=1024):
    return (analyses * ANALYSIS + families * (FAMILY + members * MEMBER)
            + families * (SLOT_BASE + members * SLOT_ID) + observations * OBSERVATION
            + DATASET + DESIGN + 4)


def main():
    supplied = [Q(1, 64), Q(1, 32), Q(1, 8)]
    require([encoding(p) for p in supplied] == ['3f90000000000000', '3fa0000000000000', '3fc0000000000000'], 'input encodings')
    adjusted = holm(supplied)
    require(adjusted == [3 << 1068, 1 << 1070, 1 << 1071], 'three-member lattice values')
    require([display(a) for a in adjusted] == ['3fa8000000000000', '3fb0000000000000', '3fc0000000000000'], 'three-member displays')
    x = Q(1, 4) + Q(3, 1 << 54)
    require(encoding(x) == '3fd0000000000003', 'collision input encoding')
    a = holm([x, Q(3, 4), Q(1)])
    b = int((Q(3, 4) + Q(8, 1 << 54)) * U)
    require(Q(a[0], U) == Q(3, 4) + Q(9, 1 << 54) and a[1:] == [U, U], 'collision adjusted values')
    require(a[0] != b and display(a[0]) == display(b) == '3fe8000000000004', 'same display, different exact value')
    require(len(format(U, 'x')) == 269, 'adjusted_hex width')
    d0 = maximal_nodes()
    sidecar = 4 + 120 * 9
    submitted = d0 + sidecar + 120 * 4 + 6
    require(d0 <= 24576 and sidecar <= 2048 and submitted <= 28672, 'proposed node budgets admit the maximal documents')
    print(json.dumps({'three_member_displays': [display(v) for v in adjusted],
                      'collision_display': display(a[0]), 'adjusted_hex_digits': 269,
                      'estimated_nodes': {'maximal_d0': d0, 'sidecar': sidecar, 'submitted': submitted}}, indent=2))


if __name__ == '__main__':
    main()
