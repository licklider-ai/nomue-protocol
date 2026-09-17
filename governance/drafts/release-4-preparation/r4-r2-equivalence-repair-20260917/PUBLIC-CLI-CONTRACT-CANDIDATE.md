# R4 public CLI contract successor candidate

Status: **UNISSUED CANDIDATE**. **NON-AUTHORITATIVE**.
EQ-02 REPAIR IMPLEMENTED — CLOSE REVIEW PENDING.

This is a concrete proposal for final steward decision, not adopted CLI behavior.
It preserves [fixed T03 intent](../t03-candidate-numerical-policy-decision-20260914.md),
[T06 scope](../t06-candidate-requirement-surfaces-20260915/REQUIREMENT-CANDIDATE.md)
and [T09 lifecycle distinctions](../t09-check-report-lifecycle-20260915/REASONS.md).
It changes no implementation, stored result, formal ID or D01-D07 selection.
Pinned source bytes are in [INPUTS.json](INPUTS.json).

## Proposed interface and applicability

Proposed entry point: `nomue-record verify-btf <record.json>`.
Proposed interface revision: `balanced-two-factor-cli/0.1.0-draft.1`.
This label versions this CLI proposal; it is not a new Protocol identifier family
or an issued identifier. This document does not make the command available.

The proposed route recognizes only this exact unissued T06 bundle candidate:

`https://nomue.ai/id/bundle/balanced-two-factor/0.1.0-draft.1`

No prefix match, nearest-version guess, URI dereference or fallback is proposed.
Command selection is explicit. Giving a BTF Record to existing `verify` does not
select this contract. The legacy entry point and five-code contract remain
unchanged, including current unsupported handling of the unissued BTF bundle.

A legacy or different-version bundle sent to the proposed BTF-only route receives
unsupported-bundle refusal, code 3 and no report. Existing `verify` behavior for
issued ITGC minimal and guarantee bundles, including their pinned versions, does
not gain codes 6/7 or new indeterminate support. Separate entry point and exact
bundle/version binding prevent incompatible five- and seven-code contracts from
applying to one invocation.

## Proposed outcomes, codes and report coupling

Propose exactly seven exit codes: **0, 2, 3, 4, 5, 6, 7**. An exit code is
coarse automation metadata, not an overall VERIFIED result or scientific-validity
claim. Inspect the output discriminator and scoped results for their meaning.
No new report outcome, refusal kind or evidence quantity is introduced.

- **0 — completed all-pass.** A valid completed report exists. Conformance and
  every applicable mandatory check completed and passed. Missing checks, error
  and not_run never give vacuous success.
- **2 — completed with fail, or parse/canonicalization refusal.** A valid report
  with any conformance/check fail uses 2, retaining other indeterminate and
  dependency-gated results. Separately, parse_error (including invalid UTF-8) or
  canonicalization_failure uses 2 with execution refusal and **no report**.
  The output discriminator distinguishes the cases.
- **3 — reportless routing or unsupported-bundle refusal.** routing_error and
  unsupported_bundle use 3 with refusal and **no report**. This preserves the old
  meaning of 3; it never describes a returned report with unfinished checks.
- **4 — reportless safe resource refusal.** resource_limit uses 4 with refusal
  and **no report**. A result observed before invocation failure cannot survive
  as a completed report.
- **5 — reportless internal failure or inability to attempt verification.**
  internal_error uses 5 and no report. Usage error or unreadable input also uses
  5 and no report; when verification was not attempted, no fabricated Record
  reference or refusal/report object is required. Diagnostics are not a report.
- **6 — completed with indeterminate and no fail.** A valid report exists, all
  mandatory checks completed, no check failed, and a completed check is
  indeterminate. This is nonzero, not acceptance evidence under NRS-VERIFY-0028.
  The research number 6 is retained **as a proposal**, not because research code
  has authority.
- **7 — completed delivery with unfinished mandatory coverage and no fail.**
  A valid report exists, with a context-authorized not_run caused by a
  supported-domain or representation/computability gate. It is incomplete
  evidence, neither pass nor indeterminate. This **separates** the research
  report-bearing use of 3 into a new bucket. Delivery can complete while a
  required check remains unperformed.

Code 7 adds no computability predicate: T06/T09 gates still decide membership and
the report reason. Exact SSE=0 is a completed computability **fail** (2/report,
recomputation not_run). Positive SSE projecting to zero or documented
supported-domain exclusion is instead a gate refusal with the existing valid
report/not_run representation (7/report), not unsupported-bundle routing failure
or declared-result mismatch.

## Aggregation and precedence within valid reports

First apply the existing invocation/failure boundary. Parse, routing,
canonicalization, resource and internal failures select their reportless buckets.
Partial or late child reports cannot resurrect a completed judgment. Multiple
execution failures retain reviewed F-01 precedence; no new ordering among
failures is chosen here.

Then require a valid output envelope and report under the frozen T07/T09 context
and dependency rules. Missing mandatory entries, malformed reports, unexplained
not_run, or execution error masquerading as a completed report produce internal
failure (5/no report), not valid coverage for 0/6/7. This retains the fail-closed
boundary; it is not permission to suppress a valid fail.

For an admitted valid report:

1. Any fail selects 2, including fail plus indeterminate or authorized dependent
   not_run. Preserve the individual facts in the report.
2. With no fail, any indeterminate selects 6. In this candidate's graph, such a
   valid report has completed prerequisites and recomputation.
3. Otherwise authorized mandatory not_run selects 7.
4. Only complete mandatory all-pass selects 0.

The graph admits no no-fail report combining indeterminate recomputation with
unfinished prerequisites: T09 requires those prerequisites to pass before a
completed recomputation. Do not invent a new valid mixed state or change T03's
fail-before-indeterminate rule. A future graph admitting such a state requires
an explicit versioned decision.

No claim is made that a correctly completed eligible S-C computation produces
indeterminate. T06's deterministic capability remains distinct from generic
uncertainty controls. Code 6 supplies the already required envelope behavior;
synthetic controls do not prove actual S-C ambiguity. Resource exhaustion and
execution errors never become code 6.

## Research delta and proposed review vectors

[T09 exitCode/validateFinal](../t09-check-report-lifecycle-20260915/report.ts)
is research code, not the public contract. Its valid completed not_run path
currently returns 3; this proposal returns 7 for that same report. Research
fail 2 and unresolved 6 remain candidate values with validity/invocation
prerequisites explicit. T09 source and historical results remain unchanged.

These are proposed future contract vectors, **not tests run in this repair**:

- Complete pass report: 0/report. Fail with dependent not_run: 2/report.
- Fail with another unresolved quantity: 2/report retaining both outcomes.
- No fail, completed generic unresolved control: 6/report, never 0.
- Valid domain/representation-gated report, no fail: 7/report, never 3/6/0.
- Parse/invalid UTF-8 or canonicalization refusal: 2/no report.
- Routing/unknown exact bundle: 3/no report. Resource refusal: 4/no report.
- Internal failure: 5/no report. Usage/unreadable input: 5/no report.
- Missing mandatory check or illegal completed/error mixture: 5/no report.
- Late report after execution failure: existing failure bucket/no report.
- Issued bundles under legacy verify: unchanged old expectations; those bundles
  under the proposed BTF-only command: 3/no report.

## Requirement ownership and version treatment

Propose **successor Requirement candidate `NRS-VERIFY-0033`**, scoped to the new
BTF CLI revision above, with proposed sole owner
`spec/verification/balanced-two-factor-cli-interface.md`.
That file/anchor is not created. This is a collision-checked proposal, not a
reserved, registered, active or issued ID.

Choose a successor interface, not an additive rule conflicting with 0025 on the
same invocation. NRS-VERIFY-0025's active meaning and five-code verify applicability
stay intact. Future adoption would record the limited successor relationship and
explicit applicability in the public contract/Requirement registries, following
ID-POLICY's supersedes/superseded_by policy, preserving historical snapshots and
legacy applicability. It would neither rewrite 0025's meaning nor globally retire
legacy behavior. If the registry cannot express the boundary, resolve that
representation before adoption; never assign both tables silently to verify.

Proposed 0033 owns only CLI buckets, report/output coupling and automation reading.
T06's proposed owners remain:

- VERIFY-0029: exact result scope, quantity names and cell/contrast association;
  each of the 22 quantities compared once.
- VERIFY-0030: exact numerical targets, projection/comparison and supported domain.
- VERIFY-0031: quantity/outcome/evidence binding.
- VERIFY-0032: conformance gating, integrity independent of admissibility,
  registered procedures only and no Record-supplied code.
- CORE-0022: admissibility/eligibility lifecycle.

The CLI rule consumes these results without redefining them. T06's inventory
remains its original 16 candidates; the separate CLI successor is not silently
inserted into the frozen inventory.

At base `554818683d037d378ef3c11f1758b848adca1ec3`, exact tracked-tree search for
NRS-VERIFY-0033 found no matches, including the authoritative registry and T06.
[INPUTS.json](INPUTS.json) records the search/source hashes. Recheck before any
future issuance. No Protocol namespace, bundle or Public Check version is issued.

Future adoption needs coupled authoritative interface text, explicit Requirement
applicability/version metadata, public-contract registration, implementation and
contract vectors in the shared verifier project, plus applicable review and
governance. None occurs here. This repairs decision preparation; full A2/A3
implementation remains STRONGER-THAN-R2 for the benchmark.

## RFC, tier and discussion impact

D07's fixed distinction follows the opening numerical hold, but the entry point,
successor applicability and seven-code/report contract are a **material later
public-interface delta**, not merely wording and not silently part of RFC #261's
unchanged opening snapshot. This supplies a concrete surface for a separate
recorded impact assessment before adoption.

Current VERIFY-0025 and 0028 are EXPERIMENTAL. Proposed 0033 uses EXPERIMENTAL as
its candidate tier. That does not lower the parent RFC's recorded
STABLE-INTENT/30-day process. Apply the highest actually affected tier under the
[RFC process](../../../RFC.md) and
[stability registry](../../../../registries/stability-tiers.yaml).
If adoption changes CORE guarantee/interoperability semantics, the CORE process
(60 days and named-steward approval) applies. This legacy-preserving proposal
does not authorize such a change.

The [A1 RFC disposition](../r4-adoption-readiness-a1-20260917/RFC-261-DISPOSITION.md)
records the opening and unchanged-scope earliest date. This later CLI proposal
cannot assert that the existing 30-day clock already covers it. A separate
steward impact assessment needs the actual published delta, compatibility,
highest tier and adequate discussion under existing rules. No automatic clock
reset, start date, deadline or exemption is adopted. Time passing grants no
adoption. RFC #261 is not closed by this repair.

## Decision boundary

Close review assesses decision readiness for EQ-02. It does not adopt 0033,
authorize implementation, register a bundle, grant scientific meaning to
indeterminate, close the RFC or publish Release 4. T03 choices and all scientific
and numerical closures remain unchanged. Release 4 is **UNISSUED CANDIDATE**.
