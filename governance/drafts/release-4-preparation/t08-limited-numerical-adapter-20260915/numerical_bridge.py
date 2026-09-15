"""UNISSUED CANDIDATE. Private parsed transport, never a raw Record/CLI endpoint."""
import hashlib
import json
import math
import struct
import sys
from core_loader import reviewed_core, INPUTS, require


def decode(value):
    if isinstance(value, dict):
        if set(value) == {"$binary64"}:
            token = value["$binary64"]
            require(isinstance(token, str) and len(token) == 16, "binary64 transport width")
            number = struct.unpack(">d", bytes.fromhex(token))[0]
            require(math.isfinite(number) and not (number == 0 and token[0] == "8"), "binary64 transport domain")
            return number
        return {key: decode(item) for key, item in value.items()}
    if isinstance(value, list):
        return [decode(item) for item in value]
    require(value is None or isinstance(value, (str, bool)), "untagged transport number")
    return value


def wire(value):
    # Exact integer audit fields cannot traverse JavaScript JSON as numbers.
    if isinstance(value, bool) or value is None:
        return value
    if isinstance(value, int):
        return str(value)
    if isinstance(value, dict):
        return {key: wire(item) for key, item in value.items()}
    if isinstance(value, list):
        return [wire(item) for item in value]
    return value


def evaluate(core, packet):
    require(set(packet) == {"record", "context"}, "internal packet shape")
    context = packet["context"]
    require(context["numerical_commit"] == INPUTS["numerical_commit"], "core context")
    require(hashlib.sha256(json.dumps(packet["record"], ensure_ascii=False, separators=(",", ":")).encode()).hexdigest() == context["transport_sha256"], "transport context hash")
    record = decode(packet["record"])
    require(record["record_id"] == context["record_id"] and record["revision_id"] == context["revision_id"], "record context")
    # The unchanged G5 association/admissibility code is a defensive assertion,
    # never a second authoritative schema path. Disagreement is an adapter error.
    result = core.run(record, integrity_ok=False, envelope_ok=True)
    require(result["gate"] not in ("conformance fail", "admissibility fail"), "impossible after T07: " + result.get("reason", ""))
    # G5's caller-supplied integrity bit is not calculated in T08. Never expose it
    # as an integrity judgment; it does not gate G5 numerical work.
    result.pop("integrity")
    return {"status": "UNISSUED CANDIDATE", "context": context, "numerical": wire(result), "python_optimize": sys.flags.optimize, "python_version": sys.version.split()[0]}


def main():
    with reviewed_core() as core:
        for line in sys.stdin:
            try:
                packet = json.loads(line)  # Private bit-tagged transport from T07-validated TS.
                result = evaluate(core, packet)
            except (ValueError, KeyError, TypeError, AssertionError, OverflowError) as error:
                result = {"status": "UNISSUED CANDIDATE", "execution": "error", "category": "execution failure", "error_type": "adapter_invariant", "reason_code": "NRS-INTERNAL-VERIFIER-ERROR", "detail": str(error), "python_optimize": sys.flags.optimize, "python_version": sys.version.split()[0]}
            print(json.dumps(result, separators=(",", ":"), allow_nan=False), flush=True)


if __name__ == "__main__":
    main()
