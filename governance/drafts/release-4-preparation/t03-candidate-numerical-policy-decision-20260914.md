# Release 4 T03 candidate numerical policy decision

Status: selected, unissued Release 4 candidate policy, 2026-09-14.
This follow-up records the user's explicit D01-D07 selections for candidate
preparation. It does not issue Protocol requirements, register a check or bundle,
enable public support, or adopt an authoritative specification.

## Decision source and fixed inputs

The user instructed this task to record D01=A, D02=A, D03=A, D04=A, D05=A,
D06 outside the current candidate, and D07=A, including the aggregation,
CLI and report implications below. This record transcribes those selections;
it is not an autonomous selection by the drafting assistant.

The user reports that the Decision Packet, independent review, repair, further
independent review and Decision Arbiter adversarial evaluation are complete,
and that T02 has `T02 CLOSE - GO`. Those are user-supplied process dispositions.
This intake does not invent reviewer identities, raw artifacts or additional
independence evidence. In-thread drafting and author-context checks are not
independent reviews. No T05 research-sufficiency judgment is made here.

- Main comparison input M: `b0946163aed30a39119336434e2029b96096fd57`.
- PR #331 input P: `2732a26fd61d4e726fbd95b4d7622574cfcd9d82`.
- Public discussion input: `21453d82109106e9e811571383228dcef8f60fac`;
  opening RFC blob `807e4bf0c22e5270b8fc15824329d04b5c37b146`.
- The [opening RFC](opening-rfc-candidate.md) and
  [opening receipt](public-discussion-opening-2026-09-09.md) retain their bytes.
- The experimental policy and coupling input are the versions of
  `controlled-execution-experiment-20260912/POLICY.md` and `COUPLING.md`
  at P. The explicit T03 follow-up notes now linked from those documents do not
  rewrite the meaning of their historical captures or reviews.

This separate informative decision record follows the preparation's
[acceptance-record convention](normal-model-steward-acceptance-2026-09-09.md).
Authority remains with the targets assigned under [AUTHORITY.md](../../../AUTHORITY.md).
The D labels below are task-local references, not issued Requirement identifiers.

## Preserved mathematical scope and output inventory

Retain balanced replicated fixed 2-by-2 inference, the full A/B/AB model,
declared contrast directions, exact represented-input targets, and the three
marginal upper tails. No confidence intervals for effects, multiplicity guarantee,
causal claim, wider design or post-admission calibration guarantee is added.

The experiment's 13 real quantities are three signed estimates, three effect
sums of squares, SSE, three F values and three probabilities. They are not the
entire public result inventory. The RFC also requires four cell means, four
cell counts and residual degrees of freedom. All their required comparisons
remain; the experimental three df pairs do not create extra public fields.
Cell counts and residual df use exact integer comparison. Intercept and coded
coefficients remain internal rather than additional mandatory public outputs.

## Selected candidate decisions

### D01 = A: correctly rounded public values and strict comparison

Compare each declared numerical result with the binary64 value obtained by the
R4 public projection of its exact mathematical target. Use nearest,
ties-to-even projection, subject to the zero, probability and finite-domain
conditions below. Arithmetic targets derive from the exact values of parsed
binary64 observations; tails derive from exact F, not displayed F.

Comparison is strict equality of the eligible public binary64 values; no empirical
tolerance is introduced. Counts and df remain exact integers. Distinct decimal
spellings that parse to the same eligible value are not a numerical mismatch.
Display formatting never supplies the comparison rule.

No particular internal algorithm is imposed. A producer or emitter nevertheless
needs the ability to generate or obtain conforming public values. Ordinary
floating-point statistical outputs can mismatch because intermediate rounding
or operation order yields a different value. Such a mismatch means disagreement
with this Public Check version's declared-result contract, not scientific falsity.

The selected tradeoff favors reproducible public results while leaving internal
technique and product workflow to Layer 2. The producer burden is explicit under
the [Charter's minimum-standardization boundary](../../../CHARTER.md).
Comparison semantics belong to the applicable Public Check version under
[NRS-CANON-0006](../../../canonicalization/numerical-comparison.md).
A future tolerance-based check can be designed as a separate version and bundle;
[NRS-VERSION-0009](../../../spec/versioning/public-check-versioning.md) prevents
silent reinterpretation of registered comparisons.

### D02 = A: distinguish exact zero from rounded zero

For effects, SS and F, permit nonzero targets that project to zero while
distinguishing them from exact zero in verification evidence. Exact arithmetic,
not a displayed zero, drives dependent mathematics. Do not infer an absent
population effect from either kind of observed zero.

Introduce no distinct public negative-zero token semantics. An internal negative
estimate can project to signed zero; its public numerical representation is zero,
with the relevant projection state retained as evidence rather than a public
`-0` token. This generation rule does not normalize received negative-zero input.
Raw negative-zero tokens remain rejected under
[NRS-CANON-0015](../../../canonicalization/record-canonicalization.md).

SSE is different:

- Declared SSE = 0: structural conformance failure.
- Exact SSE = 0: the RFC's mathematical computability failure; no defined F/tail.
- Exact SSE > 0 with public projection = 0: representation/computability refusal.
  A complete result cannot satisfy the RFC's positive declared SSE condition.

The third case is not an ordinary declared-result mismatch and does not assert
zero residual variation. These decisions depend on D01=A.

### D03 = A: no positive-tail underflow match

A positive mathematical tail that projects to zero is underflow, not exact p=0.
Do not pass a public declared p=0 as a match for that positive tail.

The complete-output and controlled-execution experiments may retain a zero
encoding and its enclosure as internal diagnostics/evidence. Their internal
complete outcome is not public comparison pass and cannot establish a complete
matching public BTF result in this case. This is the limited interpretation of
the historical policy row "Positive tail rounds to zero".

Do not import Release 2's normal-only probability policy. Positive subnormal
probabilities are evaluated under R4's own projection contract. Retain the
distinction between exact F=0 giving p=1 and projection to an endpoint; rounded
display is not a mathematical endpoint claim.

### D04 = A: retain the conservative finite boundary

Retain the candidate boundary that refuses an exact magnitude above maximum
finite binary64 for a required public arithmetic output. This is an R4 project
convention, not an IEEE requirement. Some larger exact magnitudes could round
back to maximum finite under IEEE nearest rounding; this candidate still refuses
them. Boundary failure is representation/domain refusal, not declared-result
mismatch. It is not permission to emit infinity or omit a mandatory result.

The [IEEE source confirmation](../../../review-inputs/r4-ieee-clause-confirmation-20260911/REPORT.md)
supports that distinction, not a whole supported-domain decision. A later
Public Check version and bundle may relax the boundary with appropriate evidence
and review. No resource limit or platform is selected by this decision.

### D05 = A: no required producer probability interval

In the current public candidate the producer declares the RFC's `p_value`.
Numerical enclosure/evidence generation and validation are responsibilities of
the verifier and its Public Check. Do not add the experimental submitted interval
carrier to the required Record payload.

This follows the RFC's closed payload and result inventory together with its
check-owned evidence and comparison responsibilities. CANON-0006 does not by
itself prohibit every possible producer evidence mechanism. Adding one in future
would be a separate public-surface proposal, not an implementation detail within
this candidate.

### D06 = outside the current R4 candidate

Do not select a submitted interval acceptance policy here. Preserve the current
consumer experiment as fixed-candidate consistency research, not a generic
interval truth verifier. Its conservative containment can reject a tighter valid
interval and does not independently establish the candidate's mathematical truth.

The prior A/B alternatives remain undecided for a future optional evidence
proposal. D05=A removes them from the present public-candidate decision set.
The earlier optional/required join in COUPLING is historical preparation context,
not authority to add a required producer carrier now.

### D07 = A: sound candidate sets and indeterminate comparisons

After the relevant boundary and dependency conditions pass, let C be a proven
sound set containing the true public projection for a quantity, and d its
declared value. Here C denotes possible public projections, not the historical
consumer's probability enclosure bearing the same letter.

- C = {d}: pass.
- d is not in C: fail / mismatch.
- d is in C and other candidates remain: indeterminate.

Use this rule only with evidence that C contains the true public projection.
An empty or unsubstantiated set is not a mismatch proof. Unresolved projection
does not automatically imply an indeterminate comparison: a declared value
outside a proven set can already be disproved. An enclosure can support this
reasoning only when its induced projection set is sound; inspecting its two
endpoint encodings is not enough if intermediate encodings remain possible.

Do not fabricate a unique recomputed value for an unresolved quantity.

For a normally completed evaluation within one Public Check scope:

- All mandatory comparisons pass: pass.
- At least one mismatch is proved: fail.
- No mismatch is proved and a mandatory comparison remains undecided:
  indeterminate.

Preserve a proved mismatch when another quantity remains undecided. These are
scoped judgments, not an overall VERIFIED result. Provisional findings from an
invalid or failed execution do not become completed judgments under this rule.

Timeout, crash, worker failure, malformed output and other execution failures are
not indeterminate. A dependent check whose preconditions do not hold remains
not_run under existing principles. The BTF declared-design admissibility carrier
retains its pass/fail domain; this numerical choice does not make it indeterminate.

## Required downstream CLI and report changes

These are fixed candidate requirements for later integration work, not changes
to authoritative requirements, schemas or the reference verifier in this task.

### CLI implications

- All applicable mandatory checks pass: success bucket.
- A report contains a failed check: fail bucket, retaining any indeterminate
  results in the report.
- No fail, but an indeterminate check is present: a nonzero indeterminate bucket
  is needed.
- Refusal, error and not_run are not disguised as pass or indeterminate.
  The first rule is not a vacuous success rule for skipped mandatory checks.

[NRS-VERIFY-0025](../../../spec/verification/relying-party-interface.md) currently
has no indeterminate-only bucket; NRS-VERIFY-0028 prohibits treating indeterminate
as pass. Current reference aggregation can return zero for a hypothetical report
with passing conformance, no fail and an indeterminate result. This is a source
inspection implication, not evidence that current supported bundles emit that
state. R4 may be the first supported use of this outcome.

A new numerical check alone cannot silently redefine the global CLI contract.
The corresponding CLI/public-interface contract and report handling need an
explicit coupled change during the appropriate T06-T09 work. No numeric exit
code is allocated here, no existing bucket is reinterpreted, and old-bundle
behavior is not changed by this record.

### Report evidence implications

For each quantity, identify as applicable:

- Declared value.
- Confirmed recomputed projection, or a sound candidate set/enclosure.
- Decision and reason.
- Required projection state, including exact-zero versus rounded-zero.

Retain exact result and quantity association, including cell or contrast keys,
revision, bundle and Public Check version. An undecided quantity has no invented
`recomputed` value. A proved mismatch with unresolved projection also needs honest
set/enclosure evidence rather than a fabricated point. The RFC currently sketches
declared/recomputed quantity entries; its successor evidence representation needs
an explicit delta for this case. Formal schema design and registration belong to
T06/T07 or the appropriate later integration task.

## Candidate delta, dependencies and discussion boundary

The original RFC remains the immutable opening input. This separate follow-up
fixes its numerical choices and records the required downstream interface delta;
it does not imply that those choices were present at discussion opening.

- D01 -> D02: the rounded-zero treatment assumes the selected strict projection.
- D05 -> D06: no submitted public carrier, so acceptance alternatives stay outside.
- D01 <-> D07: comparison semantics determine provable mismatch versus uncertainty.
- D03/D04 -> D07: underflow and domain refusals are distinct from undecided checks.
- D07 -> later check graph, report evidence and CLI contract integration.

D01 affects the producer contract and interoperability. D07 affects public CLI
semantics and report evidence, beyond internal numerical implementation.
Assess the actual changed clauses, public surfaces, compatibility and highest
affected tier under [the RFC process](../../RFC.md) before authoritative adoption.
Do not infer an automatic clock reset, exemption, or approval of a new window.

The opening receipt's earliest unchanged-scope decision time,
2026-10-09T05:59:47Z, is historical context, not an approved earliest adoption
date for every downstream delta. Expiry alone is not adoption.

## Preservation and remaining task boundary

No numerical source, test, oracle, captured result or evidence manifest is changed.
In particular, the T02 capture manifest's preservation claims describe its pinned
execution/review inputs. They are not rewritten to certify these later policy
annotations or the unimplemented public candidate.

The historical complete-output design, rational composition and submitted
consumer remain experimental evidence within their original scope. Read their
output/projection behavior together with this later candidate disposition;
historical review approval is not approval of a new public adapter.

The candidate choices in this record are selected, not pending owner A/B choices.
T04 resource/domain selection, T05 research sufficiency, formal requirement and
registry issuance, supported bundles, public schemas, production verifier/CLI
changes and release decisions remain separate tasks. None is performed here.
No main merge or public discussion post is part of this intake.

Record preparation: OpenAI Codex in the existing authoring conversation,
transcribing the explicit user decision. No new independent review is claimed.
