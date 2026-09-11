#!/usr/bin/env python3
"""Independent exact-rational oracle for the reviewer-only M3-D corpus."""

from __future__ import annotations

import hashlib
import json
import sys
from fractions import Fraction
from pathlib import Path
from typing import Any

SELECTED_HASH = "sha256:24ccc86d7a49b9e1ef1e3fc9b038a5b8d338b8b5ca4a02492d8900d7e7dea3c0"


def fraction_from_hex(value: str) -> Fraction:
    bits = int(value, 16)
    sign = -1 if bits >> 63 else 1
    exponent = (bits >> 52) & 0x7FF
    fraction = bits & ((1 << 52) - 1)
    if exponent == 0x7FF:
        raise AssertionError("non-finite binary64")
    if exponent == 0:
        if fraction == 0:
            return Fraction(0)
        significand = fraction
        power = -1074
    else:
        significand = (1 << 52) | fraction
        power = exponent - 1023 - 52
    result = Fraction(sign * significand)
    return result * (2**power if power >= 0 else Fraction(1, 2 ** (-power)))


def serialized_fraction(value: dict[str, str]) -> Fraction:
    result = Fraction(int(value["numerator"]), int(value["denominator"]))
    assert str(result.numerator) == value["numerator"]
    assert str(result.denominator) == value["denominator"]
    return result


def interval(value: dict[str, Any]) -> tuple[Fraction, Fraction]:
    lower = serialized_fraction(value["lower"])
    upper = serialized_fraction(value["upper"])
    assert lower <= upper
    return lower, upper


def exact_mean(values: list[Fraction]) -> Fraction:
    return sum(values, Fraction(0)) / len(values)


def exact_se_squared(values: list[Fraction]) -> Fraction:
    n = len(values)
    mean = exact_mean(values)
    sum_squares = sum(((value - mean) ** 2 for value in values), Fraction(0))
    sample_variance = sum_squares / (n - 1)
    return sample_variance / n


def expected_error(graph_hex: str, bounds: tuple[Fraction, Fraction]) -> Fraction:
    graph = fraction_from_hex(graph_hex)
    return max(abs(graph - bounds[0]), abs(graph - bounds[1]))


def verify_quantity(value: dict[str, Any], expected_bounds: tuple[Fraction, Fraction]) -> None:
    actual_bounds = interval(value["truth_interval"])
    assert actual_bounds == expected_bounds
    actual_error = serialized_fraction(value["absolute_error_upper_bound"])
    assert actual_error == expected_error(value["graph_binary64_hex"], expected_bounds)


def verify_selected_table(repository_root: Path) -> list[str]:
    path = (
        repository_root
        / "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-selected-candidate.json"
    )
    data = json.loads(path.read_text())
    cells = data["critical_value_binary64_hex_by_df"]
    assert len(cells) == 200
    values = [fraction_from_hex(cell) for cell in cells]
    assert all(value > 0 for value in values)
    assert all(values[index] > values[index + 1] for index in range(199))

    lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"]
    lines.extend(f"df={index + 1};binary64={cell}" for index, cell in enumerate(cells))
    content = ("\n".join(lines) + "\n").encode()
    digest = "sha256:" + hashlib.sha256(content).hexdigest()
    assert digest == SELECTED_HASH
    return cells


def verify_case(case: dict[str, Any], cells: list[str]) -> None:
    envelope = case["envelope"]
    proof = envelope["proof"]
    ci_trace = envelope["ci_trace"]
    g4_truth = envelope["g4_truth_envelope"]
    differences = [fraction_from_hex(value) for value in case["difference_binary64_hex"]]
    df = len(differences) - 1

    assert ci_trace["g4_trace"] == g4_truth["g4_trace"]
    assert proof["ci_trace_sha256"] == ci_trace["sha256"]
    assert proof["g4_truth_envelope_sha256"] == g4_truth["sha256"]
    assert proof["g4_trace_sha256"] == ci_trace["g4_trace"]["sha256"]
    assert proof["selected_table_content_hash"] == SELECTED_HASH
    assert proof["critical_value"]["degrees_of_freedom"] == df
    assert proof["critical_value"]["graph_binary64_hex"] == cells[df - 1]

    mean_bounds = interval(proof["mean_difference_truth_interval"])
    se_bounds = interval(proof["standard_error_truth_interval"])
    true_mean = exact_mean(differences)
    true_se_squared = exact_se_squared(differences)
    assert mean_bounds[0] <= true_mean <= mean_bounds[1]
    assert se_bounds[0] >= 0
    assert se_bounds[0] ** 2 <= true_se_squared <= se_bounds[1] ** 2

    critical = proof["critical_value"]
    q_hex = critical["graph_binary64_hex"]
    q_bits = int(q_hex, 16)
    assert critical["predecessor_binary64_hex"] == f"{q_bits - 1:016x}"
    assert critical["successor_binary64_hex"] == f"{q_bits + 1:016x}"
    q = fraction_from_hex(q_hex)
    prev = fraction_from_hex(critical["predecessor_binary64_hex"])
    nxt = fraction_from_hex(critical["successor_binary64_hex"])
    q_bounds = ((prev + q) / 2, (q + nxt) / 2)
    assert interval(critical["truth_interval"]) == q_bounds
    expected_quantization = max(abs(q - q_bounds[0]), abs(q - q_bounds[1]))
    assert serialized_fraction(critical["absolute_quantization_upper_bound"]) == expected_quantization

    margin_bounds = (q_bounds[0] * se_bounds[0], q_bounds[1] * se_bounds[1])
    lower_bounds = (mean_bounds[0] - margin_bounds[1], mean_bounds[1] - margin_bounds[0])
    upper_bounds = (mean_bounds[0] + margin_bounds[0], mean_bounds[1] + margin_bounds[1])

    verify_quantity(proof["margin"], margin_bounds)
    verify_quantity(proof["lower_endpoint"], lower_bounds)
    verify_quantity(proof["upper_endpoint"], upper_bounds)

    # The graph-to-truth metric must contain the actual graph result, including all
    # binary64 multiply/add/subtract rounding, without a separate heuristic term.
    for name in ("margin", "lower_endpoint", "upper_endpoint"):
        bound = serialized_fraction(proof[name]["absolute_error_upper_bound"])
        assert bound >= 0


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: m3d_fraction_oracle.py CORPUS_JSON REPOSITORY_ROOT")
    corpus = json.loads(Path(sys.argv[1]).read_text())
    repository_root = Path(sys.argv[2]).resolve()
    cells = verify_selected_table(repository_root)

    labels: list[str] = []
    for case in corpus["successes"]:
        verify_case(case, cells)
        labels.append(case["label"])

    collapse = corpus["collapse"]["result"]
    assert collapse["ok"] is False
    assert collapse["classification"] == "ci_stage_refusal"
    assert collapse["ciClassification"] == "confidence_interval_endpoint_collapse"
    assert collapse["confidenceIntervalEndpointTruthComplete"] is False
    assert collapse["runtimeSupportClaimed"] is False

    print(f"M3-D independent Fraction oracle: PASS ({len(labels)} success cases + collapse)")
    print("cases=" + ",".join(labels))
    print("selected_table_cells=200; ordered_hash=" + SELECTED_HASH)


if __name__ == "__main__":
    main()
