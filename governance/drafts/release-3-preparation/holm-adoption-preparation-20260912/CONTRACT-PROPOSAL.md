# Supplied-p Holm adoption Contract proposal

Non-normative, unissued proposal for candidate.4. Local headings are review
locators; proposed Requirement ownership is in REQUIREMENTS.json. Binding
wording/anchors and registered identifiers can land only in the complete adopted
change set. The existing authoritative rules are not replaced by this document.

## Operation and complete declarations

The proposed first supported operation is ordinary unweighted Holm adjustment
of one selected complete all-pairs family in an explicitly declared independent
one-way design with 3..16 groups. Family size is exactly k(k-1)/2, hence 3..120.
One finite continuous observation belongs to each represented unit. All original
D0 relationship constraints apply. Other slots can declare the six existing
operation shapes, but no numerical support for those other methods is implied.
`payload.contract_id` identifies the single executed operation; operation_kind
identifies declaration shape, not a numerical Contract or library implementation.

The nine-field closed Record carries the complete declaration, selected inputs
and selected result. Caller-supplied expected context includes exact Record and
revision identity, the complete declaration (including unrelated analyses) and
all selected inputs. It is supplied separately, never constructed from the Record
by the verification operation. Its authenticity/truth remains the caller's
responsibility. Exact equality precedes private one-to-one D0 compatibility
conversion. That conversion never rewrites, normalizes, reseals or forwards a
modified Record. IDs, arrays, source-hypothesis tuples and member order remain
bound; source IDs alone need not be unique.

## Exact arithmetic and version-owned comparison

Inputs are exactly 16 lowercase big-endian binary64 hexadecimal characters.
Only [0,1] including positive zero is admitted. Negative zero, negative numbers,
values above one, infinity and NaN are rejected. Sidedness is retained without
p doubling or halving. No alpha, tolerance, algorithm or significance field is
accepted. The input target is the supplied representation, not an ideal unknown p.

With U=2^1074, decode each input to exact integer P=U*p. Sort by exact P then
original member index. At one-based rank i form (m-i+1)*P, take the prefix maximum,
clip to U, and restore original member order. adjusted_hex is the minimal lowercase
hexadecimal exact numerator (zero is 0). The denominator is owned by the check
revision, never supplied in a Record. display_hex is a single nearest binary64
projection of adjusted/U, ties to even. Exact integer arithmetic precedes it.
The arithmetic check owns zero exact-numerator and display-bit tolerances and
compares every row; a display collision never makes unequal exact values pass.
The relationship to sequential Holm rejection is limited to 0<alpha<1 in the
source derivation and creates no accepted alpha parameter here.

## Ingress, integrity and evaluation order

Record byte-type/size admission precedes strict UTF-8/JSON parsing. Duplicate
keys, invalid Unicode, negative zero and malformed syntax are rejected with the
existing strict parser before routing. Parsed depth, node, container and string
bounds precede exact bundle dispatch. Schema admission precedes canonical-storage
admission. Stored bytes equal their JCS representation; pretty printing or a
trailing newline is refused rather than repaired. Domain-separated SHA-256 uses
`nomue/record-content/v1` plus LF and the original top-level projection excluding
integrity; the canonical value projection independently agrees.

Private evaluation order is integrity, complete expected-context equality,
D0 relations, selected Holm admission/ownership, and arithmetic. Failed
prerequisites leave later results not_run; error never carries a pass/fail outcome.
Expected file access occurs only after Record ingress and integrity permit it.
The original bytes can be forwarded only after all five stages complete and pass,
with forwarding bound to exact Record/revision/digest and completed execution.

## Explicitly separated public output

A public report has two separate sections:

- conformance.schema records successful admission to the exact Record schema.
  A report exists only after schema admission; schema failure yields a refusal.
- conformance.checks contains declaration and admission in that order. These
  are represented structural/semantic consistency, not validity of the study.
- verification_results contains integrity, context and arithmetic in that order.
  Each result keeps its exact check revision and complete evaluated scope.

There is no top-level checks array and no aggregate conformance, verification or
scientific pass. A structural pass does not convert not_run semantic results to
passes. Serialization grouping does not change execution order. The validator
reconstructs the original five-stage order to check all gating/reason/scope
invariants. Refusals carry neither section and never forward bytes. The candidate
schemas constrain the role, count and exact identity of each row.

All failures use the versioned local candidate reason vocabulary; a prospective
bijective mapping to permanent reasons is in REGISTRY-PREVIEW.json. Candidate
labels are not registered NRS reason codes. Formal adoption changes the reason
vocabulary and affected schema/check/output identities together.

Outer cleanup, observed memory/task enforcement, cancellation, deadline, output
overflow, unsupported host, setup/input failure and abnormal/invalid completion
retain the exact outcomes.json precedence. Outer failure discards any inner
success. Unknown cause is never fabricated as OOM. The worker's execution error
is distinct from arithmetic disagreement. Checkpoint exhaustion discards partial
results; late processing exhaustion can supersede routing output, while raw/parsed
ingress refusals retain their documented priority.

## Selected input-size and execution proposal

Public refusal input_evidence is exactly availability=not_observed. It asserts
only that a reliable complete Record length is not carried by this public output.
It does not claim the implementation never reads bytes. Do not invent zero, use
output size, treat a cap-plus-one read as complete length, or reopen the path to
manufacture evidence. Known-size reporting is deferred; no new measurement method
is introduced merely to fill this field. This decision preserves useful truthful
refusals and has no effect on arithmetic support.

Admission is conjunctive: Record <=2,359,296 bytes; expected <=1,572,864 bytes;
depth <=36; parsed nodes <=28,736 (object keys excluded); <=1,024 entries per
container; <=4,096 UTF-16 code units per string/key. All inner D0/bridge bounds
also apply. Individual maxima do not imply their simultaneous realization fits.

The selected candidate execution is Linux x64, Node 24.19.0, Python 3.12.14,
fixed trusted programs and pinned dependencies. A shared in-process 5,000-ms /
512-MiB sampled JS-heap budget spans both input passes through serialization;
threshold equality passes and exceedance refuses. Checkpoints cannot preempt a
blocked computation and heapUsed excludes native/Buffer/ArrayBuffer allocations.
The outer 30-second deadline and cgroup limits are therefore retained: 512-MiB
charged leaf memory, swap zero, group OOM, 64 tasks and one CPU. The 30-second
budget starts before preflight; cleanup has a separate 3-second budget.

Required cgroup interfaces/delegation are tested and limits read back. No generic
Linux kernel version guarantee or non-root execution certification is asserted.
The supervisor and later receipt presentation lie outside call-leaf memory. Older
six-shape/36-trial admission measurements are bounded observations, not universal
cold-start or total-RAM guarantees. Successful lifecycle completion requires
reaping, empty/removed cgroups and temporary cleanup. Host loss or supervisor
SIGKILL needs an external owner; absence of output is never acceptance. Hostile
same-UID executable programs are outside the trusted-program boundary.

The candidate uses the existing NRS-SEC-0006 checkpoint approach. The historical
controller-only exemption proposal is not selected. The launcher is a reference
implementation technique; its exact Linux mechanism is not automatically made a
universal normative implementation requirement. An alternative implementation
needs evidence for equivalent declared outcome/resource obligations before its
execution environment is admitted.

## Guarantee exclusions and release boundary

Scientific validity, declaration truth, distributional model validity, causal
interpretation, standardized effect size, familywise error control and source
authenticity remain not_asserted. P generation is outside_scope. No significance,
interval, original-p correctness or unconditional FWER claim is created.

The other fourteen R3 candidates, 49 catalogue dispositions, Naik follow-up and
R4 work remain independent. Conditional R2 architectural reuse is reassessed
against any later R2 decision; no candidate spelling is treated as already issued.
RFC adoption, permanent allocation, full reference dispatch and publication remain
separate decisions and integration work.
