"""UNISSUED CANDIDATE. Generic controls, not actual S-C uncertainty or supervision."""
import json
import sys
from core_loader import reviewed_core, require
from numerical_bridge import evaluate

with reviewed_core() as core:
    cases = [(["pass"]*22, "completed/pass"),
             (["indeterminate"]+["pass"]*20+["fail"], "completed/fail"),
             (["fail"]+["pass"]*20+["indeterminate"], "completed/fail"),
             (["indeterminate"]+["pass"]*21, "completed/indeterminate"),
             (["not_run"]*22, "not_run")]
    for states, expected in cases:
        require(core.aggregate(states) == expected, "unchanged aggregate control")
    require(core.aggregate(["pass"]*22, invocation_ok=False) == "execution error/refusal", "no execution-as-pass")
    rejected = False
    try:
        evaluate(core, {"record": {}, "context": {}})
    except (KeyError, ValueError):
        rejected = True
    require(rejected, "impossible internal packet rejected")
    print(json.dumps({"status":"UNISSUED CANDIDATE","python_optimize":sys.flags.optimize,"generic_aggregate_controls":6,"adapter_invariant_controls":1,"result":"PASS"}))
