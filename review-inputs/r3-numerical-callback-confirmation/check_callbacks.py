"""Bounded counterexamples to the nested callbacks' analytic-extension claim.

Run with python-flint 0.9.0 and mpmath 1.4.1. The probe directory contains
unchanged Appendix A sources extracted by verify_replay.py. This does not
claim that any recorded real-axis probability is numerically wrong.
"""
import argparse
import hashlib
import importlib
import json
from pathlib import Path
import sys

from flint import acb, arb, ctx, fmpq
import flint
import mpmath


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("probe_directory", type=Path)
    args = parser.parse_args()
    sys.path.insert(0, str(args.probe_directory.resolve()))
    B = importlib.import_module("probe_b_studentized_range")
    C = importlib.import_module("probe_c_dunnett")
    ctx.prec = 96
    B.SQ2 = C.SQ2 = arb(2).sqrt()
    w = acb(3, fmpq(1, 100))
    returned_b = acb(B.range_cdf_arb(2, w, prec_tol=arb(2) ** -50))
    # F_2(w) = erf(w/2); its entire continuation has nonzero imaginary part.
    reference_b = (w / 2).erf()
    s = acb(1, fmpq(1, 100))
    lam = arb(2).sqrt() / 2
    returned_c = acb(C.inner_arb([lam], [lam], arb(2), s, False,
                               tol=arb(2) ** -50))
    # With one treatment, the inner normal convolution is Phi(d*s).
    reference_c = C.Phi_acb(2 * s)
    for returned, reference in [(returned_b, reference_b), (returned_c, reference_c)]:
        assert returned.is_finite() and returned.imag.is_zero()
        assert reference.imag.lower() > 0
        assert not returned.overlaps(reference)

    branch_box = acb(arb(-1, "0.01"), arb(0, "0.01"))
    exponent = arb(fmpq(73, 10)) - 1
    ordinary_power = branch_box ** exponent
    analytic_power = branch_box.pow(exponent, analytic=True)
    assert ordinary_power.is_finite() and not analytic_power.is_finite()
    result = {
        "environment": {"python": sys.version.split()[0],
                        "python-flint": flint.__version__,
                        "mpmath": mpmath.__version__,
                        "mpmath_backend": mpmath.libmp.BACKEND,
                        "arb_precision_bits": ctx.prec},
        "integral_docstring_sha256": hashlib.sha256(acb.integral.__doc__.encode()).hexdigest(),
        "source_sha256": {name: hashlib.sha256((args.probe_directory / name).read_bytes()).hexdigest()
                          for name in ["probe_b_studentized_range.py", "probe_c_dunnett.py"]},
        "range_k2": {"input": "3 + (1/100)i", "returned": str(returned_b),
                     "closed_form": str(reference_b), "overlap": False},
        "normal_convolution_p1": {"input_s": "1 + (1/100)i", "d": 2,
                                  "returned": str(returned_c),
                                  "closed_form": str(reference_c), "overlap": False},
        "noninteger_power_branch_box": {"nu": "73/10", "box": str(branch_box),
                                        "ordinary": str(ordinary_power),
                                        "analytic_checked": str(analytic_power)},
        "interpretation": "Analytic-extension contract is not established; no claim of a wrong recorded real-axis probability.",
    }
    print(json.dumps(result, indent=2) + "\n", end="")


if __name__ == "__main__":
    main()
