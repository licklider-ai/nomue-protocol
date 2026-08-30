"""Generate contiguous, non-authoritative fixed-95 critical-value evidence.

The candidate cell for every integer df from 1 through 200 is found by a
monotone search over binary64 rounding-cell upper midpoints. Arb proves every
search predicate. The existing paired-t certificate core then independently
certifies the selected cell with forward-probability midpoint bracketing and
either rigorous density quadrature or the executed low-df closed form.

This is evidence coverage only. It does not select a final table, a supported
df maximum, a confidence-interval contract, or runtime support.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import os
import platform
import re
import shutil
import struct
from fractions import Fraction
from pathlib import Path
from types import ModuleType
from typing import Any

try:
    import flint
    from flint import ctx
except ImportError as exc:  # pragma: no cover - exercised by the workflow contract
    raise SystemExit(
        "python-flint is required; install the pinned requirements before generating evidence"
    ) from exc


COMMIT = re.compile(r"^[0-9a-f]{40}$")
SCOPE = "contiguous_df_1_200_fixed_95_critical_value_table_evidence_not_protocol_support"
CANDIDATE_KEY = "paired-t-d5-fixed-95-critical-value-table-evaluation-1"
DF_MIN = 1
DF_MAX = 200
SEARCH_LOWER = 1.0
SEARCH_UPPER = 16.0
SEARCH_INITIAL_PRECISION_BITS = 192
SEARCH_PRECISION_CEILING_BITS = 4096
TARGET = Fraction(1, 20)


def load_certificate_core(path: Path) -> ModuleType:
    specification = importlib.util.spec_from_file_location(
        "nomue_paired_t_certificate_core", path
    )
    if specification is None or specification.loader is None:
        raise SystemExit("unable to load the paired-t certificate core")
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


def float_to_bits(value: float) -> int:
    return int.from_bytes(struct.pack(">d", value), "big")


def bits_to_float(bits: int) -> float:
    return struct.unpack(">d", bits.to_bytes(8, "big"))[0]


def bits_to_hex(bits: int) -> str:
    return f"{bits:016x}"


def upper_midpoint_is_above_quantile(
    core: ModuleType, df: int, bits: int
) -> tuple[bool, int]:
    point = core.rounding_cell(bits_to_float(bits))[1]
    precision = SEARCH_INITIAL_PRECISION_BITS
    while precision <= SEARCH_PRECISION_CEILING_BITS:
        lower, upper = core.primary_tail_interval(df, point, precision)
        if upper < TARGET:
            return True, precision
        if lower > TARGET:
            return False, precision
        precision *= 2
    raise RuntimeError(f"df={df}: binary64-cell search predicate did not resolve")


def find_candidate(core: ModuleType, df: int) -> tuple[str, dict[str, Any]]:
    lower_bits = float_to_bits(SEARCH_LOWER)
    upper_bits = float_to_bits(SEARCH_UPPER)
    lower_side, lower_precision = upper_midpoint_is_above_quantile(
        core, df, lower_bits
    )
    upper_side, upper_precision = upper_midpoint_is_above_quantile(
        core, df, upper_bits
    )
    if lower_side or not upper_side:
        raise RuntimeError(f"df={df}: initial binary64 search interval is not a bracket")

    evaluations = 2
    maximum_precision = max(lower_precision, upper_precision)
    steps = 0
    while lower_bits + 1 < upper_bits:
        midpoint_bits = (lower_bits + upper_bits) // 2
        side, precision = upper_midpoint_is_above_quantile(core, df, midpoint_bits)
        evaluations += 1
        maximum_precision = max(maximum_precision, precision)
        steps += 1
        if side:
            upper_bits = midpoint_bits
        else:
            lower_bits = midpoint_bits

    candidate_side, candidate_precision = upper_midpoint_is_above_quantile(
        core, df, upper_bits
    )
    predecessor_side, predecessor_precision = upper_midpoint_is_above_quantile(
        core, df, upper_bits - 1
    )
    evaluations += 2
    maximum_precision = max(
        maximum_precision, candidate_precision, predecessor_precision
    )
    if not candidate_side or predecessor_side:
        raise RuntimeError(f"df={df}: final binary64 candidate is not the first true cell")

    return bits_to_hex(upper_bits), {
        "method": "monotone_binary64_cell_upper_midpoint_search",
        "initial_lower_binary64_hex": bits_to_hex(float_to_bits(SEARCH_LOWER)),
        "initial_upper_binary64_hex": bits_to_hex(float_to_bits(SEARCH_UPPER)),
        "final_predecessor_binary64_hex": bits_to_hex(upper_bits - 1),
        "final_candidate_binary64_hex": bits_to_hex(upper_bits),
        "binary_search_steps": steps,
        "predicate_evaluations": evaluations,
        "predicate_initial_precision_bits": SEARCH_INITIAL_PRECISION_BITS,
        "predicate_maximum_precision_bits": maximum_precision,
        "predicate_precision_ceiling_bits": SEARCH_PRECISION_CEILING_BITS,
        "first_true_cell_proved": True,
    }


def checkpoint_expected() -> dict[str, Any]:
    return {
        "status": "non_authoritative_candidate",
        "issuance": "unissued",
        "review_issue": "https://github.com/licklider-ai/nomue-protocol/issues/25",
        "candidate_key": CANDIDATE_KEY,
        "selection_state": "evidence_evaluation_only_not_table_selected",
        "runtime_support_enabled": False,
        "final_table_selected": False,
        "degrees_of_freedom_evaluation": {
            "minimum": DF_MIN,
            "maximum_target": DF_MAX,
            "entry_count": DF_MAX,
            "contiguous_evidence_coverage_claimed": True,
            "supported_maximum": None,
        },
        "target": {
            "confidence_level": "19/20",
            "two_sided_tail_probability": "1/20",
            "target_format": "binary64",
            "rounding_mode": "roundTiesToEven",
        },
        "evidence_surface": {
            "generator": "tooling/r2-paired-t-evidence/generate_critical_value_table_evidence.py",
            "certificate_core": "tooling/r2-paired-t-evidence/generate_certificates.py",
            "validator": "tooling/src/spikes/validate-paired-t-critical-value-table-evidence.ts",
            "mutation_probe": "tooling/src/spikes/probe-paired-t-critical-value-table-evidence.ts",
            "table_content_hash": None,
            "independent_review_complete": False,
        },
        "held_decisions": [
            "final_table_selection",
            "final_table_content_hash",
            "final_supported_degrees_of_freedom_maximum",
            "confidence_interval_endpoint_truth_ledger",
            "supported_platform_matrix",
            "runtime_support_activation",
        ],
        "prohibited_claims": [
            "supported_fixed_95_critical_value_table",
            "supported_df_max",
            "complete_confidence_interval_truth_bound",
            "authoritative_public_check_or_bundle",
            "r2_d5_complete",
        ],
    }


def sha256_bytes(value: bytes) -> str:
    return "sha256:" + hashlib.sha256(value).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def table_content_bytes(entries: list[dict[str, Any]]) -> bytes:
    lines = ["nomue-paired-t-fixed-95-table-v1", "two-sided-tail-target=1/20"]
    lines.extend(
        f"df={entry['degrees_of_freedom']};binary64={entry['critical_value_binary64_hex']}"
        for entry in entries
    )
    return ("\n".join(lines) + "\n").encode()


def research_seed(path: Path) -> dict[int, str]:
    value = json.loads(path.read_text())
    return {
        int(entry["degrees_of_freedom"]): str(entry["candidate_binary64_hex"])
        for entry in value["fixed_95_critical_value_certificates"]
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, required=True)
    arguments = parser.parse_args()
    commit = os.environ.get("NOMUE_GENERATOR_COMMIT", "")
    if COMMIT.fullmatch(commit) is None or commit == "0" * 40:
        raise SystemExit("NOMUE_GENERATOR_COMMIT must be the nonzero full checkout commit")
    if arguments.output.exists():
        raise SystemExit("output directory already exists")

    source_path = Path(__file__).resolve()
    source_directory = source_path.parent
    repository_root = source_path.parents[2]
    core_path = source_directory / "generate_certificates.py"
    requirements_path = source_directory / "requirements.txt"
    seed_path = source_directory / "cases.json"
    checkpoint_path = (
        repository_root
        / "governance/drafts/release-2-candidate/numerical/fixed-95-critical-value-table-candidate.json"
    )
    checkpoint = json.loads(checkpoint_path.read_text())
    if checkpoint != checkpoint_expected():
        raise SystemExit("critical-value table checkpoint differs from the closed candidate surface")

    source_paths = {
        "generator.py": source_path,
        "generate_certificates.py": core_path,
        "requirements.txt": requirements_path,
        "cases.json": seed_path,
        "fixed-95-critical-value-table-candidate.json": checkpoint_path,
    }
    core = load_certificate_core(core_path)
    seed = research_seed(seed_path)
    if set(seed) != {1, 2, 4, 5, 6, 10, 30, 100, 1000}:
        raise SystemExit("research seed does not contain the closed nine-cell df set")
    ctx.threads = 1

    table_entries: list[dict[str, Any]] = []
    certificate_entries: list[dict[str, Any]] = []
    raw_entries: list[dict[str, Any]] = []
    for df in range(DF_MIN, DF_MAX + 1):
        candidate_hex, search = find_candidate(core, df)
        if df in seed and seed[df] != candidate_hex:
            raise RuntimeError(
                f"df={df}: contiguous search disagrees with the committed research seed"
            )
        case_id = f"critical-df{df}"
        certificate, trace = core.certify_critical_case(
            {
                "case_id": case_id,
                "degrees_of_freedom": df,
                "candidate_binary64_hex": candidate_hex,
            }
        )
        table_entries.append(
            {
                "degrees_of_freedom": df,
                "critical_value_binary64_hex": candidate_hex,
            }
        )
        certificate_entries.append({"case_id": case_id, "certificate": certificate})
        raw_entries.append(
            {
                "case_id": case_id,
                "degrees_of_freedom": df,
                "candidate_binary64_hex": candidate_hex,
                "search": search,
                "certificate_trace": trace,
            }
        )

    output = arguments.output.resolve()
    output.mkdir(parents=True)
    for output_name, input_path in source_paths.items():
        shutil.copyfile(input_path, output / output_name)

    environment = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-fixed-95-critical-value-table-evidence-environment",
        "generator_commit": commit,
        "python": platform.python_version(),
        "python_implementation": platform.python_implementation(),
        "python_flint": flint.__version__,
        "flint": flint.__FLINT_VERSION__,
        "platform_system": platform.system(),
        "platform_machine": platform.machine(),
        "requirements_sha256": sha256_file(output / "requirements.txt"),
        "arb_threads": 1,
    }
    core.write_json(output / "environment.json", environment)

    raw = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-fixed-95-critical-value-table-raw-evidence",
        "scope": SCOPE,
        "generator_commit": commit,
        "entry_count": len(raw_entries),
        "runtime_support_claimed": False,
        "final_table_selected": False,
        "supported_degrees_of_freedom_max": None,
        "entries": raw_entries,
    }
    core.write_json(output / "raw-evidence.json", raw)

    provenance = {
        "generator_commit": commit,
        "generator_sha256": sha256_file(output / "generator.py"),
        "environment_sha256": sha256_file(output / "environment.json"),
        "source_output_sha256": sha256_file(output / "raw-evidence.json"),
    }
    for entry in certificate_entries:
        entry["certificate"]["provenance"] = provenance

    certificates = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-fixed-95-critical-value-table-certificate-bundle",
        "scope": SCOPE,
        "generator_commit": commit,
        "entry_count": len(certificate_entries),
        "runtime_support_claimed": False,
        "final_table_selected": False,
        "supported_degrees_of_freedom_max": None,
        "source_hashes": {
            name: sha256_file(output / name) for name in sorted(source_paths)
        },
        "environment_sha256": sha256_file(output / "environment.json"),
        "raw_evidence_sha256": sha256_file(output / "raw-evidence.json"),
        "certificates": certificate_entries,
    }
    core.write_json(output / "certificates.json", certificates)

    certificate_by_df = {
        entry["certificate"]["input"]["degrees_of_freedom"]: entry["certificate"]
        for entry in certificate_entries
    }
    table = {
        "status": "non_authoritative_candidate",
        "artifact_kind": "paired-t-fixed-95-critical-value-table-evidence-manifest",
        "scope": SCOPE,
        "generator_commit": commit,
        "candidate_key": CANDIDATE_KEY,
        "target": {
            "confidence_level": "19/20",
            "two_sided_tail_probability": "1/20",
            "target_format": "binary64",
            "rounding_mode": "roundTiesToEven",
        },
        "coverage": {
            "degrees_of_freedom_minimum": DF_MIN,
            "degrees_of_freedom_maximum_evaluation_target": DF_MAX,
            "entry_count": len(table_entries),
            "contiguous_evidence_coverage_claimed": True,
            "supported_degrees_of_freedom_max": None,
        },
        "runtime_support_claimed": False,
        "final_table_selected": False,
        "table_content_sha256": sha256_bytes(table_content_bytes(table_entries)),
        "certificate_bundle_sha256": sha256_file(output / "certificates.json"),
        "cells": [
            {
                **entry,
                "certificate_sha256": sha256_bytes(
                    core.json_bytes(certificate_by_df[entry["degrees_of_freedom"]])
                ),
            }
            for entry in table_entries
        ],
    }
    core.write_json(output / "fixed-95-critical-value-table.json", table)

    manifested = sorted(path.name for path in output.iterdir())
    manifest = "".join(
        f"{hashlib.sha256((output / name).read_bytes()).hexdigest()}  {name}\n"
        for name in manifested
    )
    (output / "MANIFEST.sha256").write_text(manifest)
    print(
        "generated 200 contiguous fixed-95 critical-value certificates as "
        f"non-authoritative evidence in {output}"
    )


if __name__ == "__main__":
    main()
