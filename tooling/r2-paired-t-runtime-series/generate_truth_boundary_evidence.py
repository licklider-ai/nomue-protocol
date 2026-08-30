"""Generate non-authoritative projection-transition evidence for the R2-D5 series graph.

Each transition is located by monotone binary search over non-negative finite binary64
Student-t statistics. Arb certifies the correctly rounded mathematical probability on
both adjacent input cells. The resulting ULP distances are pointwise facts, not a
global error bound, a runtime margin, or Protocol support.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import platform
import shutil
from fractions import Fraction
from pathlib import Path
from typing import Any

import flint

import generate_evidence as runtime


SCOPE = "selected_df_projection_transition_search_not_protocol_support"
MAX_FINITE_BITS = 0x7FEFFFFFFFFFFFFF
CLASS_RANK = {"zero": 0, "subnormal": 1, "normal": 2, "rounded_one": 3}
TRANSITIONS = {
    "rounded_one_to_positive_normal": ("rounded_one", "normal", 3),
    "positive_normal_to_positive_subnormal": ("normal", "subnormal", 2),
    "positive_subnormal_to_zero": ("subnormal", "zero", 1),
}


def canonical_json(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode()


def sha256_file(path: Path) -> str:
    return "sha256:" + hashlib.sha256(path.read_bytes()).hexdigest()


def bits_to_hex(bits: int) -> str:
    return f"{bits:016x}"


def certify_truth(df: int, statistic_bits: int) -> dict[str, Any]:
    statistic_hex = bits_to_hex(statistic_bits)
    statistic_float = runtime.float_from_hex(statistic_hex)
    statistic = runtime.float_to_fraction(statistic_float)
    precision = 128
    history: list[int] = []
    while precision <= runtime.P_PRECISION_CEILING_BITS:
        history.append(precision)
        bounds = runtime.arb_bounds(runtime.oracle_p_ball(df, statistic, precision))
        projection = runtime.strict_projection(bounds)
        if projection is not None:
            projected = runtime.float_from_hex(str(projection["binary64_hex"]))
            return {
                "method": "arb_regularized_incomplete_beta_exact_binary64_input",
                "enclosure": runtime.interval_json(bounds),
                "projection": projection,
                "projection_class": runtime.projection_class(projected),
                "precision_history_bits": history,
            }
        precision *= 2
    raise RuntimeError(f"df={df} statistic={statistic_hex}: oracle did not isolate a cell")


def locate_transition(df: int, transition_key: str, cache: dict[tuple[int, int], dict[str, Any]]) -> tuple[int, int]:
    expected_left, expected_right, threshold = TRANSITIONS[transition_key]

    def truth(bits: int) -> dict[str, Any]:
        key = (df, bits)
        if key not in cache:
            cache[key] = certify_truth(df, bits)
        return cache[key]

    low = 0
    high = MAX_FINITE_BITS
    while low < high:
        midpoint = (low + high + 1) // 2
        rank = CLASS_RANK[str(truth(midpoint)["projection_class"])]
        if rank >= threshold:
            low = midpoint
        else:
            high = midpoint - 1
    if low == MAX_FINITE_BITS:
        raise RuntimeError(f"df={df} {transition_key}: transition is outside finite binary64")
    right = low + 1
    left_class = str(truth(low)["projection_class"])
    right_class = str(truth(right)["projection_class"])
    if left_class != expected_left or right_class != expected_right:
        raise RuntimeError(
            f"df={df} {transition_key}: found {left_class}->{right_class}, expected "
            f"{expected_left}->{expected_right}"
        )
    return low, right


def endpoint(
    df: int,
    statistic_bits: int,
    truth: dict[str, Any],
    inverse_beta_float: float,
) -> dict[str, Any]:
    statistic_hex = bits_to_hex(statistic_bits)
    statistic_float = runtime.float_from_hex(statistic_hex)
    graph = runtime.mirror_runtime_graph(df, statistic_float, inverse_beta_float)
    truth_hex = str(truth["projection"]["binary64_hex"])
    graph_hex = str(graph["p_value_binary64_hex"])
    return {
        "test_statistic_binary64_hex": statistic_hex,
        "test_statistic_exact": runtime.canonical_fraction(Fraction(statistic_float)),
        "truth": truth,
        "graph": graph,
        "graph_to_truth_ulp_distance": runtime.ordered_ulp_distance(graph_hex, truth_hex),
        "graph_truth_projection_class_agree": graph["projection_class"]
        == truth["projection_class"],
    }


def validate_manifest(document: dict[str, Any]) -> tuple[list[int], list[dict[str, Any]]]:
    expected_keys = {
        "status",
        "scope",
        "degrees_of_freedom",
        "transition_families",
        "contiguous_input_domain_claimed",
        "supported_degrees_of_freedom_max",
        "runtime_support_claimed",
    }
    if set(document) != expected_keys:
        raise RuntimeError("truth-boundary manifest keys are incomplete or contain an undeclared item")
    if (
        document["status"] != "non_authoritative_candidate"
        or document["scope"] != SCOPE
        or document["contiguous_input_domain_claimed"] is not False
        or document["supported_degrees_of_freedom_max"] is not None
        or document["runtime_support_claimed"] is not False
    ):
        raise RuntimeError("truth-boundary manifest overclaims maturity or support")
    dfs = document["degrees_of_freedom"]
    if dfs != [1, 2, 3, 10, 30, 100, 200]:
        raise RuntimeError("truth-boundary degrees of freedom differ from the candidate seed")
    families = document["transition_families"]
    if not isinstance(families, list) or [entry["transition_key"] for entry in families] != list(TRANSITIONS):
        raise RuntimeError("truth-boundary transition order differs from the candidate seed")
    for entry in families:
        if set(entry) != {
            "transition_key",
            "left_class",
            "right_class",
            "excluded_degrees_of_freedom",
        }:
            raise RuntimeError("truth-boundary transition keys are not closed")
        expected_left, expected_right, _ = TRANSITIONS[str(entry["transition_key"])]
        expected_exclusions = [1] if entry["transition_key"] == "positive_subnormal_to_zero" else []
        if (
            entry["left_class"] != expected_left
            or entry["right_class"] != expected_right
            or entry["excluded_degrees_of_freedom"] != expected_exclusions
        ):
            raise RuntimeError("truth-boundary transition definition drifted")
    return dfs, families


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cases", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    arguments = parser.parse_args()
    commit = os.environ.get("NOMUE_GENERATOR_COMMIT", "")
    if runtime.COMMIT.fullmatch(commit) is None or commit == "0" * 40:
        raise SystemExit("NOMUE_GENERATOR_COMMIT must be the nonzero full checkout commit")
    if arguments.output.exists():
        raise SystemExit("output directory already exists")

    repository_root = Path(__file__).resolve().parents[2]
    source_paths = {
        "truth-boundary-generator.py": Path(__file__).resolve(),
        "truth-boundary-cases.json": arguments.cases.resolve(),
        "runtime-series-generator.py": Path(__file__).with_name("generate_evidence.py").resolve(),
        "runtime-series-candidate.ts": repository_root
        / "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
        "runtime-series-candidate.json": repository_root
        / "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
        "truth-boundary-candidate.json": repository_root
        / "governance/drafts/release-2-candidate/numerical/truth-boundary-candidate.json",
    }
    manifest = json.loads(arguments.cases.read_text())
    dfs, families = validate_manifest(manifest)

    cache: dict[tuple[int, int], dict[str, Any]] = {}
    transition_cases: list[dict[str, Any]] = []
    maximum_ulp = 0
    maximum_witnesses: list[str] = []
    class_disagreements = 0
    for df in dfs:
        runtime.ctx.prec = runtime.PRECISION_BITS
        inverse_bounds = runtime.arb_bounds(runtime.inverse_beta_ball(df))
        inverse_projection = runtime.strict_projection(inverse_bounds)
        if inverse_projection is None:
            raise RuntimeError(f"df={df}: inverse-beta constant did not isolate a cell")
        inverse_float = runtime.float_from_hex(str(inverse_projection["binary64_hex"]))
        for family in families:
            if df in family["excluded_degrees_of_freedom"]:
                continue
            transition_key = str(family["transition_key"])
            left_bits, right_bits = locate_transition(df, transition_key, cache)
            left = endpoint(df, left_bits, cache[(df, left_bits)], inverse_float)
            right = endpoint(df, right_bits, cache[(df, right_bits)], inverse_float)
            case_id = f"df{df}-{transition_key}"
            for value in (left, right):
                distance = int(value["graph_to_truth_ulp_distance"])
                if distance > maximum_ulp:
                    maximum_ulp = distance
                    maximum_witnesses = [case_id]
                elif distance == maximum_ulp and case_id not in maximum_witnesses:
                    maximum_witnesses.append(case_id)
                if value["graph_truth_projection_class_agree"] is not True:
                    class_disagreements += 1
            transition_cases.append(
                {
                    "case_id": case_id,
                    "degrees_of_freedom": df,
                    "transition_key": transition_key,
                    "input_statistics_are_adjacent_binary64": right_bits == left_bits + 1,
                    "inverse_beta_constant": {
                        "definition": "one_over_beta_df_over_two_one_half",
                        "arb_enclosure": runtime.interval_json(inverse_bounds),
                        "projection": inverse_projection,
                    },
                    "left": left,
                    "right": right,
                }
            )

    arguments.output.mkdir(parents=True)
    for name, source_path in source_paths.items():
        shutil.copyfile(source_path, arguments.output / name)
    environment = {
        "status": "non_authoritative_candidate",
        "python": platform.python_version(),
        "python_flint": flint.__version__,
        "flint": flint.__FLINT_VERSION__,
        "platform": platform.platform(),
    }
    (arguments.output / "environment.json").write_bytes(canonical_json(environment))
    evidence = {
        "status": "non_authoritative_candidate",
        "scope": SCOPE,
        "generator_commit": commit,
        "runtime_support_claimed": False,
        "global_truth_error_bound_selected": False,
        "global_truth_error_bound_ulp": None,
        "finite_corpus_maximum_is_a_guarantee": False,
        "projection_margin_runtime_activated": False,
        "supported_degrees_of_freedom_max": None,
        "transition_count": len(transition_cases),
        "pointwise_maximum_observed_ulp": maximum_ulp,
        "pointwise_maximum_witness_case_ids": maximum_witnesses,
        "graph_truth_projection_class_disagreement_endpoint_count": class_disagreements,
        "source_hashes": {name: sha256_file(path) for name, path in source_paths.items()},
        "environment_hash": sha256_file(arguments.output / "environment.json"),
        "transitions": transition_cases,
    }
    (arguments.output / "truth-boundary-evidence.json").write_bytes(canonical_json(evidence))
    manifest_paths = sorted(path.name for path in arguments.output.iterdir())
    manifest_lines = [
        f"{hashlib.sha256((arguments.output / name).read_bytes()).hexdigest()}  {name}"
        for name in manifest_paths
    ]
    (arguments.output / "MANIFEST.sha256").write_text("\n".join(manifest_lines) + "\n")


if __name__ == "__main__":
    main()
