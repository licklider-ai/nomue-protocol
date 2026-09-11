# Supplied-p Holm Contract candidate

Informative proposal, revision `0.3.0-candidate.1`. The local section labels are
review locators, not Requirement IDs. Identifiers in identities.json are proposed,
unissued spellings. Nothing in this packet adds registered support.

## C1. One bounded operation

The operation checks ordinary, unweighted Holm adjustment of one complete supplied
family, together with its declaration and independently supplied expected context.
The Profile represents a one-way independent design with 3..16 groups and one
selected all-pairs family of exactly `m = k*(k-1)/2`, hence 3..120 members.
Every represented unit has one finite continuous observation; existing D0
population, membership, direction and ownership relations apply.

`payload.contract_id` identifies this operation directly. It is neither a library
name nor an alias for a method ID. The exact bundle binds that Contract, the
Profile, all five checks, the schemas and the comparison policy together.

The result asserts no scientific validity, validity of original p-values,
familywise error control, hypothesis truth, source authenticity, selection
chronology, significance, interval coverage or study eligibility. P generation
is outside scope. No alpha input, significance output, tolerance field,
weighted adjustment, p-value recalculation or other method is admitted.

## C2. Declaration and independent target

The nine-field Record envelope is closed. Its payload contains `contract_id`,
the complete declaration, selected inputs and selected result. Instance Record
and revision IDs are opaque URIs. Local analysis/family/result/member/origin IDs
are case-sensitive ASCII labels of 1..64 characters. No URI is dereferenced.

The caller supplies expected context separately: actual Record ID, revision ID,
complete declaration and complete selected inputs. This includes unrelated
analyses in the same declaration. The verifier does not derive the expected
target from a submitted Record. Authenticity of that external context remains
the caller's responsibility; the checker establishes equality, not provenance.

Each analysis and result slot declares an `operation_kind` from the six closed D0
shapes: omnibus, pairwise, many-to-one, planned contrast, multiplicity adjustment
or interval (exact machine spellings in declaration-shapes.json). These describe
declaration structure; they do not identify an executed scientific procedure.
Only the selected multiplicity-adjustment slot receives a numeric payload here.
Unselected slots remain bound declarations, not verified results. The operation
of this payload is owned solely by its exact Holm Contract ID.

This replaces synthetic `example-contract-*` references from the experiment.
After complete context equality, the private adapter restores those six labels
one-to-one to reuse unchanged D0 relationship validation. It also restores the
old private carrier revision and deferred marker. These are temporary internal
representations: stored Record bytes, public identifiers, digest and expected
context are never rewritten or resealed during verification.

Inputs preserve member order and each `(source_id, hypothesis_id)` tuple is
unique in the selected family. A source ID alone may repeat. Sidedness is a
declaration (`one_sided` or `two_sided`), with no p doubling or halving.

## C3. Exact target and display

Each supplied p is a 16-character lowercase hexadecimal big-endian binary64
encoding in [0,1]. Positive zero is admitted; negative zero, NaN and infinity
are rejected. The supplied encoding, rather than an unknown ideal p-value,
is the exact input to this Contract.

Let `U = 2^1074` and let `P[j] = U * p[j]` be the integer obtained by exact
binary64 decoding. Sort by `(P[j], original_index)` ascending. At sorted rank
`i` (one-based), define:

```text
T[i] = (m - i + 1) * P[sorted_index[i]]
A[i] = min(U, max(T[1], ..., T[i]))
```

Return each A to the original member order. `adjusted_hex` is its minimal
lowercase unsigned hexadecimal integer representation (zero is `0`). Its
denominator is the check-owned constant U, not a Record field.
`display_hex` is the nearest binary64 encoding of A/U with ties to even.
Only this final projection rounds. Positive zero represents exact zero.

The arithmetic check compares every exact numerator and every display bit
pattern; equality of rounded display alone is insufficient. Both tolerances
are exactly zero and owned by this check revision. Equal p-values retain their
original identities and receive equal adjusted values. No floating-point
multiply/accumulate loop defines the exact target.

The derivation's relationship to ordinary Holm rejection uses `0 < alpha < 1`;
alpha equal to one is excluded from that equivalence. This is a derivation
boundary, not an accepted alpha parameter or a scientific FWER claim.

## C4. Ingress and check order

Record byte type/size admission precedes decoding. Strict UTF-8 and the existing
strict-JSON parser reject malformed syntax, duplicates, invalid Unicode and
negative zero before parsed bounds and routing. Routing compares the bundle
string exactly. Unknown versions, alternate spellings and legacy bundles are
unsupported by this isolated candidate.

Next come finite-number admission and the closed Record schema, including
the exact Contract ID and Profile. Stored bytes then equal JCS bytes exactly:
pretty printing and a trailing newline are storage refusals. The content digest
uses the original byte projection removing the single root integrity member,
prefixed by `nomue/record-content/v1\n`. That projection also agrees with the
canonical parsed projection; canonicalization does not repair stored bytes.

Five checks then run in order: integrity, expected-context equality, D0 declaration
relations, selected Holm admission/ownership, arithmetic. All carry the same
Record/revision/analysis/family/result scope. A failed prerequisite leaves later
checks `not_run`. A completed check has pass/fail; an execution error has no
outcome. There is no aggregate verification status. Only five completed passes
permit forwarding of the original byte snapshot.

Malformed expected input is a refusal after Record integrity succeeds. A valid
but different expected context is a scoped context failure. Expected file access
does not occur if Record ingress or integrity already decides the result.

## C5. Public outcomes

report.schema.json and refusal.schema.json are successor proposals. outcomes.json
enumerates every proposed reason code and every execution mapping. Public checks
use `reason_codes`; the private engine's short reasons remain internal.
Optional D0 `details.codes` preserve the complete relation diagnostic set, with
no invented ordering of simultaneous relation defects. These supplementary
diagnostics are distinct from the versioned public decision reason.

An inner worker failure yields arithmetic execution `error`, never arithmetic
disagreement. After the complete invocation, any outer enforcement, cancellation,
abnormal exit, output invalidity or cleanup failure discards the inner report and
forwarded bytes. Private causes stay in the local receipt. The first cause in
the fixed precedence selects one public refusal; see CANDIDATE-INDEX.md.
In particular, observed memory enforcement outranks a deadline, and cleanup
failure outranks both. Inner 25-second worker failure and outer 30-second deadline
are different observations. Unknown failure cause is not fabricated as OOM.

Schema-invalid input, noncanonical storage and malformed expected context have
distinct successor refusal kinds. Cancellation, unsupported execution and input
access failure also have explicit kinds. A refusal has no checks, Record
reference or arithmetic result. Resource refusal always has the correct limit
category. This candidate reports input-size availability as `not_observed`:
the trusted presentation adapter receives no reliable Record-size observation,
and never substitutes output size, cap+1 bytes or zero for actual file size.

## C6. Limits and implementation boundary

The conjunction of Record 2,359,296 bytes, expected context 1,572,864 bytes,
depth 36, 28,736 parsed nodes, 1,024 entries per container and 4,096 UTF-16 code
units per string/key bounds ingress. Original inner D0/bridge limits also apply;
the simultaneous maxima of all dimensions are not promised admissible.
Node count excludes object keys. The Contract ID adds one scalar node to the
previous envelope; converted declaration keys do not change node counts.

The selected research launcher is Linux x64, Node 24.19.0 and Python 3.12.14,
trusted fixed programs and environment, one invocation per supervisor. It enforces
512 MiB charged call-leaf memory, swap zero, group OOM, 64 tasks and one CPU;
the 30-second budget begins before preflight with a separate 3-second cleanup
budget. cgroup v2 controllers, delegation, required interfaces and writable limits
are checked by behavior/readback, not inferred from a kernel release string.
There is no portable-kernel-version guarantee.

The supervisor is outside the call leaf. Neither its allocations nor later
receipt presentation are covered by the 512 MiB call-leaf bound. PR #319/#320
measure the earlier supervisor-plus-call ancestor separately; their finite peaks
are observations, not this revision's certified maximum. The presentation CLI
reads at most 6 MiB plus one byte of a locally trusted receipt and fails without
output on transport failure. Its serialization is an implementation adapter,
not a new arithmetic check or a receipt-authentication protocol.

Every completed launcher path kills remaining descendants and requires subreaper
reaping to ECHILD, empty cgroups, cgroup removal and temporary-file cleanup.
Supervisor SIGKILL/host loss needs an external owner to tear down the delegation;
absence of an output is never acceptance. Hostile same-UID executable code is
outside the trusted-program model. Record-controlled code is always prohibited.

Existing NRS-SEC-0006 explicitly requires in-process time/heap checkpoints.
This engine has deterministic input caps and an external controller but does not
implement those checkpoints. It therefore does not claim compliance with that
existing clause. COUPLING.md proposes an explicitly scoped successor requirement
for the new bundle and records this as an adoption decision still needed.
