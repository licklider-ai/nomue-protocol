"""Independent bounded checks of the pinned R3 Holm arithmetic candidate.

This reviewer script does not use the candidate as an oracle.  It loads the
exact Git object, checks its hash, and compares it with Fraction/struct and a
closed-testing enumeration.  All checks use explicit raises and therefore run
unchanged under ``python -O``.
"""

from fractions import Fraction as Q
from itertools import combinations
import hashlib
import json
import random
import struct
import subprocess
import sys
import types


COMMIT = "c4ad231471deba354bd018550b2378f2d740b944"
PATH = "governance/drafts/release-3-preparation/holm-experiment-20260911/candidate.py"
SHA256 = "70924d2b7ac40367e9ae4abaee624dd6c0b85796a62c5445b0694f2240fac606"
U = 1 << 1074
ONE_BITS = 0x3FF0000000000000


def require(condition, message):
    if not condition:
        raise ValueError(message)


def load_candidate(repo):
    source = subprocess.check_output(["git", "-C", repo, "show", f"{COMMIT}:{PATH}"])
    require(hashlib.sha256(source).hexdigest() == SHA256, "candidate source identity")
    module = types.ModuleType("pinned_r3_holm_candidate")
    module.__file__ = f"{COMMIT}:{PATH}"
    exec(compile(source, module.__file__, "exec"), module.__dict__)
    return module


def fraction_from_positive_bits(bits):
    value = struct.unpack(">d", bits.to_bytes(8, "big"))[0]
    return Q(*value.as_integer_ratio())


def expected_lattice(bits):
    q = fraction_from_positive_bits(bits) * U
    require(q.denominator == 1, "binary64 lattice integrality")
    return q.numerator


def display_oracle(a):
    return struct.pack(">d", float(Q(a, U)))


def closed_testing(ps):
    out = []
    for member in range(len(ps)):
        value = Q(0)
        for size in range(1, len(ps) + 1):
            for subset in combinations(range(len(ps)), size):
                if member in subset:
                    value = max(value, min(Q(1), size * min(ps[i] for i in subset)))
        out.append(value)
    return out


def carrier_from_bits(bits):
    return {
        "family": "review-family",
        "revision": "review-revision",
        "members": [
            {
                "hypothesis": f"h-{i}",
                "origin": f"source-{i % 3}",
                "p": value.to_bytes(8, "big"),
            }
            for i, value in enumerate(bits)
        ],
    }


def step_down(ps, alpha):
    order = sorted(range(len(ps)), key=lambda i: (ps[i], i))
    rejected = set()
    for rank, member in enumerate(order, 1):
        if ps[member] <= alpha / (len(ps) - rank + 1):
            rejected.add(member)
        else:
            break
    return rejected


def main(repo):
    candidate = load_candidate(repo)
    rng = random.Random(0x52334232)
    counts = {
        "decode_boundaries": 0,
        "decode_random_domain": 0,
        "project_boundaries": 0,
        "project_random": 0,
        "project_exact_midpoints": 0,
        "closed_testing_families": 0,
        "step_down_levels": 0,
        "alpha_endpoint_checks": 0,
        "identity_and_refusal_checks": 0,
    }

    boundaries = {
        0,
        1,
        (1 << 52) - 1,
        1 << 52,
        (1 << 52) + 1,
        (1022 << 52),
        (1023 << 52) - 1,
        1023 << 52,
    }
    for bits in sorted(boundaries):
        require(0 <= bits <= ONE_BITS, "review boundary range")
        raw = bits.to_bytes(8, "big")
        require(candidate.decode(raw) == expected_lattice(bits), f"decode boundary {bits:016x}")
        require(candidate.project(candidate.decode(raw)) == raw, f"decode/project identity {bits:016x}")
        counts["decode_boundaries"] += 1

    for _ in range(50_000):
        bits = rng.getrandbits(64)
        raw = bits.to_bytes(8, "big")
        accepted = bits <= ONE_BITS
        try:
            actual = candidate.decode(raw)
        except ValueError as error:
            require(not accepted and str(error) == "p domain", "decode random refusal")
        else:
            require(accepted, "decode accepted outside domain")
            require(actual == expected_lattice(bits), "decode random exactness")
        counts["decode_random_domain"] += 1

    for raw in (b"", bytes(7), bytes(9), bytearray(8), memoryview(bytes(8))):
        try:
            candidate.decode(raw)
        except ValueError as error:
            require(str(error) == "p bytes", "decode type/length reason")
        else:
            raise ValueError("decode accepted invalid byte carrier")
        counts["identity_and_refusal_checks"] += 1

    projection_points = {0, 1, U - 1, U}
    for exponent in range(0, 1075):
        p = 1 << exponent
        for delta in (-2, -1, 0, 1, 2):
            if 0 <= p + delta <= U:
                projection_points.add(p + delta)
    for a in projection_points:
        require(candidate.project(a) == display_oracle(a), f"projection boundary {a}")
        counts["project_boundaries"] += 1

    for _ in range(50_000):
        a = rng.randrange(U + 1)
        require(candidate.project(a) == display_oracle(a), "projection random exactness")
        counts["project_random"] += 1

    for shift in range(1, 1023):
        for q in ((1 << 52), (1 << 52) + 1, (1 << 53) - 2, (1 << 53) - 1):
            midpoint = (q << shift) + (1 << (shift - 1))
            if midpoint <= U:
                require(candidate.project(midpoint) == display_oracle(midpoint), "midpoint parity")
                counts["project_exact_midpoints"] += 1

    levels = [0, 1, 2, (1 << 52) - 1, 1 << 52, ONE_BITS - 1, ONE_BITS]
    for _ in range(600):
        m = rng.randint(1, 7)
        bits = [rng.choice(levels) if rng.random() < 0.35 else rng.randrange(ONE_BITS + 1) for _ in range(m)]
        if rng.random() < 0.35:
            repeated = rng.choice(bits)
            bits = [repeated if rng.random() < 0.6 else value for value in bits]
        ps = [fraction_from_positive_bits(value) for value in bits]
        result = candidate.transform(carrier_from_bits(bits))
        expected = closed_testing(ps)
        require([Q(a, U) for a in result["adjusted_lattice"]] == expected, "closed-testing transform")
        require(result["display"] == [display_oracle(int(q * U)) for q in expected], "transform displays")
        expected_order = sorted(range(m), key=lambda i: (ps[i], i))
        require(result["order"] == expected_order, "stable exact order")
        require(result["inverse"] == [expected_order.index(i) for i in range(m)], "inverse permutation")
        require(
            result["sorted_products"]
            == [(m - rank) * int(ps[i] * U) for rank, i in enumerate(expected_order)],
            "rank products",
        )
        counts["closed_testing_families"] += 1
        alpha = Q(rng.randint(1, 1023), 1024)
        require(
            {i for i, adjusted in enumerate(expected) if adjusted <= alpha} == step_down(ps, alpha),
            "step-down equivalence",
        )
        counts["step_down_levels"] += 1

    endpoint_ps = [Q(3, 4), Q(1)]
    endpoint_bits = [int.from_bytes(struct.pack(">d", float(q)), "big") for q in endpoint_ps]
    endpoint_adjusted = [Q(a, U) for a in candidate.transform(carrier_from_bits(endpoint_bits))["adjusted_lattice"]]
    require(endpoint_adjusted == [Q(1), Q(1)], "alpha one adjusted witness")
    require(step_down(endpoint_ps, Q(1)) == set(), "alpha one sequential witness")
    counts["alpha_endpoint_checks"] += 1
    zero_ps = [Q(0), Q(0), Q(1, 2)]
    require(
        {i for i, adjusted in enumerate(closed_testing(zero_ps)) if adjusted <= 0}
        == step_down(zero_ps, Q(0)),
        "alpha zero boundary",
    )
    counts["alpha_endpoint_checks"] += 1

    # Exact/display collision from the proposal: the exact values differ while
    # nearest/even display bytes agree.
    x = Q(1, 4) + Q(3, 1 << 54)
    x_bits = int.from_bytes(struct.pack(">d", float(x)), "big")
    collision = candidate.transform(carrier_from_bits([x_bits, int.from_bytes(struct.pack(">d", 0.75), "big"), ONE_BITS]))
    exact = collision["adjusted_lattice"][0]
    other = int((Q(3, 4) + Q(8, 1 << 54)) * U)
    require(Q(exact, U) == Q(3, 4) + Q(9, 1 << 54), "collision exact value")
    require(exact != other and candidate.project(exact) == candidate.project(other), "collision display")
    counts["identity_and_refusal_checks"] += 1

    # Candidate policy distinguishes positive and negative zero.
    require(candidate.decode(bytes(8)) == 0 and candidate.project(0) == bytes(8), "positive zero")
    try:
        candidate.decode((1 << 63).to_bytes(8, "big"))
    except ValueError as error:
        require(str(error) == "p domain", "negative zero reason")
    else:
        raise ValueError("negative zero accepted")
    counts["identity_and_refusal_checks"] += 1

    # Whole-carrier validation refuses duplicates, invalid counts, and invalid
    # p encodings before producing an arithmetic result.
    bad = carrier_from_bits([0, 0])
    bad["members"][1]["hypothesis"] = bad["members"][0]["hypothesis"]
    checks = [
        (lambda: candidate.transform(carrier_from_bits([])), "family count"),
        (lambda: candidate.transform(carrier_from_bits([0] * 1025)), "family count"),
        (lambda: candidate.transform(bad), "duplicate hypothesis"),
    ]
    for action, reason in checks:
        try:
            action()
        except ValueError as error:
            require(str(error) == reason, f"carrier refusal {reason}")
        else:
            raise ValueError(f"carrier accepted: {reason}")
        counts["identity_and_refusal_checks"] += 1

    print(
        json.dumps(
            {
                "candidate_commit": COMMIT,
                "candidate_sha256": SHA256,
                "checks": counts,
                "total": sum(counts.values()),
                "status": "pass",
            },
            indent=2,
            sort_keys=True,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("usage: reviewer_arithmetic_checks.py REPOSITORY")
    main(sys.argv[1])
