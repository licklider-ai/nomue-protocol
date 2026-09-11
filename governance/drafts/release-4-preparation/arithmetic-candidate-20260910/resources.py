"""Finite workload observations and exponent-edge decode checks, not limits."""
import argparse
import json
import math
import struct
import time
import tracemalloc
from fractions import Fraction as Q
from pathlib import Path
from candidate import exact_candidate, lattice, project
from oracle import expected


def main(out):
    checks = 0
    for exponent in range(2047):
        for fraction in (0,1,(1<<51)-1,1<<51,(1<<52)-1):
            for sign in (0,1):
                bits = (sign<<63)|(exponent<<52)|fraction
                x=struct.unpack('>d',struct.pack('>Q',bits))[0]
                assert Q(lattice(x),1<<1074)==Q(*x.as_integer_ratio())
                checks += 1
    rows=[]
    for n in (2,16,256,4096):
        # Wide-range, deterministic data. Build inputs outside measured block.
        cells=[[math.ldexp(float(((i*13+c*7)%31)-15),(-1070,-600,0,600,1018)[(i+c)%5]) for i in range(n)] for c in range(4)]
        tracemalloc.start()
        start=time.perf_counter()
        result=exact_candidate(cells)
        enclosure={k:None if v is None else [project(p) for p in v] for k,v in result.items()}
        elapsed=time.perf_counter()-start
        _,peak=tracemalloc.get_traced_memory()
        tracemalloc.stop()
        truth=expected(cells)
        assert all((v is None and truth[k] is None) or v is not None and [Q(*p) for p in v]==truth[k] for k,v in result.items())
        rows.append(dict(n=n,observations=4*n,elapsed_seconds=elapsed,traced_peak_additional_bytes=peak,
                         max_reduced_integer_bits=max(abs(v).bit_length() for values in result.values() if values for p in values for v in p),
                         exact_oracle_equal=True,quantities=sum(len(v) for v in enclosure.values() if v)))
    out.write_text(json.dumps(dict(exponent_edge_decode_checks=checks,workloads=rows,
        scope='One environment and one workload per n. Input allocation excluded; tracemalloc omits native allocations. No runtime/memory ceiling established.'),indent=2)+'\n')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--out',type=Path,required=True);main(p.parse_args().out)
