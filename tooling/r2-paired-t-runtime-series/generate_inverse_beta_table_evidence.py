"""Generate a certified, non-authoritative inverse-beta table candidate.

The primary route uses Arb. A method-distinct exact-rational route uses the
df-to-df-plus-two recurrence, with an alternating Machin-series enclosure of pi
for odd degrees of freedom. The resulting table is evidence for evaluation only;
it does not select a runtime table or a supported df maximum.
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
from fractions import Fraction
from pathlib import Path
from typing import Any

try:
    import flint
    from flint import arb, ctx, fmpq
except ImportError as exc:  # pragma: no cover - exercised by the workflow contract
    raise SystemExit(
        "python-flint is required; install the pinned requirements before generating evidence"
    ) from exc


COMMIT = re.compile(r"^[0-9a-f]{40}$")
SCOPE = "contiguous_df_1_200_inverse_beta_table_evidence_not_protocol_support"
CANDIDATE_KEY = "paired-t-d5-runtime-inverse-beta-table-evaluation-1"
DF_MIN = 1
DF_MAX = 200
PRECISION_CEILING_BITS = 8192
MACHIN_TERMS = 96


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


def inverse_beta_ball(df: int, precision_bits: int) -> arb:
    ctx.prec = precision_bits
    half_df = arb(fmpq(df, 2))
    half = arb(fmpq(1, 2))
    return (half_df + half).gamma() / (half_df.gamma() * half.gamma())


def arctan_reciprocal_interval(reciprocal: int, terms: int) -> tuple[Fraction, Fraction]:
    total = Fraction(0)
    for index in range(terms):
        term = Fraction(1, (2 * index + 1) * reciprocal ** (2 * index + 1))
        total = total + term if index % 2 == 0 else total - term
    next_term = Fraction(1, (2 * terms + 1) * reciprocal ** (2 * terms + 1))
    remainder_endpoint = total + next_term if terms % 2 == 0 else total - next_term
    return min(total, remainder_endpoint), max(total, remainder_endpoint)


def machin_pi_interval() -> tuple[Fraction, Fraction]:
    atan_five = arctan_reciprocal_interval(5, MACHIN_TERMS)
    atan_239 = arctan_reciprocal_interval(239, MACHIN_TERMS)
    return (
        16 * atan_five[0] - 4 * atan_239[1],
        16 * atan_five[1] - 4 * atan_239[0],
    )


def recurrence_coefficients() -> dict[int, Fraction]:
    coefficients: dict[int, Fraction] = {1: Fraction(1), 2: Fraction(1, 2)}
    for df in range(3, DF_MAX + 1):
        coefficients[df] = coefficients[df - 2] * Fraction(df - 1, df - 2)
    return coefficients


def secondary_certificate(
    df: int, coefficient: Fraction, pi_bounds: tuple[Fraction, Fraction]
) -> tuple[dict[str, Any], tuple[Fraction, Fraction]]:
    if df % 2 == 0:
        bounds = (coefficient, coefficient)
        method = "exact_rational_recurrence_from_df2"
        pi_enclosure = None
        machin_terms = None
    else:
        bounds = (coefficient / pi_bounds[1], coefficient / pi_bounds[0])
        method = "machin_pi_interval_and_exact_rational_recurrence_from_df1"
        pi_enclosure = interval_json(pi_bounds)
        machin_terms = {"one_over_five": MACHIN_TERMS, "one_over_239": MACHIN_TERMS}
    return (
        {
            "method": method,
            "rational_coefficient": canonical_fraction(coefficient),
            "pi_enclosure": pi_enclosure,
            "machin_terms": machin_terms,
            "inverse_beta_enclosure": interval_json(bounds),
        },
        bounds,
    )


def certify_entry(
    df: int, coefficient: Fraction, pi_bounds: tuple[Fraction, Fraction]
) -> tuple[dict[str, Any], dict[str, Any]]:
    secondary, secondary_bounds = secondary_certificate(df, coefficient, pi_bounds)
    secondary_projection = strict_projection(secondary_bounds)
    if secondary_projection is None:
        raise RuntimeError(f"df={df}: secondary certificate did not isolate a binary64 cell")

    precision = 128
    precision_history: list[int] = []
    primary_bounds: tuple[Fraction, Fraction] | None = None
    primary_projection: dict[str, Any] | None = None
    while precision <= PRECISION_CEILING_BITS:
        precision_history.append(precision)
        primary_bounds = arb_bounds(inverse_beta_ball(df, precision))
        primary_projection = strict_projection(primary_bounds)
        if (
            primary_projection is not None
            and primary_projection["binary64_hex"] == secondary_projection["binary64_hex"]
            and primary_bounds[0] <= secondary_bounds[0]
            and secondary_bounds[1] <= primary_bounds[1]
        ):
            break
        precision *= 2
    if primary_bounds is None or primary_projection is None:
        raise RuntimeError(f"df={df}: primary certificate did not isolate the secondary cell")

    table_entry = {
        "degrees_of_freedom": df,
        "inverse_beta_binary64_hex": primary_projection["binary64_hex"],
    }
    evidence_entry = {
        "degrees_of_freedom": df,
        "definition": "one_over_beta_df_over_two_one_half",
        "arb_primary": {
            "method": "arb_gamma_ratio_exact_integer_df",
            "enclosure": interval_json(primary_bounds),
            "precision_history_bits": precision_history,
        },
        "exact_secondary": secondary,
        "projection": primary_projection,
        "secondary_contained_in_primary": True,
    }
    return table_entry, evidence_entry


def main() -> None:
    parser = argparse.ArgumentParser()
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
        "runtime-inverse-beta-table-candidate.json": repository_root
        / "governance/drafts/release-2-candidate/numerical/runtime-inverse-beta-table-candidate.json",
    }
    pi_bounds = machin_pi_interval()
    coefficients = recurrence_coefficients()
    table_entries: list[dict[str, Any]] = []
    evidence_entries: list[dict[str, Any]] = []
    for df in range(DF_MIN, DF_MAX + 1):
        table_entry, evidence_entry = certify_entry(df, coefficients[df], pi_bounds)
        table_entries.append(table_entry)
        evidence_entries.append(evidence_entry)

    arguments.output.mkdir(parents=True)
    for output_name, source_path in source_paths.items():
        shutil.copyfile(source_path, arguments.output / output_name)

    table = {
        "status": "non_authoritative_candidate",
        "scope": SCOPE,
        "candidate_key": CANDIDATE_KEY,
        "target_format": "binary64_round_ties_to_even",
        "degrees_of_freedom_minimum": DF_MIN,
        "degrees_of_freedom_maximum_evaluation_target": DF_MAX,
        "entry_count": len(table_entries),
        "contiguous_evidence_coverage_claimed": True,
        "supported_degrees_of_freedom_max": None,
        "runtime_support_claimed": False,
        "final_table_selected": False,
        "entries": table_entries,
    }
    table_path = arguments.output / "runtime-inverse-beta-table.json"
    table_path.write_bytes(canonical_json(table))

    environment = {
        "status": "non_authoritative_candidate",
        "python": platform.python_version(),
        "python_flint": flint.__version__,
        "flint": flint.__FLINT_VERSION__,
        "platform": platform.platform(),
    }
    environment_path = arguments.output / "environment.json"
    environment_path.write_bytes(canonical_json(environment))

    evidence = {
        "status": "non_authoritative_candidate",
        "scope": SCOPE,
        "generator_commit": commit,
        "runtime_support_claimed": False,
        "final_table_selected": False,
        "supported_degrees_of_freedom_max": None,
        "entry_count": len(evidence_entries),
        "table_content_hash": sha256_file(table_path),
        "source_hashes": {name: sha256_file(path) for name, path in source_paths.items()},
        "environment_hash": sha256_file(environment_path),
        "entries": evidence_entries,
    }
    (arguments.output / "inverse-beta-table-evidence.json").write_bytes(canonical_json(evidence))

    manifest_paths = sorted(path.name for path in arguments.output.iterdir())
    manifest_lines = [
        f"{hashlib.sha256((arguments.output / name).read_bytes()).hexdigest()}  {name}"
        for name in manifest_paths
    ]
    (arguments.output / "MANIFEST.sha256").write_text("\n".join(manifest_lines) + "\n")


if __name__ == "__main__":
    main()
