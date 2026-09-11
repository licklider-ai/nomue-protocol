"""Separate direct-definition expectation path. Never imports candidate code.
Fractions are built from float.as_integer_ratio, not the integer-lattice decoder.
Same author context: algorithmic separation is not investigator independence.
"""
from fractions import Fraction as F


def expected(cells):
    n = len(cells[0])
    x = [[F(*v.as_integer_ratio()) for v in c] for c in cells]
    m = [sum(c, F(0))/n for c in x]
    a = (m[2]+m[3])/2 - (m[0]+m[1])/2
    b = (m[1]+m[3])/2 - (m[0]+m[2])/2
    ab = (m[3]-m[2]) - (m[1]-m[0])
    ss = [n*a*a, n*b*b, n*ab*ab/4]
    sse = sum(((v-mc)**2 for c,mc in zip(x,m) for v in c), F(0))
    grand = sum(m)/4
    assert sum((v-grand)**2 for c in x for v in c) == sse+sum(ss)
    return dict(means=m, estimates=[a,b,ab], beta=[grand,a/2,b/2,ab/4], ss=ss,
                sse=[sse], df=[F(4*(n-1))], f=[4*(n-1)*s/sse for s in ss] if sse else None)
