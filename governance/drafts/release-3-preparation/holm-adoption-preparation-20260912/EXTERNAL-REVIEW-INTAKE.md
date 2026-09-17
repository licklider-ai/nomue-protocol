# Fixed-head external review intake and open design questions

Recorded 2026-09-13 UTC by the continuing author/coordinator. Source: the owner
supplied an external review in the conversation. This is an attributed English
intake of that report, not a reviewer-authored artifact or a new independent
review by this coordinator. The external probe script and raw execution logs
were not supplied. No extra human attestation is inferred.

## Fixed target, provenance and disposition

- Reviewed PR: #330.
- Reviewed head: `8262f8b7312888400e1cb0ce82efc53a004f7a55`.
- Base: `4a62f8e1768049560cb0ce8f09ef1676cb42130b`.
- Reviewed tree: `cff2b08a1d2a4cdd49a4e3302f70e2986e4447b5`.
- Reviewer reported Claude with configured `claude-fable-5-1`; the delivered
  model could differ. The reviewer reported no authorship or repair involvement
  in PR #330. These are attributed disclosures, not independently authenticated
  model/session identity claims.
- Reviewer environment: Node 22.22.2 / Python 3.12.3, different from pinned
  Node 24.19.0 / Python 3.12.14. The reviewer reported envelope and packet-check
  failure solely at the snapshot Node field, with no other observed difference.
  This intake does not convert those failures into passing full-suite execution.
- No original PDFs or B-2 numerical review were reinspected. Byte identity of
  candidate.py, worker.py and bridge.mjs was outside this review's scope.
  The author's separate numerical pins and replay remain separate evidence.
- Reported verdict: output separation is implementation-sound; bounded
  reuse/readiness is acceptable conditional on recording questions 1 and 2 in
  RFC #274. Adoption is not acceptable. Questions 1 through 3 need explicit
  steward design disposition; no immediate candidate.4 code repair was requested.

The coordinator accepts this as an attributed fixed-target changed-surface
review input. M4 as a whole remains open: conditional bounded readiness is not
complete coupling, research-gate closure, an independent numerical verdict,
steward acceptance, adoption, or release. A future changed implementation needs
review of its exact changed scope. This intake does not approve its own additions.

## Reported checks and limits

The reviewer reported passing the existing 14 separation controls, 93 public
controls, and nine fixed fixtures. Another 14 independently authored mutation
probes reportedly produced the expected accept/reject results. The supplied
summary describes examples rather than supplying all 14 executable probes:

- semantic conformance not_run with fabricated all-pass verification;
- reversed integrity not_run / declaration fail ordering;
- admission fail combined with arithmetic pass;
- conformance error rows, inconsistent section scopes, duplicate/extra rows;
- schema-admission not_run, injected legacy conformanceResult shape;
- coexistence of the old checks field and pass-row details.

Reported inspection confirmed schema validation precedes flattenChecks,
prefixItems fixes each stage/check reference, and allPass uses the original
five-row order before projection, preserving original-byte forwarding gates.
The fixture author imports no candidate implementation; the reviewer accepted
its independent expected-value construction. This does not claim a separately
qualified statistical oracle or independent primary-source review.

The six supplied SHA-256 values were independently matched locally by this
coordinator against the reviewed tree during intake:

| Path relative to release-3-preparation                  | SHA-256                                                          |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| holm-separated-candidate-20260912/public.mjs            | f5b3c7fd152ca9224e462f7e7914234e3fcbee714d71d3184f57aec8d57e2d08 |
| holm-separated-candidate-20260912/report.schema.json    | d2f75f3a68cd1f340c4b63e4075f2fc05b214b506f9f294380b96666d0bdf5a7 |
| holm-separated-candidate-20260912/refusal.schema.json   | bf53252010db84600eaff9d0f0a94664e26908b683705e362924a726d76e965a |
| holm-separated-candidate-20260912/envelope.mjs          | 54d3919c7776ada400b065f785535777d5bf5ea6b621dc84cbaa7d92b6ac00c8 |
| holm-separated-candidate-20260912/test_separation.mjs   | 39574a9202b5d1831567ac96a60180a9c7c7a8b21495b387f0c29d692e780a7b |
| holm-adoption-preparation-20260912/CONTRACT-PROPOSAL.md | 8aaa23ee702f9e50647eb3c0fc77ed44891f61e2d81350ace84b8054a592c6cb |

## Question 1: conformance and verification dependency direction

Observed difference: Phase 1's public-check gating description runs verification
after conformance and keeps integrity independent of profile checks. Candidate.4
runs integrity, context, declaration, admission, then arithmetic. Its first two
verification rows gate semantic conformance. Incorrect caller expected context
therefore leaves Record-local D0 conformance not_run.

The reviewer raised possible tension with NRS-VERIFY-0005. Coordinator
qualification: that CORE requirement mandates separate reporting; the gating
paragraph is explicitly informative and describes Phase 1. Reversed order is
not by itself proof of violating that CORE clause. Nevertheless, prospective
multi-bundle consumers cannot safely assume common gating semantics without an
explicit policy. The review also raises the different digest-failure behavior.

Steward decision needed before adoption: retain and explicitly version the
context-bound semantic judgment, or introduce a separately scoped Record-local
conformance judgment before verification. The preferred direction for further
design is to distinguish bounded Record-local conformance from caller-context
binding, while preserving strict raw-input admission, resource controls and
truthful not_run outcomes. This is a coordinator proposal, not a decision or
instruction to reorder candidate.4 now.

Closure evidence: exact dependency graph and requirement ownership; fixtures
for good/bad context crossed with valid/invalid D0, digest mismatch and resource
refusal; legacy results unchanged; no fabricated passes or unsafe extra work.

## Question 2: schema failure as report or refusal

Observed difference: Phase 1/2A emits schema failure as report conformance fail;
candidate.4 refuses it after exact bundle selection. Its schema_error,
noncanonical_storage and expected_context_error vocabulary is not the current
registered verifier-refusal vocabulary. The latter describes no interpreted
Record and is selected by the verifier output protocol, independently of bundles.

The reviewer argues that schema failure can produce a normal failure report and
therefore should follow the existing report path. Coordinator qualification:
NRS-CORE-0011 specifies what to do when a normal report cannot be produced; its
text alone does not establish the converse prohibition. Whether a faithful
report can be constructed depends on trustworthy reference fields, selected
schema and available context. Do not fabricate identifiers to force a report.
The compatibility and output-contract difference is real and remains open.

Steward decision needed before adoption: use a conformance-failure report where
the selected protocol can represent it faithfully, or explicitly extend and
version the verifier-level refusal contract with a justified boundary. The
preferred design investigation is reportable conformance failure for safe,
routable inputs and refusal for unsafe/unrepresentable invocation failures.
This is not blanket approval of either route or of new refusal kinds.

Closure evidence: a decision table covering parse/JCS failures, routing,
schema failure with valid or missing references, noncanonical storage, caller
context syntax versus mismatch, unsupported hosts and resource/internal errors;
versioned schemas and reason ownership; exact multi-bundle dispatch and positive
and negative fixtures. Refusal selection remains independent of Record input.

## Question 3: meaning of the constant schema-admission row

Observed difference: candidate.4 report.conformance.schema is always completed /
pass. It has schema_id but no check_id, scope or reason_codes and is not the
current authoritative conformanceResult shape. Failed admission yields refusal,
so the row is evidence of prior admission, not a full conformance outcome model.

Steward decision needed before adoption: explicitly define it as admission
evidence, remove redundant metadata, or replace it with an actual versioned
conformance result if question 2 chooses reportable failures. Prefer resolving
question 2 first; do not silently reinterpret or remove a candidate.4 field.
Closure evidence includes field ownership, schema-version impact and fixtures
that reject invented outcome states and unsupported legacy shapes.

## Minor observations and continuation

The public sections do not directly expose all five evaluation stages in order;
the order lives in flattenChecks, the preview depends_on chain and Contract
prose. prerequisite_failed is generic, so clients locate the first failed stage.
The eventual normative contract needs explicit, versioned dependency semantics.
The pass/fail-only outcome subset omits indeterminate; the reviewer accepted
this narrower outcome space. No unsupported outcome is added by this intake.

Record questions 1 and 2, together with question 3's dependent representation
choice, in [RFC #274](https://github.com/licklider-ai/nomue-protocol/issues/274).
Discussion records an unresolved delta, not an adopted decision. Assess affected
requirements and tiers after a concrete design exists. The current October 9
earliest unchanged-scope decision is not automatically valid for a material
scope change; any CORE change requires the RFC's separate tier/window process.

Continue with the unissued conformance/dispatcher/output-protocol join in
COUPLING.md after explicit design disposition. Preserve candidate.4 and its
reviewed bytes. No operative registry, implementation, numerical method,
authority assignment, gate state or release changes in this intake.
