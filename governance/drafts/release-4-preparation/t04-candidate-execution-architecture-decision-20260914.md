# Release 4 T04 candidate execution architecture decision

Status: informative, selected unissued candidate architecture, 2026-09-14.
Architecture invariants are frozen for subsequent candidate preparation only.
Concrete numerical semantics and reference parameters remain unselected.
This record does not issue requirements, register a Public Check or bundle,
enable support, change an implementation, close a Research Gate or complete T04.

## Decision provenance and fixed base

The user explicitly instructed this task to record the reviewed selections
E01=A, E02=A and E04=A, together with the E03/E05/E06 compatibility boundaries
below. The user reports completion of the T04 Decision Packet, Decision Arbiter
and independent Architecture Review, with zero BLOCKER findings, zero SHOULD-FIX
findings and `T04 ARCHITECTURE REVIEW - GO`.

These are user-supplied process dispositions, not newly established independent
review findings. This intake neither invents reviewer identities or raw review
artifacts nor claims a further independent review. Repository close review of
this transcription remains separate. Record preparation is by OpenAI Codex in
the existing authoring conversation, transcribing the explicit user decision;
the drafting assistant is not independently selecting the architecture.

- Direct base: T03 completed commit
  `d9ec6984f55f09caa2f65d7714af72190d63c6d4`.
- T03 disposition supplied by the user: `T03 COMPLETE - GO`.
- Preserved [T03 decision record](t03-candidate-numerical-policy-decision-20260914.md):
  D01-D07 remain selected; none is reopened here.
- Main comparison input: `b0946163aed30a39119336434e2029b96096fd57`.
- Preserved T02 / PR #331 input:
  `2732a26fd61d4e726fbd95b4d7622574cfcd9d82`.
- Preserved [opening RFC](opening-rfc-candidate.md) blob:
  `807e4bf0c22e5270b8fc15824329d04b5c37b146`.

This follows the separate informative candidate-decision convention of T03.
Under the [authority model](../../../AUTHORITY.md), it does not replace any
assigned normative owner. The [experimental policy](controlled-execution-experiment-20260912/POLICY.md),
[coupling record](controlled-execution-experiment-20260912/COUPLING.md),
[validation record](controlled-execution-experiment-20260912/VALIDATION.md) and
[execution input pins](controlled-execution-experiment-20260912/INPUTS.json)
retain their bytes and historical scope. Their behavior is not retroactively
reinterpreted as implementation of this architecture.

## Architecture Invariants - FROZEN

### E01=A: versioned public supported-domain architecture

Scientific and mathematical domain is separate from public supported domain.
The Public Check has an input-reproducible, versioned public supported-domain
predicate. A single upper count bound is not required: input-derived,
data-dependent predicates are allowed.

The predicate is defined independently of implementation. Python internal types,
object sizes and elapsed execution time do not define public membership.
Exact arithmetic may form part of admission preflight, but that preflight itself
has a bounded procedure. Producers can independently reproduce membership.

A normally completed proof that the predicate is false yields public
supported-domain refusal, not scientific inadmissibility. Failure to evaluate
the predicate because of a resource or execution failure is distinct from a
proof of non-membership; it supplies no fabricated membership decision.

The predicate is bound to the Public Check version and interpretation bundle.
Semantic updates that change membership are explicit version changes. This
record selects that ownership and architecture, not a concrete predicate or its
thresholds.

### E02=A: deterministic abstract bounded procedure

The Public Check uses a finite-stage deterministic abstract bounded procedure.
Its exact targets, projection rules and comparisons preserve T03. Domain,
representation and dependency conditions are evaluated before dependent
comparisons. Their refusals or failures are not candidate-set uncertainty.

For an eligible quantity, let d be the declared public value and C a sound set
containing the true eligible public projection. Refinement preserves soundness.
The selected architecture has these observable decisions:

- C={d}: quantity comparison pass.
- d not in C: quantity mismatch, provided C is a valid sound candidate set.
- d in C with other candidates: proceed to the next prescribed stage.
- Only after the prescribed final stage, if multiple candidates still include d:
  completed / indeterminate for that quantity.

An empty or unsound set is not mismatch evidence. It is not treated as successful
completion of the defined numerical procedure. No fictitious recomputed point
is created for an unresolved projection or a set-based mismatch.

Quantity-level early pass and mismatch are allowed. Processing does not stop
at the first unresolved quantity or contrast. All executable mandatory
comparisons are processed, dependent not_run states remain intact, and an
indeterminate quantity does not erase a proved fail. Within the normally
completed valid scope of the same check, T03 fail precedence and mandatory-pass
conditions remain in force. No all-Record VERIFIED judgment is created.

Internal algorithms, memory layout and implementation computation order are
not themselves prescribed by the Protocol. Implementations nevertheless
reproduce the observable decision semantics of the same Public Check version
when they complete normally, including its logical dependencies and stages.
A stronger private algorithm does not upgrade that version's prescribed
indeterminate result to pass or mismatch. Changing decision capability belongs
to a successor Public Check version.

This fixes the abstract architecture only. The concrete construction of C,
precision schedule, stage budgets and detailed stopping procedure remain open.

### E01/E02 parameter coupling

Supported-domain parameters and bounded-procedure parameters are not frozen
independently. They are evaluated jointly during later parameter selection and
Evidence Closure. A work guard containing a precision-derived constant may
change membership when precision changes; changing precision alone does not
establish that the domain contract remains unchanged.

### E04=A: R4 reference execution safety profile

A reference execution safety profile is separate from the numerical contract.
It assigns responsibility across the full invocation rather than treating a
worker watchdog as end-to-end coverage.

| Responsibility       | Coverage to establish                                                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Raw ingress / parent | Raw input bounds; parsing and structural checks; routing; canonicalization; exact preflight; parent-side time and memory; buffering |
| Worker               | Numerical execution; CPU; address space; wall supervision; pipes; trusted launch; process ownership                                 |
| Cleanup              | Cancellation; termination; kill and reap; file-descriptor and signal restoration; bounded cleanup                                   |
| Report               | Identity, completeness and grammar; candidate-set evidence; serialization; output bounds; refusal and error delivery                |

Public-supported means that a Record belongs to the Public Check's versioned
predicate for numerical processing. It does not promise completion on arbitrary
hardware, completion by the current reference verifier, or resolution to a
unique pass/fail judgment.

Reference-supported means the range for which evidence supports a claim that a
specified host, execution profile and caps can sustain the full invocation.
It is not established merely by satisfying a host tuple. Any future claim that
public-supported and reference-supported ranges coincide needs evidence for
that correspondence.

Existing SEC obligations are preserved. Processing-time enforcement,
heap/resource inspection, strict ingress and refusal semantics are not replaced
by worker supervision. Relevant obligations include NRS-SEC-0003/0006 in
[public checks](../../../spec/verification/public-checks.md); the
[existing security note](../../../security/phase-1-verifier-security.md) and
[in-process bounds decision](../../decisions/ADR-0022-in-process-time-memory-bounds.md)
explain their current implementation context. A needed change to an existing
contract goes through that contract's own change process.

RLIMIT_AS limits worker virtual address space, not Node heap, RSS, parent memory
or total process-tree memory. Worker wall supervision plus cleanup is not an
end-to-end latency SLA. Resource caps are not numerical-indeterminate stopping
rules. Timeout, crash, worker failure, malformed output or another invocation
failure does not turn into indeterminate. If the invocation fails, provisional
partial pass/fail judgments are not published as completed results.

### Resource caps and versioning

The following changes affect the Public Check version / interpretation bundle:

- Public supported-domain predicate semantics.
- Abstract numerical work budget.
- Observable numerical decisions.
- Stopping semantics.

A reference-only safety-cap change for completing the same numerical semantics
does not automatically require a Public Check version change. Reference-profile
revision, resource evidence and security/interface contracts still have their
own change management. It is not a way to conceal a changed public domain or
numerical decision under the label of an implementation optimization. See
[Public Check versioning](../../../spec/versioning/public-check-versioning.md)
and [interpretation bundles](../../../spec/versioning/interpretation-bundle.md).

### E03: initial reference validation basis

The initial basis is Linux, x86_64 and CPython 3.12.14 with the current required
lifecycle, signal and ownership conditions documented by the
[controlled-execution packet](controlled-execution-experiment-20260912/README.md).
These include main-thread supervision, ignored SIGPIPE, default SIGCHLD,
pidfd availability and exclusive child-reaping ownership, with the required
handler and descriptor restoration.

This is not a Protocol-wide OS, architecture or runtime requirement for all
conforming implementations. Kernel and executable hashes are evidence
provenance, not new allowlist requirements. The tuple alone does not establish
reference support or full-invocation coverage.

### E05: reuse of strict ingress and resource inspection

Reuse existing strict ingress and resource inspection, with explicit coverage
of the R4 invocation. Generated internal transport is not a substitute for
public raw-Record parsing, canonicalization, integrity or routing.

- The historical 1 MiB internal transport cap is not a public raw Record limit.
- Existing worker buffering is not a full report bound.
- Historical report sizes do not establish the maximum size of candidate-set
  evidence.

### E06: preserve scoped outcome classifications

T03 and existing authority continue to distinguish conformance fail,
admissibility fail, computability fail, supported-domain refusal, resource or
execution refusal, error, not_run and completed / indeterminate in their
applicable scopes. Predicate false, predicate evaluation failure and
mathematical inadmissibility are different conditions.

The [execution/outcome model](../../../spec/verification/execution-outcome-model.md)
and [relying-party interface](../../../spec/verification/relying-party-interface.md)
remain owners of their existing contracts. A started check that fails to reach
a judgment is not a completed numerical uncertainty result; an applicable
verifier-level resource refusal remains distinct from a check error.
Not-run and errored checks do not acquire outcomes. No reason code, CLI exit
code, report schema or registry entry is allocated here. T03's downstream
report and CLI obligations remain; timeout, crash, worker failure and malformed
output are not merged into indeterminate.

## Unselected Numerical Semantics - NOT FROZEN

The following still need joint selection and evidence:

- Exact public supported-domain predicate and mathematical definition.
- Upper n bound and exact-F / work thresholds.
- Candidate-set construction, including its observable numerical semantics.
- Precision schedule, stage-specific budgets and work-score formulas.
- Detailed stopping procedure within the selected finite-stage architecture.
- Full mandatory quantity integration, dependencies and aggregation.

Candidate-set construction is not merely a performance parameter. It contains
unselected numerical semantics that can change decisions; this architecture
record does not certify or select the experimental construction.

Historical research starting points, not formal candidate parameters, include:

- n upper bound 65.
- w <= 6500.
- a^2(w+512) <= 10,000,000.
- a^2 w <= 1,000,000.
- Precision schedule 128 -> 256 -> 512 bits.

In those historical expressions, a=2(n-1) and w is the maximum bit length of
the reduced exact F numerator and denominator. The expressions remain attached
to their [experimental numerical sources](tail-evidence-experiment-20260911/complete.py)
and [work guard](tail-evidence-experiment-20260911/budget.py), not an adopted
public support promise. Full integration includes the RFC's mandatory cell
means, counts, residual degrees of freedom and numerical contrast quantities;
this record does not implement or prove that integration.

## Reference Parameters - NOT FROZEN

CPU, wall, cleanup, memory, stdout/stderr, ingress/transport and report limits
are not selected parameters of an adopted reference profile.
The historical experiment retains these settings without modification:

| Historical setting      | Value           | Scope                                                      |
| ----------------------- | --------------- | ---------------------------------------------------------- |
| CPU soft / hard         | 25 / 26 seconds | Worker CPU limits                                          |
| Worker wall supervision | 30 seconds      | Parent-supervised worker invocation; not an end-to-end SLA |
| Cleanup wait            | 2 seconds       | Cleanup wait, not universal termination latency            |
| RLIMIT_AS               | 256 MiB         | Worker virtual address space                               |
| Stdout                  | 2 MiB           | Experimental output receipt                                |
| Stderr                  | 64 KiB          | Experimental diagnostic receipt                            |
| Internal input          | 1 MiB           | Generated internal transport                               |

These values are evidence conditions and research inputs, not parameters frozen
by this decision. Their existence or test coverage does not establish full
public-domain support, end-to-end safety or numerical correctness.

## Evidence Closure - OPEN

### EC1: public-domain basis

Establish the predicate's mathematical definition, bounded preflight, connection
to all mandatory quantities and rationale for each boundary. Distinguish proof
of non-membership from failure to evaluate membership. Evaluate E01/E02
parameters together, including any precision-dependent admission constants.

### EC2: bounded procedure

Establish candidate-set soundness, sound refinement, projection boundaries,
zero and underflow handling, stopping semantics, mandatory-comparison
aggregation and cross-implementation decision reproducibility. Select the
concrete numerical semantics only after the applicable evidence and review.

### EC3: reference full-invocation coverage

Establish coverage for ingress, parent, worker, cleanup and report, including
time, memory and output bounds across those responsibilities. Identify what is
measured, enforced or outside the claim; worker-only measurements do not certify
the full invocation or discharge existing SEC obligations.

### EC4: public/reference support mapping

State which range is reference-supported by which host and execution profile,
with its selected caps and applicable evidence. Establish any claimed inclusion
or equality between public-supported and reference-supported ranges instead of
inferring it from a host tuple or a finite collection of successful cases.

## Research Gate, preservation and downstream boundary

Architecture freeze does not waive the Research Gate or independent review for
a concrete public domain, numerical procedure, candidate-set construction or
externally grounded method. Existing experiments and review receipts are reused
only within their pinned scope. Neither T02 execution review nor the reported
T04 architecture GO proves unselected numerical semantics or future support.
The [RFC Research Gate](../../RFC.md) applies before the relevant promotion.

The opening RFC, T03 decision, PR #331 historical execution experiment,
historical POLICY behavior, evidence, review receipts and validation captures
are unchanged. Later T03 annotations already present at the direct base remain
intact. The historical experiment is not described as having implemented this
architecture from the start.

Only this new record and an additive preparation-index reference are part of
this freeze. No parameter selection, numerical proof, Evidence Closure work,
source/schema/registry/CLI implementation or T05 activity is performed.
Independent repository close review is the next review of this transcription;
EC1-EC4 remain open for separately authorized work.

Any later public-contract delta follows its affected owners, versioning and
highest-tier assessment under the RFC process. This record does not amend the
opening discussion, apply an unadopted clock-reset rule, establish a new window
or authorize adoption at window expiry. There is no public discussion post or
main merge in this task.

Task boundary: architecture recorded; parameters and Evidence Closure open;
T04 is not complete. No independent repository close verdict is claimed here.
