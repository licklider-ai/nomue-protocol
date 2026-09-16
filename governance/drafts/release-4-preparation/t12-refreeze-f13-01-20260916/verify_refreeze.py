"""Verify the post-F13-01 T12 re-freeze without generating evidence."""
from __future__ import annotations
import hashlib, json, subprocess
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
SOURCE="c62ba0f4ffe0e7a1992968f84adc81bd4546b217"
REPAIR="84627967352206e9d1ecc54c5ca6a735319d9785"
EVIDENCE="e449956c705133445d947187c14efa82e5590032"
ORIGINAL="752a3ef876f27595cca31c4a106e70ffc7bd04df"
BASE="3880db43a64e1758494f3c78f6850daab0e3e9e9"
STATUS="UNISSUED CANDIDATE"
def req(ok,msg):
    if not ok: raise ValueError(msg)
def git(*args):
    return subprocess.check_output(["git","-c","safe.directory="+ROOT.as_posix(),"-C",str(ROOT),*args])
def digest(data): return hashlib.sha256(data).hexdigest()
def main():
    m=json.loads((HERE/"FREEZE-MANIFEST.json").read_text(encoding="utf-8"))
    req(m["status"]==STATUS and m["candidate_source_commit"]==SOURCE,"candidate source")
    req(m["original_t12_frozen_target"]==ORIGINAL,"original target")
    req(m["original_t12_manifest_sha256"]=="f43cd0d1b3ba0042425139e77975199ba24a0e1db96aa65d18bf8bf997bfe3fb","original manifest")
    for older,newer in zip(m["candidate_ancestry"],m["candidate_ancestry"][1:]): git("merge-base","--is-ancestor",older,newer)
    git("merge-base","--is-ancestor",ORIGINAL,REPAIR); git("merge-base","--is-ancestor",REPAIR,EVIDENCE); git("merge-base","--is-ancestor",EVIDENCE,SOURCE); git("merge-base","--is-ancestor",SOURCE,"HEAD")
    for unwanted in ("e5ee16b7f2b8c4e4f67defa4965b6934faae678c","d4058691eb79440e1791ebbf2c7a61cafd6f6002","07b373655110afb34ab4bcc3933f83c69fba6f2c"):
        req(subprocess.run(["git","-C",str(ROOT),"merge-base","--is-ancestor",unwanted,SOURCE]).returncode!=0,"main integration in candidate lineage")
    seen=set()
    for item in m["inventory"]:
        key=(item["source_commit"],item["path"]); req(key not in seen,"duplicate inventory"); seen.add(key)
        data=git("show",item["source_commit"]+":"+item["path"]); req(digest(data)==item["sha256"] and len(data)==item["bytes"],"inventory "+item["id"])
    for item in m["package_files"]:
        data=(HERE/item["path"]).read_bytes().replace(b"\r\n",b"\n"); req(digest(data)==item["sha256"] and len(data)==item["bytes"],"package "+item["path"])
    old=git("show",ORIGINAL+":governance/drafts/release-4-preparation/t12-whole-candidate-freeze-20260915/FREEZE-MANIFEST.json"); req(digest(old)==m["original_t12_manifest_sha256"],"original manifest bytes")
    prefix=HERE.relative_to(ROOT).as_posix()+"/"
    post=git("diff","--name-only",SOURCE,"HEAD").decode().splitlines()
    req(all(path.startswith(prefix) for path in post),"post-source change outside re-freeze package")
    for path in ("CHARTER.md","AUTHORITY.md","authority","registries","schemas","spec","conformance","canonicalization","reference/verifier/src","generated"):
        req(not git("diff","--name-only",BASE,SOURCE,"--",path).strip(),"protected drift "+path)
    req(not git("diff","--name-only",ORIGINAL,REPAIR,"--","governance/drafts/release-4-preparation/t10-independent-expectation-corpus-20260915").strip(),"T10 original drift")
    req(not git("diff","--name-only",ORIGINAL,REPAIR,"--","governance/drafts/release-4-preparation/t10-independent-expectation-corpus-revision-2-20260915").strip(),"T10 corrected drift")
    rec=json.loads((HERE/"REPRODUCTION-RECEIPT.json").read_text(encoding="utf-8")); manifest=(HERE/"FREEZE-MANIFEST.json").read_bytes().replace(b"\r\n",b"\n")
    req(rec["result"]=="PASS" and rec["candidate_source_commit"]==SOURCE,"receipt")
    req(rec["freeze_manifest"]["sha256"]==digest(manifest),"receipt manifest hash")
    req(rec["new_semantics_introduced"] is False and rec["formal_surfaces_changed"] is False and rec["release_4_issued"] is False,"preservation flags")
    print(json.dumps({"result":"PASS","source_commit":SOURCE,"inventory_items":len(m["inventory"]),"package_files":len(m["package_files"]),"status":STATUS}))
if __name__=="__main__": main()
