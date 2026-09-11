"""Reviewer-side design witnesses against the pinned PR #295 modules; no consumer exists."""
from fractions import Fraction as Q
from pathlib import Path
import json
import sys

WRAPPER = Path(__file__).resolve().parent.parent / 'complete-output-experiment-20260911'
sys.path.insert(0, str(WRAPPER))
import complete  # noqa: E402  (verifies dependency hashes and origins on import)
from rational_candidate import finite_enclosure  # noqa: E402
from rational_oracle import oracle, round_probability  # noqa: E402

CAP = 262144


def require(condition, message):
    if not condition:
        raise ValueError(message)


def predicate(submitted, encoding, enclosure):
    """DESIGN.md local check: containment of C, one rounded encoding, E equality."""
    lower, upper = submitted
    if not (0 <= lower <= enclosure[0] <= enclosure[1] <= upper <= 1):
        return 'containment refusal'
    if round_probability(lower) != encoding or round_probability(upper) != encoding:
        return 'encoding refusal'
    return 'accept'


def main():
    cells = [[0., 1.], [0., 1.], [1., 2.], [1., 2.]]
    result = complete.complete(cells, 'o2')
    require(result['outcome'] == 'complete_experiment', 'O2 target admission')
    exact = {k: [Q(*p) for p in v] for k, v in result['exact'].items()}
    require(exact['estimates'] == [1, 0, 0] and exact['ss'] == [2, 0, 0] and exact['sse'] == [2]
            and exact['f'] == [4, 0, 0] and result['df']['A'] == (1, 4), 'O2 raw arithmetic')
    tail = result['tails']['A']
    enclosure, encoding = tail['bounds'], tail['encoding']
    low, high = oracle(Q(4), 2, 256)[:2]
    scale = 1 << 400
    point = Q(-((-low.numerator * scale) // low.denominator), scale)
    require(low <= point <= high and point < oracle(Q(4), 2, 384)[0], 'O2 witness position')
    require(round_probability(point) == encoding, 'O2 witness shares encoding')
    require(predicate((point, point), encoding, enclosure) == 'containment refusal', 'O2 singleton')
    require(predicate(enclosure, encoding, enclosure) == 'accept', 'exact enclosure')
    require(predicate((Q(0), Q(1)), encoding, enclosure) == 'encoding refusal', 'unit interval')
    tighter = finite_enclosure(Q(4), 2, 512)
    require(enclosure[0] < tighter[0] <= tighter[1] < enclosure[1], 'higher precision nests strictly')
    require(predicate(tighter, encoding, enclosure) == 'containment refusal', 'same-algorithm tighter')
    t, e = Q(3, 4), Q(1, 1 << 56)
    toy, code = (t - e, t + e), round_probability(t)
    require(round_probability(toy[0]) == code == round_probability(toy[1]), 'toy enclosure cell')
    require(predicate((t - 2*e, t + 2*e), code, toy) == 'accept', 'toy widened')
    require(predicate((t - e/2, t + e/2), code, toy) == 'containment refusal', 'toy tighter')
    require(predicate((t - e, t - e), code, toy) == 'containment refusal', 'toy singleton')
    require(predicate((Q(0), Q(1)), code, toy) == 'encoding refusal', 'toy unit interval')
    sizes = {}
    for n, width in [(2, 6500), (7, 6500), (9, 3906), (33, 244), (46, 123), (65, 61)]:
        f = Q((1 << width) - 1, (1 << (width - 1)) + 1)
        lower, upper = finite_enclosure(f, n, 512)
        sizes[f'n={n},w={width}'] = max(x.bit_length() for q in (lower, upper)
                                        for x in (q.numerator, q.denominator))
    require(max(sizes.values()) <= CAP, 'frontier endpoint exceeds proposed cap')
    print(json.dumps({'o2_encoding': f'{encoding:016x}', 'o2_resolved_bits': tail['bits'],
                      'witness_denominator_bits': point.denominator.bit_length(),
                      'frontier_endpoint_bits_at_512': sizes, 'cap_bits': CAP}, indent=2))


if __name__ == '__main__':
    main()
