"""Verify saved measurement bindings, independent frozen results and actual failure causes."""
from collections import Counter
import json
from pathlib import Path
import sys
from common import data, sha, require, EXECUTION, NUMERICAL, IDENTITY

HERE=Path(__file__).resolve().parent

def main():
    folder=Path(sys.argv[1]) if len(sys.argv)>1 else HERE/'measurements'
    rows=[json.loads(line) for line in (folder/'MEASUREMENTS.jsonl').read_bytes().splitlines()]
    index=json.loads((folder/'CASE-MANIFEST.json').read_bytes())
    sources=json.loads((folder/'SOURCE-MANIFEST.json').read_bytes())
    host=json.loads((folder/'HOST.json').read_bytes())
    profiles=json.loads((HERE/'profiles.json').read_bytes())
    require(sources['inputs']['execution']['commit']==EXECUTION and sources['inputs']['numerical']['commit']==NUMERICAL,'snapshot commits')
    require(sources['cases_sha256']==sha(data(index)),'case manifest binding')
    require(host['image_runtime']['python']=='3.12.14' and host['image_runtime']['machine']=='x86_64','validation runtime')
    for name,digest in sources['harness'].items():
        if name!='ingress.cjs': require(sha((HERE/name).read_bytes())==digest,'measured harness bytes '+name)
    require(len(rows)==338 and all(r['check']=='PASS' for r in rows),'complete run plan and assertions')
    by_key={(r['profile'],r['mode'],r['case']):r for r in rows}
    require(len(by_key)==len(rows),'unique invocation keys')
    failure_causes={'transport':'internal transport bound','stdout':'worker:output_overflow',
        'stderr':'worker:output_overflow','timeout':'worker:deadline','cpu':'worker:cpu_limit',
        'crash':'worker:abnormal_exit','memory':'worker:allocation_failure','malformed':'worker:invalid_worker_output',
        'partial':'complete ordered output','wrong-identity':'candidate binding',
        'descendant':'worker:deadline','escaped-descendant':'worker:deadline','report-cap':'full report bound'}
    summaries={}
    checks=0
    for row in rows:
        profile=profiles[row['profile']]; item=index[row['case']]; report=row.get('report')
        require(row['input_sha256']==item['raw_sha256'],'raw input binding')
        require(row['cleanup_ok'] and row['container_final']['Running'] is False and row['container_final']['Pid']==0,'cleanup complete')
        require(row['cgroup_after_cleanup']['cgroup.procs'] in ('gone',''),'no surviving namespace descendants')
        require(row['cgroup_initial']['memory.max']==str(profile['tree_mib']*1024**2),'hard tree memory setting')
        require(row['runtime_config']['MemorySwap']==row['runtime_config']['Memory'],'no swap')
        if report:
            require(sha(data(report))==row['report_sha256'],'saved report bytes')
            require(report['mode']==row['mode'],'parent observed optimize')
            require(row['report_metrics']['report_bytes']<=profile['report'],'full report cap')
            for receipt in report['receipts'].values():
                require(receipt['worker_reaped'],'owned direct child reaped')
                require(receipt['bytes_buffered']['stderr']<=65536,'stderr cap')
            if 'worker_measurements' in report:
                require(report['worker_measurements']['mode']==row['mode'],'worker observed optimize')
            if report['execution']=='execution_refusal': require(report['result'] is None,'no partial numerical result')
            elif report['result'] is not None:
                require(report['result']==item['expected'],'frozen G5 result equality')
                require(report['result']['candidate_identity']==IDENTITY,'numerical identity')
                independent=item.get('independent_vector')
                if independent and independent['gate']=='eligible':
                    require([q['projected'] for q in report['result']['quantities']]==independent['target_codes'],'22 independent target codes')
                if report['result']['gate']=='supported-domain refusal': require(not report['worker_started'],'cost preflight before worker')
        require(row['final_outcome']['result']==(report or {}).get('result'),'final delivery binding')
        if row['final_outcome']['execution']=='execution_refusal': require(row['final_outcome']['result'] is None,'final execution refusal carries no numeric result')
        control=item.get('control')
        if control in failure_causes:
            require(report is not None and report['execution']=='execution_refusal' and report['reason']==failure_causes[control],'actual failure cause '+control)
        if control in ('parent-timeout','report-timeout','cleanup-escalation'):
            require(report is None and row['outer_failure']=='full_invocation_deadline','outer parent/report deadline')
        if control=='tree-memory':
            require(report is None and row['container_final']['OOMKilled'],'actual cgroup OOM, not simulated fault')
        if control=='escaped-descendant':
            require(len(row['cgroup_before_cleanup']['cgroup.procs'].splitlines())>=2,'escaped child alive before outer cleanup')
        checks+=1
    for (profile,mode,name),row in by_key.items():
        if mode==0:
            other=by_key[(profile,1,name)]
            require((row.get('report') or {}).get('result')==(other.get('report') or {}).get('result'),'normal/optimized semantic equality')
    for profile in profiles:
        rr=[r for r in rows if r['profile']==profile]
        completed=[r for r in rr if r.get('report') and r['report'].get('result') is not None]
        workers=[r['report']['worker_measurements'] for r in completed if 'worker_measurements' in r['report']]
        summaries[profile]={'runs':len(rr),'completed_candidate_results':len(completed),
          'max_full_invocation_wall_seconds':max(r['full_invocation_wall_seconds'] for r in rr),
          'max_normal_full_invocation_wall_seconds':max(r['full_invocation_wall_seconds'] for r in completed),
          'max_cleanup_seconds':max(r['cleanup_seconds'] for r in rr),
          'max_normal_tree_memory_peak_bytes':max(int(r['cgroup_before_cleanup']['memory.peak']) for r in completed),
          'max_report_bytes':max(r['report_metrics']['report_bytes'] for r in rr if 'report_metrics' in r),
          'max_worker_cpu_seconds':max(w['cpu_seconds'] for w in workers),
          'max_worker_wall_seconds':max(w['wall_seconds'] for w in workers),
          'max_worker_rss_kib':max(w['rss_kib'] for w in workers),
          'max_parent_rss_kib':max(r['report']['parent_rss_kib'] for r in completed),
          'max_parent_preparation_seconds':max(r['report']['phases'].get('parent_preparation',0) for r in completed),
          'max_ingress_seconds':max(r['report']['phases'].get('ingress',0) for r in completed),
          'max_raw_bytes':max(r['report'].get('raw_bytes',0) for r in completed),
          'max_transport_bytes':max(r['report'].get('transport_bytes',0) for r in completed),
          'max_worker_stdout_bytes':max(r['report']['receipts'].get('worker',{}).get('bytes_observed',{}).get('stdout',0) for r in completed),
          'max_rendered_witness_bytes':max((r['report']['result'].get('rendered_evidence_bits',0)+7)//8 for r in completed)}
    print(json.dumps({'checks':checks,'mode':sys.flags.optimize,'profiles':summaries},indent=2))
if __name__=='__main__': main()
