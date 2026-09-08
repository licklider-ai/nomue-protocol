"""Independent checks around Hayter (1986) Theorems 1/2 and A.2, by routes different
from the author's I.4 code: (a) h_i = P(range of i N(0,1) <= 2q) by SciPy
studentized_range with df=inf, log-concavity h_i^2 > h_{i-1} h_{i+1} and the
partition inequality (2.10) for k <= 8 by brute force; (b) the k=3 identity
P(Q_{2,nu} > sqrt2 t_{a/2,nu}) = alpha at several finite nu; (c) finite-nu values of
P(Q_{k-1,nu} > sqrt2 t_{a/2,nu}) for k=4 (Table 1 is nu=inf only); (d) Theorem 2:
P(Q_{k-1,nu} > q_{a,k-1,nu}) = alpha by construction (sanity)."""
import numpy as np
from itertools import combinations
from scipy.stats import studentized_range, t as tdist, norm
INF = np.inf
alpha = .05
q = np.sqrt(2)*norm.ppf(1-alpha/2)   # threshold '2q' of A.2 in Hayter's notation
def h(i):
    if i == 1: return 1.0
    if i == 2: return 1-2*(1-norm.cdf(q/np.sqrt(2)))   # exact: |Z1-Z2|<=q
    return studentized_range.cdf(q, i, INF)
H = [None]+[h(i) for i in range(1, 12)]
print("h_1..h_11:", [round(x,4) for x in H[1:]])
print("log-concave h_i^2 > h_{i-1}h_{i+1} for i=2..10:", all(H[i]**2 > H[i-1]*H[i+1] for i in range(2, 11)))
def partitions(n, least=1):
    if n == 0: yield (); return
    for j in range(least, n+1):
        for rest in partitions(n-j, j): yield (j,)+rest
ok = True
for k in range(3, 9):
    for part in partitions(k):
        if len(part) < 2: continue
        prod = np.prod([H[v] for v in part])
        if prod < H[k-1]-1e-12: ok = False; print("VIOLATION", k, part, prod, H[k-1])
print("(2.10) prod h_{v_i} >= h_{k-1} over all partitions with t>=2, k=3..8:", ok)
print("k=3 identity at finite nu (should be .0500):", [round(studentized_range.sf(np.sqrt(2)*tdist.ppf(.975,nu), 2, nu),4) for nu in (5,10,30,120)])
print("k=4 alpha=.05 at nu=10,30,120,inf:", [round(studentized_range.sf(np.sqrt(2)*tdist.ppf(.975,nu), 3, nu),4) for nu in (10,30,120)], round(studentized_range.sf(q,3,INF),4))
print("k=4 alpha=.05 nu=inf via independent 2-D integral:")
import mpmath as mp
mp.mp.dps = 30
# P(range of 3 N(0,1) > q) = 1 - 3*int phi(x)(Phi(x+q)-Phi(x))^2 dx  (same formula) -> use instead the
# order-statistics route: P(range<=q) = int int_{x<=y<=x+q} 3*2*phi(x)phi(y)(Phi(y)-Phi(x)) dy dx  (different integrand)
f = lambda x, y: 6*mp.npdf(x)*mp.npdf(y)*(mp.ncdf(y)-mp.ncdf(x))
qq = mp.mpf(q)
val = mp.quad(lambda x: mp.quad(lambda y: f(x,y), [x, x+qq]), [-10, 0, 10])
print("   1 - P(range<=q) =", mp.nstr(1-val, 10))
print("Theorem 2 sanity: P(Q_{k-1,nu} > q_{.05,k-1,nu}) for k=6,nu=20:", round(studentized_range.sf(studentized_range.ppf(.95,5,20),5,20),4))
