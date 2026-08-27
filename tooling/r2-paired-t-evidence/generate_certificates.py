"""Generate non-authoritative Release 2 paired-t numerical evidence.

The generator deliberately produces a pilot certificate corpus, not a complete
R2-D5 decision artifact. Student-t inputs are lifted from their exact binary64
bit patterns to rational values before Arb sees them. Primary enclosures use
regularized incomplete beta. The method-distinct secondary path integrates the
Student-t density on a finite interval and adds an analytic tail bound.

No SciPy, R, Boost, mpmath, reference-kernel output, tolerance, supported-domain
bound, or Public Check identifier enters the generated certificates.
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
    from flint import acb, arb, ctx, fmpq
except ImportError as exc:  # pragma: no cover - exercised by the workflow contract
    raise SystemExit(
        "python-flint is required; install the pinned requirements before running evidence"
    ) from exc


COMMIT = re.compile(r"^[0-9a-f]{40}$")
SHA256_PREFIX = "sha256:"
INITIAL_PRECISION_BITS = 96
P_PRECISION_CEILING_BITS = 8192
CRITICAL_PRECISION_CEILING_BITS = 4096
SECONDARY_PRECISION_BITS = 384


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
    return {
        "lower": canonical_fraction(bounds[0]),
        "upper": canonical_fraction(bounds[1]),
    }


def arb_from_fraction(value: Fraction) -> arb:
    return arb(fmpq(value.numerator, value.denominator))


def acb_from_fraction(value: Fraction) -> acb:
    return acb(fmpq(value.numerator, value.denominator))


def float_from_hex(value: str) -> float:
    if not re.fullmatch(r"[0-9a-f]{16}", value):
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
    bits = int.from_bytes(struct.pack(">d", value), "big")
    negative = (bits >> 63) != 0
    exponent_bits = (bits >> 52) & 0x7FF
    fraction_bits = bits & ((1 << 52) - 1)
    if exponent_bits == 0 and fraction_bits == 0:
        return Fraction(0, 1)
    if exponent_bits == 0:
        significand = fraction_bits
        exponent = -1074
    else:
        significand = (1 << 52) | fraction_bits
        exponent = exponent_bits - 1023 - 52
    numerator = -significand if negative else significand
    if exponent >= 0:
        return Fraction(numerator << exponent, 1)
    return Fraction(numerator, 1 << (-exponent))


def adjacent_float(value: float, direction: str) -> float:
    if not math.isfinite(value):
        raise ValueError("adjacent_float requires a finite value")
    if direction not in {"down", "up"}:
        raise ValueError("direction must be down or up")
    bits = int.from_bytes(struct.pack(">d", value), "big")
    if value == 0.0:
        adjacent_bits = 0x8000000000000001 if direction == "down" else 1
    elif value > 0:
        adjacent_bits = bits - 1 if direction == "down" else bits + 1
    else:
        adjacent_bits = bits + 1 if direction == "down" else bits - 1
    return struct.unpack(">d", adjacent_bits.to_bytes(8, "big"))[0]


def rounding_cell(value: float) -> tuple[Fraction, Fraction]:
    exact = float_to_fraction(value)
    lower = (float_to_fraction(adjacent_float(value, "down")) + exact) / 2
    upper = (exact + float_to_fraction(adjacent_float(value, "up"))) / 2
    return lower, upper


def projection_class(value: float) -> str:
    if value == 0.0:
        return "zero"
    if abs(value) < 2.0**-1022:
        return "subnormal"
    return "normal"


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
        "target_format": "binary64",
        "rounding_mode": "roundTiesToEven",
        "projected_binary64_hex": float_to_hex(projected_lower),
        "cell_lower": canonical_fraction(cell_lower),
        "cell_upper": canonical_fraction(cell_upper),
        "strict_containment": True,
        "projection_class": projection_class(projected_lower),
    }


def exact_x(df: int, statistic: Fraction) -> Fraction:
    return Fraction(df, 1) / (Fraction(df, 1) + statistic * statistic)


def primary_p_ball(df: int, statistic: Fraction, precision_bits: int) -> tuple[str, arb]:
    ctx.prec = precision_bits
    x = exact_x(df, statistic)
    if x > Fraction(1, 2):
        complement = Fraction(1, 1) - x
        small_tail = arb_from_fraction(complement).beta_lower(
            fmpq(1, 2), fmpq(df, 2), regularized=True
        )
        return "complementary-lower", 1 - small_tail
    return (
        "lower",
        arb_from_fraction(x).beta_lower(fmpq(df, 2), fmpq(1, 2), regularized=True),
    )


def p_closed_form_ball(df: int, statistic: Fraction, precision_bits: int) -> tuple[str, arb] | None:
    ctx.prec = precision_bits
    absolute = arb_from_fraction(abs(statistic))
    if df == 1:
        if abs(statistic) > 1:
            value = 2 * (1 / absolute).atan() / arb.pi()
        else:
            value = 1 - 2 * absolute.atan() / arb.pi()
        return "df1-cauchy-tail", value
    if df == 2:
        root = (arb(2) + absolute * absolute).sqrt()
        if abs(statistic) > 1:
            value = 2 / (root * (root + absolute))
        else:
            value = 1 - absolute / root
        return "df2-closed-form-tail", value
    return None


def secondary_p_interval(
    df: int, statistic: Fraction, precision_bits: int
) -> tuple[tuple[Fraction, Fraction], dict[str, Any]]:
    """Enclose two-sided p by finite rigorous quadrature plus a tail bound."""

    if statistic == 0:
        return (Fraction(1), Fraction(1)), {
            "finite_interval": ["0/1", "0/1"],
            "tail_bound_upper": "0/1",
            "imaginary_part_contains_zero": True,
        }

    ctx.prec = precision_bits
    lower_limit = abs(statistic)
    upper_limit = max(Fraction(10, 1), lower_limit * 100 + 10)
    df_real = arb(df)
    normalizer = ((df_real + 1) / 2).gamma() / (
        (df_real * arb.pi()).sqrt() * (df_real / 2).gamma()
    )
    normalizer_complex = acb(normalizer)
    df_complex = acb(df)
    exponent = acb(fmpq(-(df + 1), 2))

    def density(value: acb, analytic: bool) -> acb:
        base = 1 + value * value / df_complex
        return normalizer_complex * (exponent * base.log(analytic=analytic)).exp()

    integral = acb.integral(
        density,
        acb_from_fraction(lower_limit),
        acb_from_fraction(upper_limit),
        rel_tol=2.0 ** (-(precision_bits - 24)),
        abs_tol=2.0 ** (-(precision_bits - 24)),
    )
    if not integral.imag.contains(0):
        raise RuntimeError("quadrature imaginary enclosure does not contain zero")
    integral_lower, integral_upper = arb_bounds(integral.real)

    tail = (
        2
        * normalizer
        * ((arb(fmpq(df - 1, 2)) * arb(df).log()).exp())
        * (arb_from_fraction(upper_limit) ** (-df))
    )
    _, tail_upper = arb_bounds(tail)
    result_lower = max(Fraction(0), 2 * integral_lower)
    result_upper = min(Fraction(1), 2 * integral_upper + tail_upper)
    if result_lower > result_upper:
        raise RuntimeError("secondary quadrature produced an empty probability enclosure")
    return (result_lower, result_upper), {
        "finite_interval": [
            canonical_fraction(lower_limit),
            canonical_fraction(upper_limit),
        ],
        "finite_integral_real_enclosure": interval_json((integral_lower, integral_upper)),
        "tail_bound_upper": canonical_fraction(tail_upper),
        "imaginary_part_contains_zero": True,
        "precision_bits": precision_bits,
    }


def overlap(first: tuple[Fraction, Fraction], second: tuple[Fraction, Fraction]) -> bool:
    return first[0] <= second[1] and second[0] <= first[1]


def certify_p_case(case: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    df = int(case["degrees_of_freedom"])
    statistic_hex = str(case["test_statistic_binary64_hex"])
    statistic = float_to_fraction(float_from_hex(statistic_hex))
    x = exact_x(df, statistic)
    history: list[int] = []
    precision = INITIAL_PRECISION_BITS
    primary_bounds: tuple[Fraction, Fraction] | None = None
    projection: dict[str, Any] | None = None
    branch = ""
    while precision <= P_PRECISION_CEILING_BITS:
        history.append(precision)
        branch, primary_ball = primary_p_ball(df, statistic, precision)
        primary_bounds = arb_bounds(primary_ball)
        projection = strict_projection(primary_bounds)
        if projection is not None:
            break
        precision *= 2
    if primary_bounds is None or projection is None:
        raise RuntimeError(f"{case['case_id']}: primary path did not isolate a binary64 cell")
    if projection["projected_binary64_hex"] == "0000000000000000":
        raise RuntimeError(f"{case['case_id']}: a positive-p certificate cannot project to zero")

    secondary_bounds, secondary_trace = secondary_p_interval(
        df, statistic, SECONDARY_PRECISION_BITS
    )
    secondary_overlap = overlap(primary_bounds, secondary_bounds)
    if not secondary_overlap:
        raise RuntimeError(f"{case['case_id']}: primary and secondary enclosures are disjoint")

    closed = p_closed_form_ball(df, statistic, SECONDARY_PRECISION_BITS)
    closed_certificate: dict[str, Any] | None = None
    closed_trace: dict[str, Any] | None = None
    if closed is not None:
        closed_method, closed_ball = closed
        closed_bounds = arb_bounds(closed_ball)
        closed_overlap = overlap(primary_bounds, closed_bounds)
        if not closed_overlap:
            raise RuntimeError(f"{case['case_id']}: closed form is disjoint from primary")
        closed_certificate = {
            "method": closed_method,
            "enclosure": interval_json(closed_bounds),
            "overlap_with_primary": True,
        }
        closed_trace = {
            "method": closed_method,
            "enclosure": interval_json(closed_bounds),
            "precision_bits": SECONDARY_PRECISION_BITS,
        }

    certificate = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-p-value-certificate",
        "result": "certified",
        "input": {
            "degrees_of_freedom": df,
            "test_statistic_binary64_hex": statistic_hex,
            "exact_x_numerator": str(x.numerator),
            "exact_x_denominator": str(x.denominator),
        },
        "primary": {
            "method": "arb-regularized-incomplete-beta",
            "branch": branch,
            "exact_rational_input": True,
            "escalation": {
                "precision_bits_history": history,
                "precision_bits_final": history[-1],
                "precision_bits_ceiling": P_PRECISION_CEILING_BITS,
                "stopping_predicate": "strict-binary64-rounding-cell-containment",
            },
            "enclosure": interval_json(primary_bounds),
        },
        "secondary": {
            "method": "rigorous-density-quadrature-with-analytic-tail-bound",
            "enclosure": interval_json(secondary_bounds),
            "overlap_with_primary": True,
        },
        "closed_form": closed_certificate,
        "projection": {key: value for key, value in projection.items() if key != "projection_class"},
    }
    trace = {
        "case_id": case["case_id"],
        "input": certificate["input"],
        "primary": certificate["primary"],
        "secondary": {
            **secondary_trace,
            "enclosure": interval_json(secondary_bounds),
            "overlap_with_primary": secondary_overlap,
        },
        "closed_form": closed_trace,
        "projection": projection,
    }
    return certificate, trace


def primary_tail_interval(df: int, point: Fraction, precision_bits: int) -> tuple[Fraction, Fraction]:
    _, value = primary_p_ball(df, point, precision_bits)
    return arb_bounds(value)


def critical_closed_form(df: int, precision_bits: int) -> tuple[str, tuple[Fraction, Fraction]] | None:
    ctx.prec = precision_bits
    if df == 1:
        value = arb(fmpq(1, 40)).cot_pi()
        return "df1-cot-pi", arb_bounds(value)
    if df == 2:
        value = arb(fmpq(19, 20)) / arb(fmpq(39, 800)).sqrt()
        return "df2-algebraic-sqrt", arb_bounds(value)
    return None


def certify_critical_case(case: dict[str, Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    df = int(case["degrees_of_freedom"])
    candidate_hex = str(case["candidate_binary64_hex"])
    candidate = float_from_hex(candidate_hex)
    if candidate <= 0:
        raise RuntimeError(f"{case['case_id']}: critical candidate must be positive")
    candidate_fraction = float_to_fraction(candidate)
    cell_lower, cell_upper = rounding_cell(candidate)
    target = Fraction(1, 20)

    history: list[int] = []
    precision = 192
    lower_tail: tuple[Fraction, Fraction] | None = None
    upper_tail: tuple[Fraction, Fraction] | None = None
    while precision <= CRITICAL_PRECISION_CEILING_BITS:
        history.append(precision)
        lower_tail = primary_tail_interval(df, cell_lower, precision)
        upper_tail = primary_tail_interval(df, cell_upper, precision)
        if lower_tail[0] > target and upper_tail[1] < target:
            break
        precision *= 2
    if (
        lower_tail is None
        or upper_tail is None
        or lower_tail[0] <= target
        or upper_tail[1] >= target
    ):
        raise RuntimeError(f"{case['case_id']}: primary midpoint bracket did not close")

    inset = (cell_upper - cell_lower) / 1024
    secondary_lower_point = cell_lower + inset
    secondary_upper_point = cell_upper - inset
    secondary_precision = SECONDARY_PRECISION_BITS
    secondary_lower_tail: tuple[Fraction, Fraction] | None = None
    secondary_upper_tail: tuple[Fraction, Fraction] | None = None
    secondary_lower_trace: dict[str, Any] | None = None
    secondary_upper_trace: dict[str, Any] | None = None
    while secondary_precision <= CRITICAL_PRECISION_CEILING_BITS:
        secondary_lower_tail, secondary_lower_trace = secondary_p_interval(
            df, secondary_lower_point, secondary_precision
        )
        secondary_upper_tail, secondary_upper_trace = secondary_p_interval(
            df, secondary_upper_point, secondary_precision
        )
        if secondary_lower_tail[0] > target and secondary_upper_tail[1] < target:
            break
        secondary_precision *= 2
    if (
        secondary_lower_tail is None
        or secondary_upper_tail is None
        or secondary_lower_tail[0] <= target
        or secondary_upper_tail[1] >= target
    ):
        raise RuntimeError(f"{case['case_id']}: secondary quadrature bracket did not close")

    quantile_bounds = (secondary_lower_point, secondary_upper_point)
    projection = {
        "target_format": "binary64",
        "rounding_mode": "roundTiesToEven",
        "projected_binary64_hex": candidate_hex,
        "cell_lower": canonical_fraction(cell_lower),
        "cell_upper": canonical_fraction(cell_upper),
        "strict_containment": True,
    }
    closed = critical_closed_form(df, SECONDARY_PRECISION_BITS)
    closed_certificate: dict[str, Any] | None = None
    closed_trace: dict[str, Any] | None = None
    if closed is not None:
        closed_method, closed_bounds = closed
        if not (cell_lower < closed_bounds[0] and closed_bounds[1] < cell_upper):
            raise RuntimeError(f"{case['case_id']}: critical closed form leaves the rounding cell")
        closed_certificate = {
            "method": closed_method,
            "quantile_enclosure": interval_json(closed_bounds),
            "projects_to_same_candidate": True,
        }
        closed_trace = {
            "method": closed_method,
            "quantile_enclosure": interval_json(closed_bounds),
            "precision_bits": SECONDARY_PRECISION_BITS,
        }

    certificate = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-fixed-95-critical-value-certificate",
        "result": "certified",
        "input": {
            "degrees_of_freedom": df,
            "two_sided_tail_target": "1/20",
            "candidate_binary64_hex": candidate_hex,
        },
        "primary": {
            "method": "arb-regularized-incomplete-beta-midpoint-bracketing",
            "exact_rational_input": True,
            "escalation": {
                "precision_bits_history": history,
                "precision_bits_final": history[-1],
                "precision_bits_ceiling": CRITICAL_PRECISION_CEILING_BITS,
                "stopping_predicate": "strict-binary64-rounding-cell-containment",
            },
            "tail_at_cell_lower": interval_json(lower_tail),
            "tail_at_cell_upper": interval_json(upper_tail),
        },
        "secondary": {
            "method": "rigorous-density-quadrature",
            "quantile_enclosure": interval_json(quantile_bounds),
            "projects_to_same_candidate": True,
        },
        "closed_form": closed_certificate,
        "projection": projection,
    }
    trace = {
        "case_id": case["case_id"],
        "input": certificate["input"],
        "primary": certificate["primary"],
        "secondary": {
            "precision_bits": secondary_precision,
            "lower_test_point": canonical_fraction(secondary_lower_point),
            "upper_test_point": canonical_fraction(secondary_upper_point),
            "tail_at_lower_test_point": interval_json(secondary_lower_tail),
            "tail_at_upper_test_point": interval_json(secondary_upper_tail),
            "lower_trace": secondary_lower_trace,
            "upper_trace": secondary_upper_trace,
            "quantile_enclosure": interval_json(quantile_bounds),
        },
        "closed_form": closed_trace,
        "projection": projection,
        "candidate_exact": canonical_fraction(candidate_fraction),
    }
    return certificate, trace


def boundary_probe(case: dict[str, Any]) -> dict[str, Any]:
    df = int(case["degrees_of_freedom"])
    statistic_hex = str(case["test_statistic_binary64_hex"])
    statistic = float_to_fraction(float_from_hex(statistic_hex))
    precision = INITIAL_PRECISION_BITS
    history: list[int] = []
    projection: dict[str, Any] | None = None
    primary_bounds: tuple[Fraction, Fraction] | None = None
    branch = ""
    while precision <= P_PRECISION_CEILING_BITS:
        history.append(precision)
        branch, ball = primary_p_ball(df, statistic, precision)
        primary_bounds = arb_bounds(ball)
        projection = strict_projection(primary_bounds)
        if projection is not None:
            break
        precision *= 2
    if primary_bounds is None or projection is None:
        raise RuntimeError(f"{case['case_id']}: boundary projection did not close")
    expected_class = str(case["expected_projection_class"])
    if projection["projection_class"] != expected_class:
        raise RuntimeError(
            f"{case['case_id']}: expected {expected_class}, got {projection['projection_class']}"
        )
    expected_hex = case.get("expected_projected_binary64_hex")
    if expected_hex is not None and projection["projected_binary64_hex"] != expected_hex:
        raise RuntimeError(
            f"{case['case_id']}: expected projection {expected_hex}, "
            f"got {projection['projected_binary64_hex']}"
        )
    closed = p_closed_form_ball(df, statistic, SECONDARY_PRECISION_BITS)
    closed_trace = None
    if closed is not None:
        method, closed_ball = closed
        closed_trace = {
            "method": method,
            "enclosure": interval_json(arb_bounds(closed_ball)),
            "precision_bits": SECONDARY_PRECISION_BITS,
        }
    return {
        "case_id": case["case_id"],
        "input": {
            "degrees_of_freedom": df,
            "test_statistic_binary64_hex": statistic_hex,
            "exact_x": canonical_fraction(exact_x(df, statistic)),
        },
        "primary": {
            "method": "arb-regularized-incomplete-beta",
            "branch": branch,
            "precision_bits_history": history,
            "enclosure": interval_json(primary_bounds),
        },
        "closed_form": closed_trace,
        "projection": projection,
        "certificate_disposition": (
            "positive_binary64_projection_requires_secondary_evidence"
            if projection["projected_binary64_hex"] != "0000000000000000"
            else "positive_mathematical_tail_not_representable_as_positive_binary64"
        ),
    }


def json_bytes(value: Any) -> bytes:
    return (json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + "\n").encode()


def write_json(path: Path, value: Any) -> None:
    path.write_bytes(json_bytes(value))


def sha256_bytes(value: bytes) -> str:
    return hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def prefixed_hash(path: Path) -> str:
    return SHA256_PREFIX + sha256_file(path)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--cases", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument(
        "--generator-commit",
        default=os.environ.get("NOMUE_GENERATOR_COMMIT", ""),
    )
    args = parser.parse_args()
    if not COMMIT.fullmatch(args.generator_commit) or set(args.generator_commit) == {"0"}:
        raise SystemExit("--generator-commit must be a nonzero full lowercase 40-hex Git SHA")

    source_path = Path(__file__).resolve()
    requirements_path = source_path.with_name("requirements.txt")
    cases_path = args.cases.resolve()
    cases = json.loads(cases_path.read_text())
    if cases.get("status") != "non_authoritative_candidate":
        raise SystemExit("case manifest must remain non-authoritative")

    output = args.output.resolve()
    if output.exists():
        raise SystemExit(f"refusing to overwrite existing output directory: {output}")
    output.mkdir(parents=True)
    shutil.copyfile(source_path, output / "generator.py")
    shutil.copyfile(requirements_path, output / "requirements.txt")
    shutil.copyfile(cases_path, output / "cases.json")

    environment = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-oracle-environment",
        "generator_commit": args.generator_commit,
        "python": platform.python_version(),
        "python_implementation": platform.python_implementation(),
        "python_flint": flint.__version__,
        "flint": flint.__FLINT_VERSION__,
        "platform_system": platform.system(),
        "platform_machine": platform.machine(),
        "requirements_sha256": prefixed_hash(output / "requirements.txt"),
        "arb_threads": 1,
    }
    ctx.threads = 1
    write_json(output / "environment.json", environment)

    p_certificates: list[dict[str, Any]] = []
    p_traces: list[dict[str, Any]] = []
    for case in cases["p_value_certificates"]:
        certificate, trace = certify_p_case(case)
        p_certificates.append({"case_id": case["case_id"], "certificate": certificate})
        p_traces.append(trace)

    critical_certificates: list[dict[str, Any]] = []
    critical_traces: list[dict[str, Any]] = []
    for case in cases["fixed_95_critical_value_certificates"]:
        certificate, trace = certify_critical_case(case)
        critical_certificates.append({"case_id": case["case_id"], "certificate": certificate})
        critical_traces.append(trace)

    boundary_traces = [boundary_probe(case) for case in cases["boundary_probes"]]
    raw = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-oracle-source-output",
        "scope": "pilot_evidence_only_not_r2_d5_closure",
        "p_value_traces": p_traces,
        "fixed_95_critical_value_traces": critical_traces,
        "boundary_probes": boundary_traces,
    }
    write_json(output / "raw-oracle-output.json", raw)

    provenance = {
        "generator_commit": args.generator_commit,
        "generator_sha256": prefixed_hash(output / "generator.py"),
        "environment_sha256": prefixed_hash(output / "environment.json"),
        "source_output_sha256": prefixed_hash(output / "raw-oracle-output.json"),
    }
    for entry in p_certificates + critical_certificates:
        entry["certificate"]["provenance"] = provenance

    certificates = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-certificate-pilot-bundle",
        "scope": "pilot_evidence_only_not_r2_d5_closure",
        "generator_commit": args.generator_commit,
        "p_value_certificates": p_certificates,
        "fixed_95_critical_value_certificates": critical_certificates,
        "boundary_probe_case_ids": [case["case_id"] for case in cases["boundary_probes"]],
    }
    write_json(output / "certificates.json", certificates)

    manifested = [
        "cases.json",
        "certificates.json",
        "environment.json",
        "generator.py",
        "raw-oracle-output.json",
        "requirements.txt",
    ]
    manifest = "".join(f"{sha256_file(output / name)}  {name}\n" for name in manifested)
    (output / "MANIFEST.sha256").write_text(manifest)
    print(
        f"generated {len(p_certificates)} p-value certificates, "
        f"{len(critical_certificates)} critical-value certificates, and "
        f"{len(boundary_traces)} boundary probes in {output}"
    )


if __name__ == "__main__":
    main()
