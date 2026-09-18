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
| I: digest agreement         | Verification | S passes; digest projection is available               | Independently computed digest disagrees with the declared digest          |
| C: caller-context binding   | Verification | S passes; supplied expected context safely inspected   | Valid expected context differs from the Record                            |
| A: arithmetic comparison    | Verification | K, D, H, I and C all complete/pass                     | Supported recomputation differs from the declared exact/display result    |

S failure leaves K/D/H/I/C/A not_run. D failure leaves H/A not_run, but does not
suppress I/C. K, I or C failure does not suppress D/H. Arithmetic remains gated:
the proposal does not broaden the numerical claim to unmatched requests. Logical
independence does not require parallel evaluation or unbounded work.

Missing, unreadable or schema-invalid expected context makes C an execution
error with no pass/fail outcome, not a false mismatch or a Record schema failure.
Record-local results remain reportable if completing and serializing the entire
bounded operation is safe. S failure prevents inspection of expected context.
Unexpected internal failure or an exceeded resource limit instead follows the
whole-invocation refusal rule below; do not treat those as mere context errors.

This changes the old linear depends_on chain. A not_run result identifies the
failed/error/not_run prerequisites using a deterministic version-owned reason
policy; serialization order is not a dependency model. Do not reuse a registry
policy that copies a blocking reason if the implementation emits a generic
prerequisite reason. Exact reason mappings are part of successor implementation.

Crucially, do not obtain Record-local conformance by synthesizing an expected
context from that Record and invoking the existing equality-gated verifier.
Implement explicit bounded local validation. C always uses independently supplied
expectations, never derived defaults. Preserve original bytes throughout.

## Faithful-report admission and refusal precedence

A report reference must carry valid supplied Record/revision identities and an
independently computed content digest under the selected projection. Such
identities identify the inspected declaration; they are not authenticated claims.
Never use placeholders, truncate identities, copy an unchecked declared digest,
or substitute an expected-context identity. If that reference or projection
cannot be constructed safely and represented faithfully, refuse without a
fabricated Record reference. A future nullable/reference-free report is not
implicitly authorized by this proposal.

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
