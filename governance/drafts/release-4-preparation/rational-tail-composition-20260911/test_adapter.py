"""Author-side cross-formula tests; no investigator independence claim."""
from pathlib import Path
from fractions import Fraction as Q
import json, math
from adapter import prepare, compose, tail
from rational_oracle import oracle, projection

counts={}
def check(name, condition):
    if not condition:
        raise AssertionError(name)
    counts[name]=counts.get(name,0)+1

def reject(name, fn, message):
    try: fn()
    except ValueError as e: check(name,str(e)==message)
    else: raise AssertionError(name)

p=Path(__file__).resolve().parent
rows=json.loads((p.parent/'tail-feasibility-20260910/results.json').read_text())
for row in rows['rows']:
    q=Q(float.fromhex(row['f_hex']))
    try:
        result=tail(q,q,row['n'])
    except ValueError as e:
        check('fixed corpus explicit budget refusal',str(e)=='rational work budget' and row['n']==65 and row['f_hex']=='0x1.0000000000000p+100')
    else:
        check('fixed corpus embedding',result['encoding']==int(row['round_binary64_bits'],16))
check('fixed admission counts',counts.get('fixed corpus embedding')==219 and counts.get('fixed corpus explicit budget refusal')==1)
# Remaining checks below use exact represented inputs and a distinct tail formula.
for n in (2,3,4,8):
    for q in (Q(0),Q(1,3),Q(4),Q(17,7),Q(1,1<<2200),Q(1<<2200)):
        result=tail(q,q,n)
        ob=oracle(q,n,512)
        check('rational oracle overlap',max(result['bounds'][0],ob[0])<=min(result['bounds'][1],ob[1]))
        if result['encoding'] is not None and projection(ob) is not None:
            check('rational rounded agreement',result['encoding']==projection(ob))
check('exact n4 F4',tail(Q(4),Q(4),4)['bounds'][0]<=Q(35995,524288)<=tail(Q(4),Q(4),4)['bounds'][1])
cells=[[-.5,.5],[1.5,2.5],[3.5,4.5],[7.5,8.5]]
for contrast, f in zip(('A','B','AB'),(100,36,4)):
    carrier=prepare(cells,'fixture-1',contrast)
    check('exact raw F',carrier['lower']==f)
    check('point composition',compose(cells,'fixture-1',contrast,carrier)==tail(Q(f),Q(f),2))
    for key,value in [('digest','wrong'),('revision','wrong'),('contrast','AB' if contrast!='AB' else 'A'),('df',8),('n',3),('sse',Q(3))]:
        reject('binding rejection',lambda:compose(cells,'fixture-1',contrast,dict(carrier,**{key:value})),'carrier binding')
    reject('false interval',lambda:compose(cells,'fixture-1',contrast,dict(carrier,lower=Q(f+1),upper=Q(f+2))),'upstream containment')
    broad=compose(cells,'fixture-1',contrast,dict(carrier,lower=Q(0),upper=Q(f+1)))
    point=tail(Q(f),Q(f),2)
    check('wide contains point enclosure',broad['bounds'][0]<=point['bounds'][0]<=point['bounds'][1]<=broad['bounds'][1])
    check('wide unresolved',broad['status']=='unresolved' and broad['encoding'] is None)
tiny=math.ulp(0.)
carrier=prepare([[0.,tiny]]*4,'tiny','A')
check('positive SSE rounded zero',carrier['sse']>0 and float(carrier['sse'])==0)
check('exact zero effect',compose([[0.,tiny]]*4,'tiny','A',carrier)['encoding']==0x3ff0000000000000)
reject('exact zero SSE',lambda:prepare([[1.,1.]]*4,'zero','A'),'exact SSE is zero')
reject('nonfinite',lambda:prepare([[0.,math.inf]]*4,'bad','A'),'observations')
reject('bool input',lambda:prepare([[False,1.]]*4,'bad','A'),'observations')
reject('count guard',lambda:prepare([[0.]]*4,'bad','A'),'count')
reject('rational budget',lambda:tail(Q(1<<6501),Q(1<<6501),2),'expected nonnegative Fraction within 6500-bit budget')
reject('interval order',lambda:tail(Q(2),Q(1),2),'F interval')
check('precision exhaustion',tail(Q(1,3),Q(1,3),2,(8,))['status']=='unresolved')
small=[[-1.,1.],[-1.,1.],[-1.,1.],[0.,tiny]]
carrier=prepare(small,'small','A')
check('raw positive F rounded zero',carrier['lower']>0 and float(carrier['lower'])==0)
check('raw small composition',compose(small,'small','A',carrier)['status']=='resolved')
huge=[[0.,tiny],[0.,tiny],[1.,1.],[1.,1.]]
carrier=prepare(huge,'huge','A')
check('raw finite F beyond binary64',carrier['lower']>Q(float.fromhex('0x1.fffffffffffffp+1023')))
check('raw huge composition',compose(huge,'huge','A',carrier)['status']=='resolved')
for width in (1100,2200,6500):
    q=Q(1<<(width-1))
    reject('candidate work refusal',lambda:tail(q,q,65),'rational work budget')
    reject('oracle work refusal',lambda:oracle(q,65),'rational work budget')
mid=(Q(1,2)+Q(float.fromhex('0x1.0000000000001p-1')))/2
check('midpoint ambiguous',projection((mid-Q(1,1<<100),mid+Q(1,1<<100))) is None)
# Fixed independent oracle boundary remains inside its cap; exhaustion is explicit.
check('oracle boundary budget',oracle(Q(256),65,512)[3]<=512)
(p/'RESULTS.json').write_text(json.dumps({'checks':counts,'total':sum(counts.values())},indent=2)+'\n')
print(counts)
