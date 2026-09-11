"""Resolve and record immutable repository inputs without replacing the base."""
import hashlib
import json
import subprocess
from pathlib import Path

BASE='dedd26a3e0655001b67e40ccfb741e43ecb07beb'
PROPOSAL='022c8699befbcba375e3aa6e07c1a8dd8eace483'
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
PREFIX='governance/drafts/release-4-preparation/'


def git(*args):
    return subprocess.check_output(['git',*args],cwd=ROOT)


def main():
    readfirst=['AGENTS.md','CHARTER.md','AUTHORITY.md','authority/authority-manifest.yaml','registries/requirements.yaml','governance/ID-POLICY.md','governance/RFC.md']
    named=[PREFIX+x+'.md' for x in ('public-discussion-opening-2026-09-09','opening-rfc-candidate','normal-model-steward-acceptance-2026-09-09','numerical-feasibility-workplan','ss-f-propagation-supplement','power-scale-exploration','power-scale-review-repair')]
    baseextra=[PREFIX+x for x in ('programme-steward-acceptance-2026-09-09.md','README.md','probes/ss-f-propagation.py','probes/ss-f-propagation-result.json','probes/power-scale-exploration.py','probes/power-scale-exploration-result.json','probes/power-scale-target-detail.py','probes/power-scale-target-detail-result.json')]
    baseextra += ['review-inputs/'+x+'/REVIEW-RESULT.md' for x in ('r4-normal-model-source','r4-normal-model-source-repair','r4-power-scale-exploration','r4-power-scale-exploration-close','r4-public-discussion-preparation','r4-programme-audit')]
    baseextra += ['package.json','pnpm-lock.yaml']
    proposalextra=['review-inputs/r4-opening-rfc-boundary/assessment-20260909/REVIEW-RESULT.md']
    commits={}
    files=[]
    for ref,paths in ((BASE,readfirst+named+baseextra),(PROPOSAL,named+proposalextra)):
        parts=git('show','-s','--format=%H %T %P',ref).decode().strip().split()
        commits[ref]=dict(commit=parts[0],tree=parts[1],parents=parts[2:])
        for path in paths:
            entry=git('ls-tree',ref,'--',path).decode().strip()
            if not entry:
                files.append(dict(commit=ref,path=path,present=False));continue
            blob=entry.split()[2];data=git('cat-file','blob',blob)
            files.append(dict(commit=ref,path=path,present=True,blob=blob,bytes=len(data),sha256=hashlib.sha256(data).hexdigest()))
    main=git('rev-parse','origin/main').decode().strip()
    diff=git('diff','--name-status',BASE,main).decode()
    result=dict(base=BASE,proposal=PROPOSAL,commits=commits,files=files,main_observed=main,base_to_main=diff,
        proposal_to_base=git('diff','--name-status',PROPOSAL,BASE,'--',*readfirst,*named).decode(),
        governance_directory_agents=git('ls-files','governance/**/AGENTS.md','governance/AGENTS.md').decode(),
        selection='BASE owns checkout and latest scaling correction. Separate proposal commit owns the opening and exact proposed target; no cherry-pick or silent substitution.',
        role='Lane 1 author with OpenAI Codex assistance; prior context summaries visible; not a blind or independent review; no subagents or human review in this execution.')
    (HERE/'INPUTS.json').write_text(json.dumps(result,indent=2,sort_keys=True)+'\n')
    print(json.dumps({'base_tree':commits[BASE]['tree'],'proposal_tree':commits[PROPOSAL]['tree'],'file_records':len(files),'main':main,'difference':diff}))

if __name__=='__main__':main()
