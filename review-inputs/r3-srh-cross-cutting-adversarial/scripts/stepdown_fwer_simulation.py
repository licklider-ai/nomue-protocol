"""Monte Carlo attack on the strong-control claims for the ordered-range family under
INTERLEAVED true-mean configurations (not the 'widely separated' case the sources
analyse).  Known variance (nu = infinity) so that critical values are exact normal
range / normal quantiles.  Procedures implemented as contiguous-span step-down tests
with the 'all containing spans significant' rule:
  NK        : range statistic, gamma_p = alpha
  REGW-R    : range statistic, gamma_p = 1-(1-alpha)^(p/k)   (Einot-Gabriel 1.13)
  NKB       : range statistic, gamma_p = alpha*p/k            (Ryan 1.13' / Welsch B)
  Duncan    : range statistic, gamma_p = 1-(1-alpha)^(p-1)    (max-rule not needed at nu=inf)
  Ryan-t    : PAIRWISE two-sample test of the span extremes at level 2a/(n(p-1))
An error = declaring two means with equal true means different.  Reports FWER with
standard error; expected: NK and Duncan can exceed alpha, the others should not.
Diagnostic only; a simulation cannot prove control."""
import numpy as np
from scipy.stats import studentized_range, norm
import sys
rng = np.random.default_rng(20260908)
alpha = 0.05
INF = np.inf
def crit_range(p, gamma):   # normal-range upper gamma point (nu=inf)
    if p == 2: return np.sqrt(2)*norm.ppf(1-gamma/2)
    return studentized_range.ppf(1-gamma, p, INF)
def procedures(k):
    d = {
     'NK':      [crit_range(p, alpha) for p in range(2,k+1)],
     'REGW-R':  [crit_range(p, 1-(1-alpha)**(p/k)) for p in range(2,k+1)],
     'NKB':     [crit_range(p, alpha*p/k) for p in range(2,k+1)],
     'Duncan':  [crit_range(p, 1-(1-alpha)**(p-1)) for p in range(2,k+1)],
     'Ryan-t':  [np.sqrt(2)*norm.ppf(1-alpha/(k*(p-1))) for p in range(2,k+1)],  # |diff|/sigma > sqrt2 z_{a/(n(p-1))}
    }
    return d
def stepdown(x, crit):
    """x: ordered sample means (sigma=1 per mean). Returns set of index pairs declared different.
    Contiguous spans, largest first; a span is tested only if every containing span was significant."""
    k = len(x); order = np.argsort(x); xs = x[order]
    sig = {}   # (i,j) span in sorted positions -> bool
    for p in range(k, 1, -1):
        for i in range(0, k-p+1):
            j = i+p-1
            # containing spans: (i-1,j) and (i,j+1) (all larger spans contain one of these)
            if p < k:
                left = sig.get((i-1,j), False) if i-1 >= 0 else True
                right = sig.get((i,j+1), False) if j+1 < k else True
                if i-1 >= 0 and j+1 < k: ok = left and right
                elif i-1 >= 0: ok = left
                else: ok = right
                if not ok: sig[(i,j)] = False; continue
            sig[(i,j)] = (xs[j]-xs[i]) > crit[p-2]
    rejected = set()
    for (i,j), s in sig.items():
        if s: rejected.add((order[i], order[j]))
    return rejected
def fwer(mu, crit, reps):
    k = len(mu); errs = 0
    for _ in range(reps):
        x = mu + rng.standard_normal(k)
        rej = stepdown(x, crit)
        if any(mu[a] == mu[b] for a,b in rej): errs += 1
    return errs/reps
configs = {
 'k=4 two separated pairs (0,0,20,20)': np.array([0,0,20,20.]),
 'k=4 interleaved pairs (0,0,1,1)':     np.array([0,0,1,1.]),
 'k=4 interleaved (0,0,0.5,0.5)':       np.array([0,0,.5,.5]),
 'k=6 three separated pairs':           np.array([0,0,20,20,40,40.]),
 'k=6 triples interleaved (0,0,0,.7,.7,.7)': np.array([0,0,0,.7,.7,.7]),
 'k=6 pairs interleaved (0,0,.8,.8,1.6,1.6)': np.array([0,0,.8,.8,1.6,1.6]),
 'k=8 4 pairs separated':               np.array([0,0,20,20,40,40,60,60.]),
 'k=8 4 pairs interleaved step .9':     np.array([0,0,.9,.9,1.8,1.8,2.7,2.7]),
 'k=5 (0,0,0,0,20) k-1 equal':          np.array([0,0,0,0,20.]),
}
reps = int(sys.argv[1]) if len(sys.argv) > 1 else 20000
print(f"reps={reps}, alpha={alpha}, nu=inf; se ~ sqrt(p(1-p)/reps)")
for name, mu in configs.items():
    k = len(mu); procs = procedures(k)
    row = {pn: fwer(mu, c, reps) for pn, c in procs.items()}
    print(f"{name:45s} " + "  ".join(f"{pn}={v:.4f}" for pn, v in row.items()))
print("theory: NK two separated pairs -> 1-(1-a)^2 = %.4f ; three pairs -> %.4f ; four -> %.4f" % (1-.95**2, 1-.95**3, 1-.95**4))
print("theory: Duncan complete-null-like block of k-1=4 equal means: 1-(.95)^3 = %.4f" % (1-.95**3))
