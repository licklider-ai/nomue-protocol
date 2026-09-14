"""Controlled receipt faults; not a claim of inducing an unkillable kernel task."""
import copy
import json
import sys
from common import require
from delivery import finalize

completed={'execution':'completed_candidate','result':{'sentinel':'already computed'}}
base={'cleanup_ok':True,'report':completed,'report_sha256':'fixed-research-hash'}
require(finalize(copy.deepcopy(base))['result']==completed['result'],'normal delivery')
failed=copy.deepcopy(base); failed['cleanup_ok']=False
out=finalize(failed)
require(out=={'execution':'execution_refusal','reason':'cleanup_failure','result':None},'cleanup overrides previously computed success')
require(failed['report'] is None and failed['quarantined_report_sha256']=='fixed-research-hash','no completed report exposed after cleanup failure')
for reason in ('full_invocation_deadline','container_exit','missing_report'):
    out=finalize({'cleanup_ok':True,'report':None,'outer_failure':reason})
    require(out['result'] is None and out['execution']=='execution_refusal','missing report never numerical outcome')
out=finalize({'cleanup_ok':True,'report':None,'container_final':{'OOMKilled':True}})
require(out['reason']=='tree_memory_limit' and out['result'] is None,'OOM failure classification')
print(json.dumps({'checks':7,'optimize':sys.flags.optimize,'scope':'controlled final-delivery receipt faults; real cleanup/termination is measured separately'}))
