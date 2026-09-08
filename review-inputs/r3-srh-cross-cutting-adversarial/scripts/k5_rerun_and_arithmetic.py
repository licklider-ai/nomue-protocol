"""(1) Verbatim rerun of the K.5 block from the fixed head blob (extracted at run time);
(2) independent partition count via Euler's pentagonal recurrence;
(3) exact-rational rechecks of the printed arithmetic conflicts named in K.4, C.7 and
PR 211 (Keuls p.115/116/117, Einot-Gabriel (1.10), Ryan p.321, Duncan p.5/p.16,
Newman (10)) plus two additional print observations found by this review
(Keuls p.117 sigma/sqrt(3); Welsch p.571 WSD example)."""
import subprocess, re, sys
from fractions import Fraction as F
from math import sqrt, comb
from scipy.stats import t as tdist, studentized_range

HEAD = "044078d3b19ff3307dc347b0b9e7ecbbed1750c6"
PATH = "governance/drafts/release-3-preparation/semantic-source-acquisition-result.md"
blob = subprocess.run(["git", "-C", sys.argv[1], "show", f"{HEAD}:{PATH}"], capture_output=True, text=True).stdout
m = re.search(r"### K\.5\..*?```python\n(.*?)```", blob, re.S)
code = m.group(1)
print("--- K.5 verbatim rerun ---")
out = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True)
print(out.stdout.strip())
assert out.stdout.strip().splitlines() == ["partitions checked: 2712", "NK two-block limit: 39/400", "two-mean augmented-F/range-squared: 1/2"]

# (2) Euler pentagonal recurrence for p(n)
p = [1] + [0]*20
for n in range(1, 21):
    s = 0; k = 1
    while True:
        g1 = k*(3*k-1)//2; g2 = k*(3*k+1)//2
        if g1 > n: break
        sign = 1 if k % 2 else -1
        s += sign*p[n-g1]
        if g2 <= n: s += sign*p[n-g2]
        k += 1
    p[n] = s
print("independent partition count sum_{t=2..20} p(t) =", sum(p[2:21]))
assert sum(p[2:21]) == 2712
# A/B budget: exhaustive check for t<=20 is K.5's; general proof is in the review text.

print("--- Keuls p.115 ---")
print("2983.03/12 =", F("2983.03")/12, "=", float(F("2983.03")/12), "; 2983.03/24 =", float(F("2983.03")/24))
print("16713.74/12 =", float(F("16713.74")/12), "; F=1392.81/124.29 =", round(1392.81/124.29,3), "; sqrt(124.29)=", round(sqrt(124.29),3))
print("--- Keuls p.116/117 ---"); print("176.0-97.7 =", float(F("176.0")-F("97.7")))
print("sigma/sqrt3 = 11.15/sqrt(3) =", round(11.15/sqrt(3),4), "(printed 6,45); 33.61/5.22 =", round(33.61/5.22,4), "; 18.80/2.92 =", round(18.80/2.92,4))
print("t_.975,24*sqrt(2/3)*11.15 =", round(tdist.ppf(.975,24)*sqrt(2/3)*11.15,3), "(printed 18,80; t printed 2,064 ->", round(2.064*11.15*1.414/1.73,3),")")
print("q_.05(p,24) for p=13..2:", [round(studentized_range.ppf(.95,p,24),2) for p in range(13,1,-1)], "(Keuls prints 5,22;5,14;5,05;4,95;4,83;4,70;4,54;4,38;4,18;3,90;3,53;2,92 read from a graph)")
print("--- Einot-Gabriel (1.10) ---")
n=1; y=[0,2]; s=1
T1 = (max(y)-min(y))*sqrt(n)/s
T2 = (sum(n*v*v for v in y) - (sum(n*v for v in y))**2/(2*n))/s**2
print("T1^2 =", T1**2, "; T2 =", T2, "; T2/T1^2 =", F(T2)/F(T1**2), "(printed factor 2)")
print("--- Ryan p.321 ---"); print("1-(1-.01)^5 =", 1-F("0.99")**5, "=", float(1-F("0.99")**5), "(printed .0490099501)")
print("(5*4/2)*(2/(6*4)) =", F(5*4,2)*F(2,6*4), "(printed 5/6)")
print("--- Duncan p.5 / p.16 ---")
print("R(p,30,.95^(p-1)):", [round(studentized_range.ppf(.95**(p-1),p,30),3) for p in range(2,8)], "(printed 2.89 3.04 3.12 3.20 3.25 3.29)")
print("3.643*Q:", [round(3.643*q,2) for q in (2.89,3.04,3.12,3.20,3.25,3.29)], "(printed 10.53 11.07 11.37 11.66 11.84 11.99)")
print("100*.95^(p-1):", [round(100*.95**(p-1),2) for p in range(2,8)], "; .95^100 =", round(100*.95**100,2), "%")
print("--- Newman (10) ---"); print("t_.975,f*sqrt2:", [round(tdist.ppf(.975,f)*sqrt(2),2) for f in (5,10,20,30)], "; t_.995,f*sqrt2:", [round(tdist.ppf(.995,f)*sqrt(2),2) for f in (5,10,20,30)])
print("q_.05(5,30), q_.05(6,30) =", round(studentized_range.ppf(.95,5,30),2), round(studentized_range.ppf(.95,6,30),2), "; q_.05(5,5), q_.05(6,5) =", round(studentized_range.ppf(.95,5,5),2), round(studentized_range.ppf(.95,6,5),2))
print("--- Welsch p.571 WSD example (SNK values q_.05(p,20)) ---")
print([round(studentized_range.ppf(.95,p,20),2) for p in (5,4,3,2)], "(p.571 prints 4.23, 3.96, 3.28, 2.95 inside the WSD averages)")
print("--- Welsch p.575 NKA t=5 nu=20 ---")
lv = {5:.05, 4:.05, 3:.03, 2:.02}
print([round(studentized_range.ppf(1-lv[p],p,20),2) for p in (5,4,3,2)], "(printed 4.23, 3.96, 3.93, 3.58)")
print("--- Einot-Gabriel (1.17)/(1.18) at alpha=.05,k=7 ---")
print("gamma NK, R, D for p=2..6:", [(p, .05, round(1-.95**(p/7),4), round(1-.95**((p-1)/6),4)) for p in range(2,7)])
print("Bernoulli: 1-(1-a)^(p/k) >= a p/k for 2<=p<=k<=7:", all(1-.95**(p/k) >= .05*p/k - 1e-15 for k in range(2,8) for p in range(2,k+1)))
