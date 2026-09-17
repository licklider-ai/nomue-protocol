"""UNISSUED CANDIDATE. Assemble report encoding from fixed T07 definitions."""
import copy
import json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[3]
def read(p): return json.loads(p.read_text(encoding="utf-8"))
def write(n,x): (HERE/n).write_bytes((json.dumps(x,indent=2)+"\n").encode())
ids={x["key"]:x["id"] for x in read(HERE.parent/"t06-candidate-requirement-surfaces-20260915/CANDIDATE.json")["identifiers"]}
t07=read(HERE.parent/"t07-closed-schemas-validator-20260915/schemas/verification-report-balanced-two-factor-0.1-draft-1.schema.json")
reasons={
"NRS-PARSE-FAILED":"parse_error", "NRS-DUPLICATE-JSON-MEMBER":"parse_error", "NRS-INVALID-UNICODE-STRING":"parse_error", "NRS-NEGATIVE-ZERO-NUMBER":"parse_error",
"NRS-UNSUPPORTED-BUNDLE":"unsupported_bundle", "NRS-SCHEMA-INVALID":"conformance", "NRS-BTF-LOCAL-REFERENCE-INVALID":"conformance", "NRS-BTF-IDENTITY-AMBIGUOUS":"conformance", "NRS-BTF-CELL-COVERAGE-INVALID":"conformance",
"NRS-BTF-MODEL-NOT-DECLARED":"admissibility", "NRS-BTF-CELL-COUNTS-UNSUPPORTED":"admissibility", "NRS-BTF-UNIT-NOT-UNIQUE":"admissibility", "NRS-BTF-ZERO-RESIDUAL":"computability",
"NRS-DIGEST-MISMATCH":"integrity", "NRS-DECLARED-RESULT-MISMATCH":"mismatch", "NRS-BTF-SUPPORTED-DOMAIN-EXCLUDED":"supported_domain", "NRS-BTF-REPRESENTATION-UNSUPPORTED":"representation", "NRS-BTF-PROJECTION-UNRESOLVED":"unresolved",
"NRS-FILE-SIZE-LIMIT-EXCEEDED":"resource_limit", "NRS-NESTING-LIMIT-EXCEEDED":"resource_limit", "NRS-STRING-LIMIT-EXCEEDED":"resource_limit", "NRS-OBSERVATION-LIMIT-EXCEEDED":"resource_limit", "NRS-RESOURCE-LIMIT-EXCEEDED":"resource_limit", "NRS-TIMEOUT-LIMIT-EXCEEDED":"resource_limit", "NRS-MEMORY-LIMIT-EXCEEDED":"resource_limit", "NRS-INTERNAL-VERIFIER-ERROR":"internal_error", "NRS-CANONICALIZATION-FAILED":"canonicalization_failure"}
write("REASONS.json",{"status":"UNISSUED CANDIDATE","reasons":reasons,"new_spellings":["NRS-BTF-SUPPORTED-DOMAIN-EXCLUDED","NRS-BTF-REPRESENTATION-UNSUPPORTED","NRS-BTF-PROJECTION-UNRESOLVED"]})
def obj(properties,required=None):return {"type":"object","additionalProperties":False,"required":list(properties) if required is None else required,"properties":properties}
def ref(n):return {"$ref":"#/$defs/"+n}
reason={"type":"string","enum":sorted(reasons)}
reason_array={"type":"array","uniqueItems":True,"maxItems":len(reasons),"items":reason}
d=copy.deepcopy(t07["$defs"])
def tighten(x):
 if isinstance(x,dict):
  for k,v in list(x.items()):
   if k=="reason_codes" and isinstance(v,dict) and v.get("type")=="array": x[k]=copy.deepcopy(reason_array)
   elif k=="reason_code":x[k]=copy.deepcopy(reason)
   else:tighten(v)
 elif isinstance(x,list):
  for y in x:tighten(y)
tighten(d)
d["conformanceResult"]=copy.deepcopy(d["checkResult"])
d["conformanceResult"]["properties"]["check_id"]={"const":ids["conformance"]}
d["conformanceResult"]["properties"]["violations"]={"type":"array","maxItems":1,"items":ref("violation")}
d["conformanceResult"]["required"].append("violations")
d["conformanceResult"]["properties"]["outcome"]={"enum":["pass","fail"]}
d["checkResult"]["properties"]["check_id"]={"enum":[ids[k] for k in ["integrity","admissibility","computability","recompute"]]}
uri={"$ref":"urn:nomue:schema:common:identifier:0.1.0-draft.1#/$defs/uri"}
d["recordReference"]=obj({"record_id":uri,"revision_id":uri,"content_digest":{"type":"string","pattern":"^sha256:[0-9a-f]{64}$"}})
d["verifier"]=obj({"name":{"const":"nomue-r4-t09-research"},"version":{"const":"0.1.0-draft.1"}})
root=obj({"$schema":{"const":ids["report"]},"report_type":{"const":"nomue-verification-report"},"record_reference":ref("recordReference"),"interpretation_bundle_id":{"const":ids["bundle"]},"verifier":ref("verifier"),"generated_at":{"type":"string","const":"2026-09-15T00:00:00Z"},"conformance":ref("conformanceResult"),"verification_results":{"type":"array","minItems":4,"maxItems":4,"items":ref("checkResult")},"profile_eligibility":ref("profileEligibility"),"guarantee_boundary":ref("guaranteeBoundary"),"quantity_evidence":ref("quantityEvidence")})
root["required"].remove("quantity_evidence")
root.update({"$schema":t07["$schema"],"$id":ids["report"],"$comment":"UNISSUED CANDIDATE. T09 report root; T07 input and component semantics remain fixed. Contextual/aggregation invariants require report.ts as well as this closed shape.","$defs":d})
write("report.schema.json",root)
# Research invocation envelope has no new Protocol $id. Refusals reuse draft.3.
prov=obj({"t07_commit":{"const":"fb773cc2092678f8409c2f0d25289028356eeb86"},"t08_commit":{"const":"76542b5d0370fc51d60f22efda2af00cafe33ad1"},"numerical_commit":{"const":"66fa2bc201c86c62f21bb94825479427c24d8522"},"report_schema_sha256":{"type":"string","pattern":"^[0-9a-f]{64}$"}})
common={"status":{"const":"UNISSUED CANDIDATE"},"provenance":prov}
a=obj({**common,"execution":{"const":"completed"},"report":{"$ref":ids["report"]}})
b=obj({**common,"execution":{"const":"execution_refusal"},"refusal":{"$ref":"urn:nomue:schema:verifier-refusal:0.2.0-draft.3"}})
write("invocation.schema.json",{"$schema":t07["$schema"],"$comment":"UNISSUED CANDIDATE. Internal envelope, no public identity allocated.","oneOf":[a,b]})
