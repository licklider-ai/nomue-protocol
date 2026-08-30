"""Generate non-authoritative evidence for the paired-t runtime-series candidate.

The binary64 graph is mirrored independently in Python and compared later with the
TypeScript spike. Arb supplies exact-input probability enclosures, correctly rounded
inverse-beta constants, and a positive-series truncation enclosure. The output is an
evaluation corpus, never Protocol support or a runtime tolerance.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import platform
import re
import shutil
import struct
import sys
from fractions import Fraction
from pathlib import Path
from typing import Any

try:
    import flint
    from flint import arb, ctx, fmpq
except ImportError as exc:  # pragma: no cover - exercised by the workflow contract
    raise SystemExit(
        "python-flint is required; install the pinned requirements before running evidence"
    ) from exc


COMMIT = re.compile(r"^[0-9a-f]{40}$")
HEX64 = re.compile(r"^[0-9a-f]{16}$")
SCOPE = "explicit_runtime_series_evaluation_corpus_not_protocol_support"
PRECISION_BITS = 512
P_PRECISION_CEILING_BITS = 8192


def canonical_json(value: Any) -> bytes:
    return (json.dumps(value, ensure_ascii=False, indent=2) + "\n").encode()


def sha256_bytes(value: bytes) -> str:
    return "sha256:" + hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def canonical_fraction(value: Fraction) -> str:
    return f"{value.numerator}/{value.denominator}"


def fraction_from_exact_arb(value: arb) -> Fraction:
    mantissa, exponent = value.man_exp()
    mantissa_int = int(mantissa)
    exponent_int = int(exponent)
    if exponent_int >= 0:
        return Fraction(mantissa_int << exponent_int, 1)
    return Fraction(mantissa_int, 1 << (-exponent_int))


def arb_bounds(value: arb) -> tuple[Fraction, Fraction]:
    return fraction_from_exact_arb(value.lower()), fraction_from_exact_arb(value.upper())


def interval_json(bounds: tuple[Fraction, Fraction]) -> dict[str, str]:
    return {"lower": canonical_fraction(bounds[0]), "upper": canonical_fraction(bounds[1])}


def arb_from_fraction(value: Fraction) -> arb:
    return arb(fmpq(value.numerator, value.denominator))


def float_from_hex(value: str) -> float:
    if HEX64.fullmatch(value) is None:
        raise ValueError(f"not lowercase binary64 hex: {value}")
    result = struct.unpack(">d", bytes.fromhex(value))[0]
    if not math.isfinite(result):
        raise ValueError(f"binary64 value is not finite: {value}")
    return result


def float_to_hex(value: float) -> str:
    return struct.pack(">d", value).hex()


def float_to_fraction(value: float) -> Fraction:
    if not math.isfinite(value):
        raise ValueError("only finite binary64 values have exact rational lifts")
    return Fraction(value)


def adjacent_float(value: float, direction: str) -> float:
    bits = int.from_bytes(struct.pack(">d", value), "big")
    if direction not in {"down", "up"}:
        raise ValueError("direction must be down or up")
    if value == 0:
        adjacent_bits = 0x8000000000000001 if direction == "down" else 1
    elif value > 0:
        adjacent_bits = bits - 1 if direction == "down" else bits + 1
    else:
        adjacent_bits = bits + 1 if direction == "down" else bits - 1
    return struct.unpack(">d", adjacent_bits.to_bytes(8, "big"))[0]


def rounding_cell(value: float) -> tuple[Fraction, Fraction]:
    exact = float_to_fraction(value)
    return (
        (float_to_fraction(adjacent_float(value, "down")) + exact) / 2,
        (exact + float_to_fraction(adjacent_float(value, "up"))) / 2,
    )


def strict_projection(bounds: tuple[Fraction, Fraction]) -> dict[str, Any] | None:
    lower, upper = bounds
    projected_lower = float(lower)
    projected_upper = float(upper)
    if projected_lower != projected_upper or not math.isfinite(projected_lower):
        return None
    cell_lower, cell_upper = rounding_cell(projected_lower)
    if not (cell_lower < lower and upper < cell_upper):
        return None
    return {
        "binary64_hex": float_to_hex(projected_lower),
        "cell_lower": canonical_fraction(cell_lower),
        "cell_upper": canonical_fraction(cell_upper),
        "strict_containment": True,
    }


def projection_class(value: float) -> str:
    if value == 0:
        return "zero"
    if value < 2.0**-1022:
        return "subnormal"
    if value == 1:
        return "rounded_one"
    return "normal"


def inverse_beta_ball(df: int) -> arb:
    half_df = arb(fmpq(df, 2))
    half = arb(fmpq(1, 2))
    return (half_df + half).gamma() / (half_df.gamma() * half.gamma())


def exact_x(df: int, statistic: Fraction) -> Fraction:
    return Fraction(df, 1) / (Fraction(df, 1) + statistic * statistic)


def oracle_p_ball(df: int, statistic: Fraction, precision_bits: int) -> arb:
    ctx.prec = precision_bits
    x = exact_x(df, statistic)
    if x > Fraction(1, 2):
        central = arb_from_fraction(1 - x).beta_lower(
            fmpq(1, 2), fmpq(df, 2), regularized=True
        )
        return 1 - central
    return arb_from_fraction(x).beta_lower(fmpq(df, 2), fmpq(1, 2), regularized=True)


def integer_power(base: float, exponent: int) -> float:
    accumulator = 1.0
    factor = base
    remaining = exponent
    while remaining > 0:
        if remaining % 2 == 1:
            accumulator = accumulator * factor
        remaining //= 2
        if remaining > 0:
            factor = factor * factor
    return accumulator


def mirror_runtime_graph(df: int, statistic: float, inverse_beta: float) -> dict[str, Any]:
    absolute_t = abs(statistic)
    cap = 40 * df + 64
    if absolute_t == 0:
        return graph_result("exact-zero", 1.0, 0, cap, 0.0)
    if df == 2:
        if absolute_t <= 1:
            squared_t = absolute_t * absolute_t
            root = math.sqrt(2 + squared_t)
            return graph_result(
                "df2-central-closed-form", 1 - absolute_t / root, 0, cap, 0.0
            )
        reciprocal_t = 1 / absolute_t
        scaled = 2 * (reciprocal_t * reciprocal_t)
        root = math.sqrt(1 + scaled)
        return graph_result("df2-tail-closed-form", scaled / (root * (root + 1)), 0, cap, 0.0)

    half_df = df / 2
    if absolute_t <= 1:
        squared_t = absolute_t * absolute_t
        denominator = df + squared_t
        y = squared_t / denominator
        x = df / denominator
        x_power = integer_power(x, df // 2)
        if df % 2 == 1:
            x_power = x_power * math.sqrt(x)
        prefactor = (2 * math.sqrt(y) * x_power) * inverse_beta
        ratio_ceiling = max(y, (y * (half_df + 0.5)) / 1.5)
        term = 1.0
        total = 1.0
        for index in range(cap):
            next_term = ((term * y) * (half_df + 0.5 + index)) / (1.5 + index)
            next_total = total + next_term
            remainder = prefactor * (next_term / (1 - ratio_ceiling))
            if next_total == total:
                return graph_result(
                    "central-complement-positive-series",
                    1 - prefactor * total,
                    index + 1,
                    cap,
                    remainder,
                )
            term = next_term
            total = next_total
    else:
        reciprocal_t = 1 / absolute_t
        squared_reciprocal = reciprocal_t * reciprocal_t
        scaled = df * squared_reciprocal
        denominator = 1 + scaled
        x = scaled / denominator
        x_power = integer_power(x, df // 2)
        if df % 2 == 1:
            stable_sqrt_x = (math.sqrt(df) * reciprocal_t) / math.sqrt(denominator)
            x_power = x_power * stable_sqrt_x
        prefactor = (x_power * inverse_beta) / half_df
        term = 1.0
        total = 1.0
        for index in range(cap):
            next_term = (
                (((term * x) * (half_df + index)) * (index + 0.5))
                / (half_df + index + 1)
                / (index + 1)
            )
            next_total = total + next_term
            remainder = prefactor * (next_term / (1 - x))
            if next_total == total:
                return graph_result(
                    "lower-tail-positive-series",
                    prefactor * total,
                    index + 1,
                    cap,
                    remainder,
                )
            term = next_term
            total = next_total
    raise RuntimeError(f"df={df}: positive-series evaluation reached cap {cap}")


def graph_result(branch: str, p_value: float, iterations: int, cap: int, remainder: float) -> dict[str, Any]:
    if not all(math.isfinite(value) for value in (p_value, remainder)):
        raise RuntimeError("binary64 graph produced a non-finite result")
    return {
        "branch": branch,
        "p_value_binary64_hex": float_to_hex(p_value),
        "projection_class": projection_class(p_value),
        "iterations": iterations,
        "iteration_cap": cap,
        "positive_series_remainder_contribution_candidate_binary64_hex": float_to_hex(remainder),
        "runtime_support_claimed": False,
        "correct_rounding_claimed": False,
    }


def series_truth_interval(df: int, statistic: Fraction, iterations: int, branch: str) -> tuple[Fraction, Fraction]:
    ctx.prec = PRECISION_BITS
    if branch == "exact-zero":
        return Fraction(1), Fraction(1)
    if branch.startswith("df2-"):
        return arb_bounds(oracle_p_ball(df, statistic, PRECISION_BITS))

    absolute_t = abs(statistic)
    half_df = Fraction(df, 2)
    inv_beta = inverse_beta_ball(df)
    if branch == "central-complement-positive-series":
        squared_t = absolute_t * absolute_t
        denominator = Fraction(df) + squared_t
        y = squared_t / denominator
        x = Fraction(df) / denominator
        prefactor = (
            2
            * arb_from_fraction(y).sqrt()
            * (arb_from_fraction(x) ** fmpq(df, 2))
            * inv_beta
        )
        ratio_ceiling = max(y, y * (half_df + Fraction(1, 2)) / Fraction(3, 2))
        term = arb(1)
        total = arb(1)
        next_term = arb(0)
        for index in range(iterations):
            next_term = (
                term
                * arb_from_fraction(y)
                * arb_from_fraction(half_df + Fraction(1, 2) + index)
                / arb_from_fraction(Fraction(3, 2) + index)
            )
            if index + 1 < iterations:
                total += next_term
                term = next_term
        remainder = next_term / arb_from_fraction(1 - ratio_ceiling)
        lower = 1 - prefactor * (total + remainder)
        upper = 1 - prefactor * total
        return fraction_from_exact_arb(lower.lower()), fraction_from_exact_arb(upper.upper())

    x = exact_x(df, statistic)
    prefactor = (arb_from_fraction(x) ** fmpq(df, 2)) * inv_beta / arb_from_fraction(half_df)
    term = arb(1)
    total = arb(1)
    next_term = arb(0)
    for index in range(iterations):
        next_term = (
            term
            * arb_from_fraction(x)
            * arb_from_fraction(half_df + index)
            * arb_from_fraction(Fraction(1, 2) + index)
            / arb_from_fraction(half_df + index + 1)
            / arb(index + 1)
        )
        if index + 1 < iterations:
            total += next_term
            term = next_term
    remainder = next_term / arb_from_fraction(1 - x)
    lower = prefactor * total
    upper = prefactor * (total + remainder)
    return fraction_from_exact_arb(lower.lower()), fraction_from_exact_arb(upper.upper())


def ordered_ulp_distance(first_hex: str, second_hex: str) -> int:
    first = int(first_hex, 16)
    second = int(second_hex, 16)
    if first >> 63 or second >> 63:
        raise ValueError("p-value ULP distance requires non-negative values")
    return abs(first - second)


def certify_case(case: dict[str, Any]) -> dict[str, Any]:
    case_id = str(case["case_id"])
    df = int(case["degrees_of_freedom"])
    statistic_hex = str(case["test_statistic_binary64_hex"])
    if not (1 <= df <= 200):
        raise RuntimeError(f"{case_id}: df is outside the evaluation target")
    statistic_float = float_from_hex(statistic_hex)
    if statistic_float < 0 or math.copysign(1, statistic_float) < 0:
        raise RuntimeError(f"{case_id}: corpus statistics must be non-negative and not negative zero")
    statistic = float_to_fraction(statistic_float)

    ctx.prec = PRECISION_BITS
    inverse_beta_bounds = arb_bounds(inverse_beta_ball(df))
    inverse_beta_projection = strict_projection(inverse_beta_bounds)
    if inverse_beta_projection is None:
        raise RuntimeError(f"{case_id}: inverse-beta constant did not isolate a binary64 cell")
    inverse_beta_float = float_from_hex(inverse_beta_projection["binary64_hex"])
    graph = mirror_runtime_graph(df, statistic_float, inverse_beta_float)

    precision = 128
    oracle_bounds: tuple[Fraction, Fraction] | None = None
    oracle_projection: dict[str, Any] | None = None
    precision_history: list[int] = []
    while precision <= P_PRECISION_CEILING_BITS:
        precision_history.append(precision)
        oracle_bounds = arb_bounds(oracle_p_ball(df, statistic, precision))
        oracle_projection = strict_projection(oracle_bounds)
        if oracle_projection is not None:
            break
        precision *= 2
    if oracle_bounds is None or oracle_projection is None:
        raise RuntimeError(f"{case_id}: oracle did not isolate a binary64 cell")

    series_bounds = series_truth_interval(df, statistic, int(graph["iterations"]), str(graph["branch"]))
    if series_bounds[0] > oracle_bounds[1] or oracle_bounds[0] > series_bounds[1]:
        raise RuntimeError(f"{case_id}: positive-series remainder interval is disjoint from oracle")

    return {
        "case_id": case_id,
        "input": {
            "degrees_of_freedom": df,
            "test_statistic_binary64_hex": statistic_hex,
            "test_statistic_exact": canonical_fraction(statistic),
        },
        "inverse_beta_constant": {
            "definition": "one_over_beta_df_over_two_one_half",
            "arb_enclosure": interval_json(inverse_beta_bounds),
            "projection": inverse_beta_projection,
        },
        "binary64_graph_mirror": graph,
        "mathematical_truth": {
            "method": "arb_regularized_incomplete_beta_exact_binary64_input",
            "enclosure": interval_json(oracle_bounds),
            "projection": oracle_projection,
            "precision_history_bits": precision_history,
            "positive_series_truncation_enclosure": interval_json(series_bounds),
            "truncation_interval_overlaps_oracle": True,
            "graph_to_correctly_rounded_truth_ulp_distance": ordered_ulp_distance(
                str(graph["p_value_binary64_hex"]), str(oracle_projection["binary64_hex"])
            ),
        },
    }


def validate_cases_document(document: dict[str, Any]) -> list[dict[str, Any]]:
    if set(document) != {
        "status",
        "scope",
        "degrees_of_freedom_evaluation_target",
        "contiguous_evaluation_coverage_claimed",
        "supported_degrees_of_freedom_max",
        "runtime_support_claimed",
        "cases",
    }:
        raise RuntimeError("case manifest keys are incomplete or contain an undeclared item")
    if (
        document["status"] != "non_authoritative_candidate"
        or document["scope"] != SCOPE
        or document["degrees_of_freedom_evaluation_target"] != 200
        or document["contiguous_evaluation_coverage_claimed"] is not False
        or document["supported_degrees_of_freedom_max"] is not None
        or document["runtime_support_claimed"] is not False
    ):
        raise RuntimeError("case manifest overclaims maturity or runtime support")
    cases = document["cases"]
    if not isinstance(cases, list) or not cases:
        raise RuntimeError("case manifest has no cases")
    identifiers = [entry["case_id"] for entry in cases]
    if len(identifiers) != len(set(identifiers)):
        raise RuntimeError("case identifiers are not unique")
    return cases


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cases", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    arguments = parser.parse_args()
    commit = os.environ.get("NOMUE_GENERATOR_COMMIT", "")
    if COMMIT.fullmatch(commit) is None or commit == "0" * 40:
        raise SystemExit("NOMUE_GENERATOR_COMMIT must be the nonzero full checkout commit")
    if arguments.output.exists():
        raise SystemExit("output directory already exists")

    repository_root = Path(__file__).resolve().parents[2]
    source_paths = {
        "generator.py": Path(__file__).resolve(),
        "cases.json": arguments.cases.resolve(),
        "runtime-series-candidate.ts": repository_root
        / "tooling/src/spikes/paired-t-runtime-series-candidate.ts",
        "runtime-series-candidate.json": repository_root
        / "governance/drafts/release-2-candidate/numerical/runtime-series-candidate.json",
        "truth-error-support-candidate.ts": repository_root
        / "tooling/src/spikes/paired-t-truth-error-support-candidate.ts",
        "truth-error-support-candidate.json": repository_root
        / "governance/drafts/release-2-candidate/numerical/truth-error-support-closure-candidate.json",
    }
    cases_document = json.loads(arguments.cases.read_text())
    cases = validate_cases_document(cases_document)
    certified_cases = [certify_case(case) for case in cases]

    arguments.output.mkdir(parents=True)
    for output_name, source_path in source_paths.items():
        shutil.copyfile(source_path, arguments.output / output_name)

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
        "correct_rounding_runtime_claimed": False,
        "contiguous_evaluation_coverage_claimed": False,
        "supported_degrees_of_freedom_max": None,
        "case_count": len(certified_cases),
        "source_hashes": {name: sha256_file(path) for name, path in source_paths.items()},
        "environment_hash": sha256_file(arguments.output / "environment.json"),
        "cases": certified_cases,
    }
    (arguments.output / "runtime-series-evidence.json").write_bytes(canonical_json(evidence))

    manifest_paths = sorted(path.name for path in arguments.output.iterdir())
    manifest_lines = [
        f"{hashlib.sha256((arguments.output / name).read_bytes()).hexdigest()}  {name}"
        for name in manifest_paths
    ]
    (arguments.output / "MANIFEST.sha256").write_text("\n".join(manifest_lines) + "\n")


if __name__ == "__main__":
    main()
