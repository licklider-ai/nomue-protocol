# Proposed output-design dispositions

All choices below are development proposals, not issued Contract wording or
steward adoption. Q1-Q3 correspond to the fixed PR #330 review intake. The
owner-directed principles are carried forward; the detailed graph and schema
design are coordinator proposals requiring independent review.

| Question                  | Candidate.4                                                 | Proposed successor                                                                                                                      | Closure still needed                                                                           |
| ------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Q1: judgment dependencies | Integrity and expected-context equality gate D0 conformance | Record-local conformance does not depend on caller-context or digest agreement; arithmetic and forwarding retain explicit prerequisites | New local validator, graph/reason ownership, crossed tests and changed-surface review          |
| Q2: report versus refusal | Schema and noncanonical-storage failures refuse             | Safe, routable, faithfully referencable failures produce scoped reports; unsafe or unrepresentable invocation failures refuse           | Versioned report/refusal schemas, reference policy, precedence and multi-bundle tests          |
| Q3: constant schema row   | Report implies schema admission, so the row always passes   | A genuine schema-result row can complete with pass or fail; storage has its own result                                                  | Exact result shape, ownership and mutation controls; no silent reinterpretation of candidate.4 |

## Scope and dependencies

Labels below are planning names, not allocated check or Requirement IDs. Every
result needs a version-owned identity, evaluated scope, execution state, and
owned reason policy. Conformance and verification remain separate; no aggregate
success, scientific-validity judgment or new p-generation claim is added.

First enforce raw/parsed admission and select an exact supported bundle. A
report is possible only if the selected output protocol can faithfully represent
the input and every reported state. Then apply this proposed dependency graph:

| Result                      | Section      | Preconditions to evaluate                              | Meaning of a completed failure                                            |
| --------------------------- | ------------ | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| S: Record schema            | Conformance  | Safe parse, selected schema, faithful report reference | Input fails the selected Record schema                                    |
| K: stored-byte canonicality | Conformance  | S passes; canonical projection is available            | Original stored bytes differ from their required canonical representation |
| D: D0 relationships         | Conformance  | S passes                                               | Represented declarations violate the D0 relationships                     |
| H: selected Holm admission  | Conformance  | D passes                                               | Selected family/input/ownership violates the bounded Contract domain      |
| I: digest agreement         | Verification | S and K pass; stored-byte projection is available      | Stored-byte projection digest disagrees with the declared digest          |
| C: caller-context binding   | Verification | S passes; supplied expected context safely inspected   | Valid expected context differs from the Record                            |
| A: arithmetic comparison    | Verification | K, D, H, I and C all complete/pass                     | Supported recomputation differs from the declared exact/display result    |

S failure leaves K/D/H/I/C/A not_run. D failure leaves H/A not_run, but does not
suppress I/C. K failure makes I not_run; it does not suppress D/H/C. I or C
failure does not suppress D/H. Arithmetic remains gated:
the proposal does not broaden the numerical claim to unmatched requests. Logical
independence does not require parallel evaluation or unbounded work.

Missing, unreadable or schema-invalid expected context makes C an execution
error with no pass/fail outcome, not a false mismatch or a Record schema failure.
Record-local results remain reportable if completing and serializing the entire
bounded operation is safe. S failure prevents inspection of expected context.
Unexpected internal failure or an exceeded resource limit instead follows the
whole-invocation refusal rule below; do not treat those as mere context errors.

This changes the old linear depends_on chain, but preserves
`not_run_with_blocking_reason_codes`. Every not_run row identifies both its
blocking prerequisite rows (exact versioned identities) and their actual reason
codes. A blocked prerequisite's reasons propagate transitively. For several
blockers, retain all blocking identities and the deduplicated union of their
reasons, ordered by declared prerequisite order and each source row's reason
order. This applies also to S/K/D/H conformance prerequisites. No generic
`prerequisite_failed` alone, missing blocker, fabricated reason or unrelated
reason satisfies the policy. Serialization order is not a dependency model.

This preserves CORE NRS-VERIFY-0017 and gives every failed, errored or not_run
row the reasons required by NRS-VERIFY-0012. Local candidate spellings remain
unissued; the adopted mapping will use registered codes. The successor does not
select PR #330's `not_run_with_prerequisite_reason` preview alternative. Exact
wire ownership for prerequisite identities is still a versioned schema change,
not a reason to weaken propagation or silently expand the meta-schema constant.

Crucially, do not obtain Record-local conformance by synthesizing an expected
context from that Record and invoking the existing equality-gated verifier.
Implement explicit bounded local validation. C always uses independently supplied
expectations, never derived defaults. Preserve original bytes throughout.

## Faithful-report admission and refusal precedence

A report reference carries valid supplied Record/revision identities and the
independently computed digest of the received stored bytes' integrity-excluded
projection, never a reserialized parsed-value projection or the declared digest.
These are inspected-input references, not authenticated identities or proof of
successful verification. With K fail, the reference identifies the rejected
stored-byte projection; it is not asserted to be a valid canonical Record content
digest. I is not_run and no bytes are accepted for storage/exchange or forwarded.
The successor report contract makes this failure-reference meaning explicit;
candidate.4's report schema is not silently reinterpreted.

Let B be the unchanged received bytes. Build P(B) by bounded lexical extraction
after strict parsing: remove exactly the top-level decoded `integrity` member,
including its following comma if another member follows; otherwise remove the
preceding comma through the end of that member's value. Start at the key's opening
quote when removing the following comma; include intervening bytes in the removed
span. If it is the sole member, remove its key-through-value span. If absent,
P(B)=B. Retain every byte outside that span, including whitespace, key order,
number/string spellings and a trailing newline. Never remove a nested member or
text inside a string. This raw-preserving rule must be implemented/tested for
noncanonical and schema-invalid input; candidate.4's canonical-only helper is
not evidence that it already works. Non-object or unrepresentable input refuses.

The reference digest is SHA-256 of `nomue/record-content/v1` + LF + P(B), in the
existing `sha256:` lowercase-hex form. K compares B with JCS(parsed B), without
substitution. Only after S/K pass does I compare the stored-projection digest
with the declared digest. On that S/K-pass path, independently compare P(B) with JCS of the parsed
top-level projection excluding integrity; disagreement is a canonicalization
refusal, not an alternate success route. A matching re-canonicalized digest alone
can never yield I pass. K failure leaves D/H/C eligible and I/A not_run.

Unavailable canonicalization, projection extraction or digest computation always
refuses under NRS-CANON-0005, including when S would fail. K has no
projection-unavailable state in a report: S fail can make K not_run, but a
canonicalization failure cannot. Never infer a partial digest, truncate identity,
substitute expected-context identity or invent a reference. This verifier may
serve as an ingress gate: a diagnostic K-fail report rejects admission and keeps
the original bytes unaccepted, satisfying NRS-CANON-0016. Successful I and
forwarding preserve NRS-CANON-0017 / NRS-VERIFY-0027.

| Situation                                                                                | Proposed output                                     | Boundary                                                                         |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Bounded schema-invalid input with valid references and computable projection             | Report: S fail; dependent rows not_run              | A selected schema, not a guessed/default bundle, supplies the judgment           |
| Missing/invalid reference or unavailable projection                                      | Refusal                                             | No invented identity/digest to force a report                                    |
| Routable/schema-valid but noncanonical stored bytes                                      | Report: K fail; other eligible local rows evaluated | Canonical projection for inspection does not repair or forward modified bytes    |
| Valid context that disagrees                                                             | Report: C fail; D/H unaffected                      | Mismatch is not nonconformance or refusal                                        |
| Missing/unreadable/invalid expected context                                              | Report: C error, no outcome; D/H unaffected         | Only within safe, bounded execution; otherwise refusal                           |
| Strict parse/Unicode/duplicate-key failure, unsupported or missing bundle                | Refusal                                             | Keep established pre-routing rejection priority and no fallback bundle           |
| Resource exhaustion, unsupported host, setup failure, cancellation or invalid completion | Refusal                                             | No partial successful report or forwarding; unknown cause is not invented as OOM |

Retain fixed ingress priority. An outer deadline, resource, cleanup or output
validation failure supersedes any provisional inner result. If safety/host loss
prevents producing even a refusal artifact, absence of output is not success.
Refusal selection belongs to the verifier output protocol, never an input bundle.
The final join must explicitly define new refusal reasons without changing old
bundle/report semantics or pretending candidate labels are registered reasons.

## Candidate.4 refusal migration

This table covers all twelve candidate.4 refusal kinds. It is a proposed
successor mapping, not permission to reinterpret existing outputs. Resource,
canonicalization and lifecycle refusal precedence still applies to every row.

| Candidate.4 kind           | Successor disposition                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `schema_error`             | S fail report if the reference and raw projection are representable; otherwise invocation refusal with an owned unrepresentable-input reason                       |
| `noncanonical_storage`     | K fail report, I/A not_run, with stored-projection reference; inability to compute a faithful reference still refuses                                              |
| `expected_context_error`   | C error report with no outcome for safely handled missing/invalid expected context                                                                                 |
| `input_access_error`       | Expected-only missing/unreadable input becomes C error if Record inspection can complete safely; Record access/invocation failure remains refusal                  |
| `parse_error`              | Record parse/eligibility failure remains refusal; safely diagnosed expected-only syntax/eligibility failure becomes C error, never normalized input                |
| `canonicalization_failure` | Remains refusal for Record projection/digest failure or projection disagreement; expected-only schema/eligibility errors use C error only when safely classifiable |
| `resource_limit`           | Remains refusal, including expected-input limits and late overrun                                                                                                  |
| `routing_error`            | Remains refusal, no default bundle                                                                                                                                 |
| `unsupported_bundle`       | Remains refusal, no compatible-version guess                                                                                                                       |
| `unsupported_execution`    | Remains refusal, not a Record result                                                                                                                               |
| `execution_cancelled`      | Remains refusal, no partial report                                                                                                                                 |
| `internal_error`           | Remains refusal, including setup, output validation and cleanup failures                                                                                           |

The final verifier-level refusal schema needs an explicit owned reason for
unrepresentable input; its permanent spelling is not allocated here. Do not
translate a reason without also checking which input and failure stage it names.
For legacy Phase 1/2A bundles, a supplied expected-context argument is rejected
as an unsupported invocation argument before interpretation; it is not silently
ignored or used to add C to legacy reports. Legacy calls without that argument
retain their existing results. This is an additive caller-API boundary requiring
versioned invocation reasons and a fixture, not a legacy bundle meaning change.

Forward only the original input bytes, and only when every required row completes
and passes and the full controlled lifecycle succeeds. A safe failure report may
contain independently completed scoped passes; that is not partial success on a
safety refusal. Reports and refusals remain mutually exclusive.

## Result representation and unchanged constraints

Replace candidate.4's constant schema metadata with a versioned conformance
result capable of truthful failure. S is completed/pass or completed/fail in a
report; schema evaluation that cannot complete safely does not fabricate either.
No old `conformanceResult` object is inserted into candidate.4. Choose the exact
successor shape with schemas, output identities and tests in the same change.

Preserve the bounded supplied-p ordinary unweighted all-pairs Holm operation,
exact binary64-lattice arithmetic, nearest/even display, declaration scope,
scientific exclusions, and `input_evidence.availability=not_observed` proposal.
Comparison tolerances belong only to the public-check version, with rationale
and vectors, never to Records. Do not add known-size measurement to fill metadata.

The existing Linux/x64 Node 24.19.0 / Python 3.12.14 evidence is a candidate tuple,
not a universal platform decision. Preserve the broader Linux/Windows/macOS goal;
each additional admitted host needs enforcement and evidence of its own. Do not
claim this design implements that portability or permanently narrows the goal.
