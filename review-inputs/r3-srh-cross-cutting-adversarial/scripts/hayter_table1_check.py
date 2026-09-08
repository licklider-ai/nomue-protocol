"""Independent recomputation of Hayter (1986) Table 1 (nu = infinity) by two routes
that differ from the author's SciPy `quad` on [-12, 12] and from the PR 201 mpmath
tanh-sinh quadrature: (a) mpmath Gauss-Legendre on a finite window with 40 digits,
(b) SciPy studentized_range with df = inf. Printed cells transcribed from the p.1002
page image by this review. Diagnostic only; not an oracle or a tolerance."""
import mpmath as mp
from scipy.stats import studentized_range, norm
import numpy as np

mp.mp.dps = 40
PRINTED = {
 .01: [.0100,.0270,.0490,.0747,.1030,.1331,.1644,.1963,.2286,.2609,.2929,.3244,.3554,.3856,.4150,.4435,.4711,.4977],
 .05: [.0500,.1222,.2032,.2857,.3655,.4404,.5092,.5715,.6273,.6769,.7207,.7591,.7926,.8219,.8472,.8691,.8881,.9044],
 .10: [.1000,.2269,.3535,.4686,.5687,.6531,.7229,.7800,.8261,.8630,.8925,.9158,.9343,.9488,.9602,.9691,.9760,.9814],
}
def tail_gl(r, q):
    # P(range of r iid N(0,1) > q); Gauss-Legendre, window [-14, 14], subdivided
    f = lambda x: r*mp.npdf(x)*(mp.ncdf(x+q)-mp.ncdf(x))**(r-1)
    pts = [mp.mpf(v) for v in range(-14, 15, 2)]
    cdf = mp.quad(f, pts, method='gauss-legendre')
    return 1-cdf
summary = {}
for alpha, col in PRINTED.items():
    q = mp.sqrt(2)*mp.sqrt(2)*mp.erfinv(1-mp.mpf(alpha))   # sqrt(2) z_{alpha/2}
    qf = float(np.sqrt(2)*norm.ppf(1-alpha/2))
    diffs = []
    for k, printed in zip(range(3, 21), col):
        v = tail_gl(k-1, q)
        v_scipy = studentized_range.sf(qf, k-1, np.inf)
        r4 = float(mp.nstr(v, 4, min_fixed=-10, max_fixed=10))  # 4-sig? use explicit rounding below
        rounded = round(float(v)+1e-15, 4)
        diff = float(v)-printed
        flag = abs(rounded-printed) > 1e-9
        diffs.append((k, printed, float(v), v_scipy, rounded, diff, flag))
        print(f"alpha={alpha} k={k:2d} printed={printed:.4f} gl={float(v):.8f} scipy_inf={v_scipy:.8f} rounded={rounded:.4f} diff={diff:+.5f} {'DIFF' if flag else ''}")
    n = sum(d[6] for d in diffs)
    mx = max(diffs, key=lambda d: abs(d[5]))
    signs = set(np.sign(d[5]) for d in diffs if d[6])
    ks = [d[0] for d in diffs if d[6]]
    print(f"== alpha={alpha}: {n}/18 differ at 4dp; max |diff|={abs(mx[5]):.5f} at k={mx[0]}; sign of (computed-printed) among differing: {signs}; k list {ks}\n")
