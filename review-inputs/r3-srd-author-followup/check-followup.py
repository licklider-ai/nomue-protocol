#!/usr/bin/env python3
"""Bounded author-side diagnostics; no normative implementation or simulation.

Python 3 + SciPy. The fixed parent script supplies only Marcus transcription,
its numerical comparison engine, and graph updates explicitly identified below.
The closed-testing and chain calculations are independently written here.
"""
import ast
import hashlib
import importlib.util
import itertools
import math
from fractions import Fraction as Q
from pathlib import Path

import scipy
from scipy.optimize import brentq
from scipy.stats import chi2

PARENT = Path(__file__).resolve().parents[1] / 'r3-srd-primary-investigation/reproduce-sr-d.py'
assert hashlib.sha256(PARENT.read_bytes()).hexdigest() == 'caa2f95fb49e7e0bd57125ee6fb396388861b0ca002bee5403c604291ee86dde'
spec = importlib.util.spec_from_file_location('parent_diagnostics', PARENT)
old = importlib.util.module_from_spec(spec)
spec.loader.exec_module(old)


def ensure(ok, message):
    if not ok:
        raise AssertionError(message)


def nonempty(n):
    return [tuple(i for i in range(n) if mask & (1 << i)) for mask in range(1, 1 << n)]


def marcus_table():
    # Read the fixed transcription without rerunning the old 55-check main.
    body = next(n for n in ast.parse(PARENT.read_text()).body if isinstance(n, ast.FunctionDef) and n.name == 'main')
    candidates = [n.value for n in body.body if isinstance(n, ast.Assign)
                  and any(isinstance(t, ast.Name) and t.id == 'table1' for t in n.targets)]
    return ast.literal_eval(candidates[-1])


def independent_tail(blocks, x):
    # Product polynomial prod_l prod_{j=1}^{l-1}(z+j)/l!: coefficient z^d
    # is the chi-square-d mixture mass. Same probability premise as the parent;
    # independent convolution + SciPy tail evaluation, not a new source proof.
    coeff = [Q(1)]
    for size in blocks:
        for j in range(1, size):
            nxt = [Q(0)] * (len(coeff) + 1)
            for d, value in enumerate(coeff):
                nxt[d] += j * value / (j + 1)
                nxt[d + 1] += value / (j + 1)
            coeff = nxt
    ensure(sum(coeff) == 1, 'mixture mass')
    return sum(float(c) * chi2.sf(x, d) for d, c in enumerate(coeff) if d)


def accounting(flags, total):
    rows = sum(any(pair) for pair in flags.values())
    cells = sum(sum(pair) for pair in flags.values())
    return rows, cells, total - cells


def check_a():
    table = marcus_table()
    flags = {}
    max_engine_gap = 0.0
    ensure(len(table) == 32 and all(len(v) == 2 for v in table.values()), '64-cell shape')
    for blocks, printed in table.items():
        values = [old.dg2_critical(blocks, a) for a in (0.05, 0.01)]
        independent = [brentq(lambda x: independent_tail(blocks, x) - a, 0.01, 60, xtol=1e-12)
                       for a in (0.05, 0.01)]
        max_engine_gap = max(max_engine_gap, *(abs(x-y) for x, y in zip(values, independent)))
        flags[blocks] = tuple(abs(v-p) > 0.001 for v, p in zip(values, printed))
        ensure(flags[blocks] == tuple(abs(v-p) > 0.001 for v, p in zip(independent, printed)), 'independent flag agreement')
        if any(flags[blocks]):
            print('A differing row', blocks, 'printed', printed, 'computed', [round(v, 9) for v in values], 'flags', flags[blocks])
    ensure(accounting(flags, 64) == (6, 7, 57), 'six rows / seven cells / 57 agreeing')
    ensure(max_engine_gap < 1e-10, 'two numerical engines agree to 1e-10')
    # Mutation keeps six row keys and pair lengths, but changes seven to six cells.
    changed = dict(flags)
    changed[(2, 2, 2, 2, 2)] = (True, False)
    ensure(accounting(changed, 64) == (6, 6, 58), 'mutation changes cells only')
    try:
        ensure(accounting(changed, 64) == (6, 7, 57), 'changed cell count detected')
    except AssertionError:
        pass
    else:
        raise AssertionError('mutation was not rejected')
    print('A PASS: 6 rows, 7 cells, 57/64 agreeing; cell-count mutation rejected; max engine gap', max_engine_gap)


def local_weights(H, weights, k=2, normalize=False):
    gates = [i for i in H if i < k]
    secondary = [i for i in H if i >= k]
    v = {i: Q(0) for i in H}
    for i in gates:
        v[i] = weights[i]
    if len(gates) < k and secondary:
        mass = 1 - sum(v.values())
        denom = sum(weights[i] for i in secondary)
        for i in secondary:
            v[i] = mass * weights[i] / denom
    if normalize:
        mass = sum(v.values())
        if mass:
            v = {i: z / mass for i, z in v.items()}
    ensure(all(z >= 0 for z in v.values()) and sum(v.values()) <= 1, 'admissible weights')
    return v


def local_p(H, p, v, method):
    if method == 'bonferroni':
        return min([Q(1)] + [p[i]/v[i] for i in H if v[i] > 0])
    order = sorted(H, key=lambda i: (p[i], i))
    cum, values = Q(0), [Q(1)]
    for i in order:
        cum += v[i]
        if cum:
            values.append(p[i]/cum)
    return min(values)


def closure(p, weights, method, normalize=False):
    result = [Q(0)] * len(p)
    for H in nonempty(len(p)):
        value = local_p(H, p, local_weights(H, weights, normalize=normalize), method)
        for i in H:
            result[i] = max(result[i], value)
    return result


def check_c():
    w = list(map(Q, ['.9', '.1', '.5', '.5']))
    p = list(map(Q, ['.024', '.003', '.026', '.002']))
    expected = {
        ('bonferroni', False): [Q(2,75), Q(3,100), Q(13,450), Q(2,75)],
        ('bonferroni', True): [Q(2,75), Q(13,450), Q(13,450), Q(2,75)],
        ('simes', False): [Q(2,75), Q(3,100), Q(13,500), Q(12,475)],
        ('simes', True): [Q(13,500), Q(13,500), Q(13,500), Q(12,475)],
    }
    for (method, normalized), exp in expected.items():
        got = closure(p, w, method, normalized)
        ensure(got == exp, f'{method} normalized={normalized}')
        print('C', method, 'normalized', normalized, 'exact', [str(x) for x in got], 'decimal', [round(float(x), 9) for x in got])
    a = Q(29,1000)
    ensure(closure(p,w,'bonferroni')[1] > a >= closure(p,w,'bonferroni',True)[1], 'mortality decision changes at .029')
    low = list(map(Q, ['.024','.001','.001','.001']))
    high = list(map(Q, ['.024','.001','1','1']))
    ensure(closure(low,w,'bonferroni',True)[0] == Q(3,125), 'low secondary p')
    ensure(closure(high,w,'bonferroni',True)[0] == Q(2,75), 'high secondary p')
    # Proper gatekeeper subset normalization differs from singleton-only for k=3.
    wg = list(map(Q, ['.5','.3','.2','.5','.5']))
    raw = local_weights((0,1),wg,k=3)
    norm = local_weights((0,1),wg,k=3,normalize=True)
    ensure(raw == {0:Q(1,2),1:Q(3,10)} and norm == {0:Q(5,8),1:Q(3,8)}, 'normalization not singleton-only for k=3')
    # Exact joint law with super-uniform marginals, but no positive-dependence claim.
    a = Q(1,20)
    law = [(a/2,(a/2,Q(1))),(a/2,(Q(1),a/2)),(a/2,(a,a)),(1-3*a/2,(Q(1),Q(1)))]
    for i in (0,1):
        for t in (Q(0),a/2,a,Q(1)):
            ensure(sum(mass for mass,pair in law if pair[i] <= t) <= t,'super-uniform marginal')
    simes_error = sum(mass for mass,pair in law if local_p((0,1),pair,{0:Q(1,2),1:Q(1,2)},'simes') <= a)
    bonf_error = sum(mass for mass,pair in law if local_p((0,1),pair,{0:Q(1,2),1:Q(1,2)},'bonferroni') <= a)
    ensure(simes_error == 3*a/2 and bonf_error == a,'marginal validity alone does not guarantee Simes')
    # Late PR #237 Section 6.4 examples, checked with our existing closure code.
    raw_example = closure(list(map(Q,['.048','.03','.001','.001'])),w,'simes')
    normalized_example = closure(list(map(Q,['.02','.021','.001','.03'])),w,'simes',True)
    ensure(raw_example == [Q(4,75),Q(3,10),Q(6,125),Q(6,125)], 'PR 237 raw Simes counterexample')
    ensure(normalized_example[:3] == [Q(1,45),Q(3,100),Q(21,1000)], 'PR 237 normalized Simes counterexample')
    ensure(raw_example[2] <= Q(1,20) < min(raw_example[:2]), 'raw Simes violates gate condition 2')
    ensure(normalized_example[2] <= Q(43,2000) < min(normalized_example[:2]), 'normalized Simes violates gate condition 2')
    print('C PASS: .029 decision changes; secondary dependence demonstrated; exact Simes error',simes_error,'Bonferroni',bonf_error,'; both PR 237 Condition 2 counterexamples reproduced')


def chain_levels(H, base):
    last, v = -1, {}
    for i in sorted(H):
        v[i] = sum(base[last+1:i+1])
        last = i
    return v


def full_chain(p, base, positive=True):
    Hs = nonempty(len(p))
    local = {H:any((not positive or chain_levels(H,base)[i] > 0) and p[i] <= chain_levels(H,base)[i] for i in H) for H in Hs}
    return frozenset(i for i in range(len(p)) if all(local[H] for H in Hs if i in H))


def all_shortcuts(p, base, positive=True):
    def visit(H):
        v = chain_levels(H,base)
        choices = [i for i in H if (not positive or v[i] > 0) and p[i] <= v[i]]
        if not choices:
            return {frozenset(set(range(len(p)))-set(H))}
        return set().union(*(visit(tuple(j for j in H if j != i)) for i in choices))
    return visit(tuple(range(len(p))))


def check_b():
    a = Q(1,20)
    count = 0
    for units in itertools.product(range(3),repeat=3):
        if sum(units) > 2:
            continue
        base = [u*a/2 for u in units]
        for p in itertools.product((Q(0),a/2,a,Q(1)),repeat=3):
            for positive in (False,True):
                ensure(all_shortcuts(p,base,positive) == {full_chain(p,base,positive)}, 'closure/shortcut all choices')
            ensure(old.wiens_fallback(base,p) == full_chain(p,base,True), 'fallback positive convention')
            count += 1
    p,base = [Q(1,10),Q(0)],[a,Q(0)]
    ensure(full_chain(p,base,False) == {1} and full_chain(p,base,True) == set(), 'zero-level convention differs')
    # Finite-epsilon leakage with k=2,m=4 and parent graph updates reused.
    e = Q(1,10**9)
    levels = {0:9*a/10,1:a/10,2:Q(0),3:Q(0)}
    G = {0:{0:Q(0),1:1-e,2:e/2,3:e/2},1:{0:1-e,1:Q(0),2:e/2,3:e/2},
         2:{0:Q(0),1:Q(0),2:Q(0),3:Q(1)},3:{0:Q(0),1:Q(0),2:Q(1),3:Q(0)}}
    # Check the report's closed-form finite-epsilon levels for all 15 subsets.
    # These are exact rational identities at this epsilon; the general limit
    # is established algebraically in the report, not by the finite check.
    w = [Q(9,10),Q(1,10),Q(1,2),Q(1,2)]
    for H in nonempty(4):
        actual = old.graph_weights(levels,G,4,frozenset(H))
        gates = [i for i in H if i < 2]
        secs = [i for i in H if i >= 2]
        expected = {i:Q(0) for i in H}
        if len(gates) == 2:
            expected.update({i:a*w[i] for i in gates})
        elif len(gates) == 1:
            i = gates[0]
            j = 1-i
            expected[i] = a*(1-w[j]*e)
            for s in secs:
                expected[s] = a*w[j]*e*w[s]/sum(w[t] for t in secs)
        else:
            expected = {s:a*w[s]/sum(w[t] for t in secs) for s in secs}
        ensure(actual == expected, 'finite-epsilon subset formula')
    p = [Q(9,100),Q(4,1000),Q(1,10**12),Q(1)]
    rejected = old.graph_algorithm1(levels,G,p,4)
    ensure(rejected == {1,2}, 'finite epsilon opens secondary before first family is complete')
    # An exact boundary can fail even for fixed p independent of epsilon.
    p_boundary = [a,Q(4,1000),Q(1),Q(1)]
    ensure(old.graph_algorithm1(levels,G,p_boundary,4) == {1}, 'finite epsilon misses alpha boundary')
    print('B PASS:',count,'chain cases, both zero conventions and all selections; finite epsilon rejects H2,H3 while H1 survives; p1=alpha boundary misses H1')


if __name__ == '__main__':
    print('Python numerical environment: SciPy',scipy.__version__)
    check_a()
    check_b()
    check_c()
    print('ALL FOLLOW-UP DIAGNOSTICS PASSED')
