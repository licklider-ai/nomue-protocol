"""Exact author-side witnesses; no candidate imports or wrapper execution."""
from fractions import Fraction as Q


def require(condition, message):
    if not condition:
        raise ValueError(message)


def quantities(cells):
    means = [sum(c)/len(c) for c in cells]
    a, b, c, d = means
    effects = [(-a-b+c+d)/2, (-a+b-c+d)/2, a-b-c+d]
    ss = [2*effects[0]**2, 2*effects[1]**2, effects[2]**2/2]
    sse = sum((x-m)**2 for cell, m in zip(cells, means) for x in cell)
    return ss, sse, [4*x/sse for x in ss]


def main():
    t, h = Q(2)**-537, Q(2)**500
    cells = [[Q(0), t] for _ in range(3)] + [[h, h]]
    require(all(Q(float(x)) == x for cell in cells for x in cell), 'input encoding')
    ss, sse, f = quantities(cells)
    maximum = Q((1 << 53)-1)*(1 << 971)
    require(ss == [(h-t/2)**2/2]*3, 'SS formula')
    require(all(0 < x <= maximum for x in ss), 'finite SS')
    require(sse == 3*Q(2)**-1075, 'SSE formula')
    require(Q(float(sse)) == Q(2)**-1073, 'positive SSE display')
    require(f == [Q(4, 3)*(h/t-Q(1, 2))**2]*3, 'F formula')
    require(all(x > maximum for x in f), 'F overflow')
    ss, sse, f = quantities([[Q(0), Q(2)**-538] for _ in range(4)])
    require(sse == Q(2)**-1075 and float(sse) == 0.0, 'SSE zero tie')
    require(ss == [0]*3 and f == [0]*3, 'zero effects')
    print('Two exact representation witnesses passed; wrapper not executed.')


if __name__ == '__main__':
    main()
