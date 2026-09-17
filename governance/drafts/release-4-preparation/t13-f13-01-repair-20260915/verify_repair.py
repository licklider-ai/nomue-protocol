"""Verify the bounded F13-01 repair packet without generating evidence."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
ORIGINAL="752a3ef876f27595cca31c4a106e70ffc7bd04df"
SOURCE="84627967352206e9d1ecc54c5ca6a735319d9785"
CHANGED={
 "governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/invoke.py",
 "governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/linux_tests.py",
 "governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py",
}
PROTECTED=("CHARTER.md","AUTHORITY.md","authority","registries","schemas","spec","conformance","canonicalization","reference/verifier/src","generated")

def require(ok,label):
    if not ok:raise ValueError(label)
def git(*args):
    return subprocess.check_output(["git","-c","safe.directory="+ROOT.as_posix(),"-C",str(ROOT),*args])
def sha(data):return hashlib.sha256(data).hexdigest()
def run(args):subprocess.run(args,cwd=ROOT,check=True)

def main():
    p=argparse.ArgumentParser();p.add_argument("--deep",action="store_true");a=p.parse_args()
    m=json.loads((HERE/"MANIFEST.json").read_text())
    require(m["original_t13_frozen_target"]==ORIGINAL,"original target")
    require(m["repair_source_commit"]==SOURCE,"repair source")
    require(set(git("diff","--name-only",ORIGINAL,SOURCE).decode().splitlines())==CHANGED,"repair change surface")
    for path in PROTECTED:require(not git("diff","--name-only",ORIGINAL,SOURCE,"--",path).strip(),"protected drift "+path)
    for path in ("governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915","governance/drafts/release-4-preparation/t10-independent-expectation-corpus-revision-2-20260915"):
        require(not git("diff","--name-only",ORIGINAL,SOURCE,"--",path).strip(),"T10 drift")
    old_manifest=git("show",ORIGINAL+":governance/drafts/release-4-preparation/t12-whole-candidate-freeze-20260915/FREEZE-MANIFEST.json")
    require(sha(old_manifest)==m["original_t12_manifest_sha256"],"original T12 manifest")
    for item in m["package_files"]:
        data=(HERE/item["path"]).read_bytes().replace(b"\r\n",b"\n")
        require(len(data)==item["bytes"] and sha(data)==item["sha256"],"package "+item["path"])
    t09=json.loads((HERE/"LINUX-T09-RECEIPT.json").read_text())
    require(t09["source_commit"]==SOURCE and t09["result"]=="PASS" and t09["run_id"]==34953342130,"T09 Linux binding")
    ff=[r for r in t09["selected_runs"] if r["case"]=="invalid-utf8"]
    require({r["mode"] for r in ff}=={0,1},"F13 modes")
    require(all(r["check"]=="PASS" and r["final_internal_cause"]=="invalid_utf8" and r["execution"]=="execution_refusal" and r["refusal_kind"]=="parse_error" and r["reason_codes"]==["NRS-PARSE-FAILED"] and r["exit_code"]==2 and not r["final_report_present"] and r["numerical_core_invocation_count"]==0 for r in ff),"F13 observables")
    t11=json.loads((HERE/"LINUX-T11-RECEIPT.json").read_text())
    require(t11["source_commit"]==SOURCE and all(r["exit_code"]==0 for r in t11["runs"]),"T11 Linux")
    win=json.loads((HERE/"WINDOWS-RECEIPT.json").read_text())
    require(win["source_commit"]==SOURCE and win["unit_suite"]["passed"]==517 and win["unit_suite"]["failed"]==3 and win["same_failure_shape_as_t11"],"Windows classification")
    candidate=json.loads((ROOT/"governance/drafts/release-4-preparation/t06-candidate-requirement-surfaces-20260915/CANDIDATE.json").read_text())
    require(candidate["bundle_binding"]["supported"] is False,"supported state")
    require(m["new_semantics"] is False and m["authority_changed"] is False and m["old_expected_changed"] is False and m["release_4_issued"] is False,"preservation flags")
    if a.deep:
        commands=[
          [sys.executable,"-B","governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py"],
          [sys.executable,"-O","-B","governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/test_f01.py"],
          ["pnpm","exec","tsx","governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts"],
          ["pnpm","exec","tsx","governance/drafts/release-4-preparation/t09-check-report-lifecycle-20260915/tests.ts","--optimized"],
          ["pnpm","exec","tsx","governance/drafts/release-4-preparation/t09-canonicalization-repair-20260915/focused.ts"],
          ["pnpm","check:generated"],["pnpm","check:phase1"],["pnpm","check:phase2a"],["pnpm","check:phase2a-021"],["pnpm","validate"],
        ]
        for command in commands:run(command)
    print(json.dumps({"result":"PASS","source_commit":SOURCE,"changed_files":len(CHANGED),"deep":a.deep,"status":"UNISSUED CANDIDATE"}))
if __name__=="__main__":main()
