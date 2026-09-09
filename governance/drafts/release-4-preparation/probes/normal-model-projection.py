"""Author-side exact checks; not an independent oracle or runtime procedure."""
from fractions import Fraction as Q
import json


def mul(a, b):
    bt = list(zip(*b))
    return [[sum((x * y for x, y in zip(r, c)), Q(0)) for c in bt] for r in a]


def rank(a):
    a = [list(r) for r in a]
    k = 0
    for j in range(len(a[0])):
        piv = next((i for i in range(k, len(a)) if a[i][j]), None)
        if piv is None:
            continue
        a[k], a[piv] = a[piv], a[k]
        d = a[k][j]
        a[k] = [v / d for v in a[k]]
        for i in range(len(a)):
            if i != k:
                d = a[i][j]
                a[i] = [v - d * w for v, w in zip(a[i], a[k])]
        k += 1
    return k


def quad(v, p):
    return sum((v[i] * p[i][j] * v[j]
                for i in range(len(v)) for j in range(len(v))), Q(0))


def check(n):
    N = 4 * n
    signs = [(1, 1, 1, 1), (-1, -1, 1, 1),
             (-1, 1, -1, 1), (1, -1, -1, 1)]
    cols = [[Q(s) for s in v for _ in range(n)] for v in signs]
    ps = [[[x * y / N for y in v] for x in v] for v in cols]
    eye = [[Q(i == j) for j in range(N)] for i in range(N)]
    pe = [[eye[i][j] - sum(p[i][j] for p in ps)
           for j in range(N)] for i in range(N)]
    projectors = ps + [pe]
    zero = [[Q(0)] * N for _ in range(N)]
    count = 0

    def require(ok):
        nonlocal count
        assert ok
        count += 1

    for i, p in enumerate(projectors):
        require(p == [list(c) for c in zip(*p)])
        require(mul(p, p) == p)
        require(rank(p) == (1 if i < 4 else N - 4))
        for j, r in enumerate(projectors):
            if i != j:
                require(mul(p, r) == zero)
    require([[sum(p[i][j] for p in projectors) for j in range(N)]
             for i in range(N)] == eye)
    # A deterministic nonconstant within-cell fixture with rational offsets.
    v = [Q(7*c, 3) + Q(2*(c == 3), 7) + Q((k+1)**2, 5) for c in range(4) for k in range(n)]
    m = [sum(v[c*n:(c+1)*n]) / n for c in range(4)]
    da = (-m[0]-m[1]+m[2]+m[3])/2
    db = (-m[0]+m[1]-m[2]+m[3])/2
    dab = m[0]-m[1]-m[2]+m[3]
    ss = [quad(v, p) for p in ps[1:]]
    sse = quad(v, pe)
    require(ss == [n*da**2, n*db**2, n*dab**2/4])
    require(sse == sum((v[c*n+k]-m[c])**2 for c in range(4) for k in range(n)))
    require(sse > 0)
    # Each individual null permits all remaining full-model components.
    for target in (1, 2, 3):
        mu = [sum(Q(j+1)*cols[j][i] for j in range(4) if j != target)
              for i in range(N)]
        require(quad(mu, ps[target]) == 0)
        require(quad(mu, pe) == 0)
        require(all(quad(mu, ps[j]) > 0 for j in range(4) if j != target))
    # Orthogonal Euclidean projections do not suffice with unequal variances.
    sigma = [[eye[i][j]*(2 if i == 0 else 1) for j in range(N)] for i in range(N)]
    require(mul(mul(ps[1], sigma), pe) != zero)
    return {"n": n, "N": N, "residual_df": N-4, "checks": count,
            "SS": [str(x) for x in ss], "SSE": str(sse),
            "unequal_variance_cross_covariance_nonzero": True}


if __name__ == "__main__":
    rows = [check(n) for n in (2, 3, 5)]
    print(json.dumps({"role": "author-side finite exact corroboration",
                      "rows": rows, "checks": sum(r["checks"] for r in rows)}, indent=2))
