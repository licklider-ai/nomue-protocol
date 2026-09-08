"""Are the raw (un-enforced) critical-value sequences of the ordered-range variants
monotone nondecreasing in subset size p?  Variants: Newman-Keuls (gamma_p = alpha),
Einot-Gabriel Ryan allocation 1-(1-a)^(p/k), Ryan (1.13')/Welsch B  a*p/k,
Welsch A (a*p/t, with p=t-1 and t at alpha), Duncan (1-a)^(p-1),
Einot-Gabriel rescaled Duncan (1-a)^((p-1)/(k-1)).  Studentized-range quantiles from
SciPy (independent of any repository code).  Diagnostic only."""
import numpy as np
from scipy.stats import studentized_range
import warnings; warnings.filterwarnings('ignore')

def qsr(p, nu, upper):  # upper-tail probability -> quantile
    if p == 2 and np.isinf(nu):
        from scipy.stats import norm
        return np.sqrt(2)*norm.ppf(1-upper/2)
    return studentized_range.ppf(1-upper, p, nu)

def variants(alpha, k):
    return {
      'NK':        lambda p: alpha,
      'EG-Ryan':   lambda p: 1-(1-alpha)**(p/k),
      'Ryan13p/WelschB': lambda p: alpha*p/k,
      'WelschA':   lambda p: alpha if p >= k-1 else alpha*p/k,
      'Duncan':    lambda p: 1-(1-alpha)**(p-1),
      'EG-Duncan-rescaled': lambda p: 1-(1-alpha)**((p-1)/(k-1)),
    }
NUS = [3,5,10,20,60,np.inf]
viol = {}
for alpha in (.01,.05):
  for k in (3,4,5,6,8,10,12,15,20):
    for name, g in variants(alpha, k).items():
      for nu in NUS:
        seq = [qsr(p, nu, g(p)) for p in range(2, k+1)]
        bad = [(p, seq[p-2], seq[p-1]) for p in range(2, k) if seq[p-1] < seq[p-2]-1e-9]
        if bad:
            viol.setdefault(name, []).append((alpha, k, nu, bad[0], len(bad)))
for name in variants(.05, 5):
    v = viol.get(name, [])
    print(f"{name}: {len(v)} (alpha,k,nu) cases with a decrease")
    for a in (.01,.05):
        cases = [(k,nu,nb) for (aa,k,nu,b,nb) in v if aa == a]
        print(f"   alpha={a}: " + ("none" if not cases else ", ".join(f"k={k}/nu={nu}({nb})" for k,nu,nb in cases)))
    for row in v[:3]:
        a,k,nu,b,nb = row
        print(f"   example alpha={a} k={k} nu={nu}: C_{b[0]}={b[1]:.4f} > C_{b[0]+1}={b[2]:.4f}")
# Welsch p.575 printed NKA t=5 nu=20 and SNK/Tukey values used on p.571
print('NKA t=5 nu=20 alpha=.05:', [round(qsr(p,20,variants(.05,5)['WelschA'](p)),2) for p in range(2,6)])
print('SNK q_.05(p,20):', [round(qsr(p,20,.05),2) for p in range(2,6)])
# Duncan p.41 max rule: where does it bind?
for nu in (4,5,6,8,10,20,30):
    raw = [qsr(p, nu, 1-(0.95)**(p-1)) for p in range(2, 11)]
    binds = [p for p in range(3, 11) if raw[p-2] < raw[p-3]]
    print(f"Duncan alpha=.05 n2={nu}: raw R(p)= {[round(x,3) for x in raw]}; max-rule binds at p={binds}")
