# Proposed declaration-bound supplied-p Holm Contract

Informative, unissued proposal. The clause labels below are review locators, not
Requirement IDs. This document proposes the meaning to review before a later
coupled normative change; it is not a registered schema or executable Contract.

## S1. Claim and scope

The proposed operation verifies that a complete supplied family of binary64
p encodings, attached to the caller-selected declared comparisons, has the exact
ordinary unweighted Holm transformation and the specified binary64 display.
Its success says only that the declarations, supplied numbers and arithmetic
result are consistent with the expected context.

The first capability is limited to an explicitly declared one-way independent
design with 3 through 16 groups, one finite continuous outcome per represented
unit, and one selected all-pairs family. Its member count is exactly
`m = k*(k-1)/2`, hence 3 through 120. No paired, clustered, factorial,
covariate, weighting, preprocessing or missingness extension is introduced.
The complete represented population and existing D0 relationships are preserved.
This operation performs no scientific eligibility decision from the data.

Many-to-one, arbitrary contrast families, omnibus results, simultaneous intervals,
weighted Holm, product-form Holm, Hochberg and FDR are outside this first Contract.
The generic 1..1024-member arithmetic experiment remains separate evidence; its
wider size range is not the proposed R3 admission domain. No omnibus rejection
or prior omnibus calculation is required for this supplied-p transformation.

## S2. Expected context and supplied inputs

Expected context is chosen independently of the submitted result: a caller
selects the full declaration, analysis, family, result slot and supplied-input
association it intends to check. The checker does not extract its expected
target from the submission and then claim to have checked that target's origin.
Truth or authenticity of the caller's expected context is not established here.
No remote dereference or external attestation is introduced.

The complete D0 context binds dataset, design, represented population, units,
observations, groups, analyses, families, pair directions, procedure/variance/
selection declarations, and result slots. Bind even unrelated analysis context
in that same document. A changed unrelated declaration can therefore invalidate
the binding while leaving the arithmetic answer unchanged.

| Proposed semantic item | Meaning                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selected identities    | Exact analysis/family/result ownership and selected member order; one multiplicity-adjustment slot                                                        |
| Revision               | Exact caller-owned revision label                                                                                                                         |
| Member input           | Member ID, source ID, source-hypothesis ID, declared sidedness, exact p encoding                                                                          |
| Origin tuple           | `(source_id, hypothesis_id)` unique within the selected family; source ID alone may repeat                                                                |
| Sidedness              | `one_sided` or `two_sided`, retained as a declaration; no doubling or halving of supplied p                                                               |
| Local labels           | Selected analysis/family/result/member and sidecar labels use exact case-sensitive ASCII `[A-Za-z0-9_.-]{1,64}`; no truncation or normalization           |
| Numeric input          | Exactly 16 lowercase hex characters encoding big-endian binary64 in [0,1], including positive zero; negative zero, infinity and NaN are outside admission |

The labels and origin tuple do not prove logical uniqueness of hypotheses,
independent experiments, data authenticity or validity of a producing test.
Reuse of a local member ID in another family is resolved by full context, not
by treating member IDs as globally unique. Broader hypothesis-equivalence and
coefficient rules remain outside this slice.

## S3. Exact calculation and projection

Let `U = 2^1074`. Each admitted p encoding denotes exactly `P_i/U`, with integer
`0 <= P_i <= U`. A subnormal fraction field `f` gives `P=f`; a normal biased
exponent `e` and fraction `f` give `P=(2^52+f)*2^(e-1)`.

Sort by increasing `P_i`, resolving equal values by original member position.
For one-based sorted rank i:

```text
T_i = (m-i+1) * P_(i)
A_(i) = min(U, max(T_1, ..., T_i))
adjusted_(i) = A_(i) / U
```

Map every result back to original member order. Exact integer multiplication,
ordering and cumulative maximum define the mathematical target. A capped scan
may realize the same target; the implementation does not define the meaning.
Equal input p values have equal adjusted values; listing order is a deterministic
project convention. Runtime sort-comparison counters are diagnostic only.

The display is a single nearest, ties-to-even binary64 projection of `A/U`.
Compare both the exact integer A and the display encoding. Display equality
alone is insufficient. No absolute/relative tolerance or submitted interval is
proposed. Input encodings, not ideal unrounded p-values or original decimal
strings, define this operation's target.

The adjusted-p formula is a downstream derivation from Scheme 1, not a formula
quoted from Holm. Its comparison with the sequential test is justified only for
the reviewed level domain `0 < alpha < 1`. At alpha=1 clipping can break the
equivalence. This first operation accepts no alpha input and emits no significance
boolean. Any future level belongs to the applicable versioned check; binary64
0.05 is not silently identified with the rational number 1/20.

## S4. Binding and public representation

The proposed semantic comparison binds the full expected declaration and supplied
input association using existing JCS canonical values. Arrays and exact strings
remain significant. Object-key order and whitespace do not affect that semantic
comparison; source decimal spelling is not recovered from parsed numbers.

The current experiment carries these values in three raw strings and two unissued
sidecars. Its `example-contract-multiplicity-adjustment-v0` and `unissued-*` markers
are not public identifiers. Its historical D0 slots still say
`payload_status=method_payload_deferred`. Neither that placeholder nor a
numerical property inserted into the old closed schema is a proposed final
attachment mechanism.

Proposed public placement is a successor, closed, versioned Record/result surface
that carries the selected Contract identity and complete input/output associations,
with a separately versioned verification report. The exact schema fields and
attachment mechanism are deliberately still a blocking design task, not implicit
authority for implementation. They need to preserve the semantics in S1-S3 and S5.
The D0 shell is retained for this R3 proposal; no generic p-only Record independent
of that design shell is adopted here.

The candidate string encodings are proposed as the initial representation to
review: p and display as 16 lowercase hex characters, and A as canonical lowercase
hex (`0` or no leading zero), at most 269 digits, with range checked against U.
They avoid loss through JSON numeric conversion. Public-surface review can choose
another lossless representation only with an explicit equivalence and fixture
update; neither representation is frozen by this document.

Official Record storage/exchange remains subject to the existing canonical-byte
ingress rule. The experiment accepts pretty-printed input for semantic comparison;
that is not authorization to relax canonical Record ingress. Raw duplicate names,
unpaired surrogates, negative-zero numbers and non-JCS values retain strict rejection.
The public candidate needs separate fixtures for storage-byte acceptance and
canonical-value comparison, so the two rules cannot be confused.

## S5. Outcomes and processing

Proposed result meaning, irrespective of the eventual wire vocabulary:

| Situation                                        | Required scoped meaning                                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Complete identity and arithmetic agreement       | All m adjusted exact values and displays match the independently selected context                                |
| Declaration truth and statistical validity       | `not_asserted` on every path, including arithmetic success                                                       |
| Original p calculation                           | `not_run`; no raw-data p recomputation                                                                           |
| Malformed, unsupported or mismatched submission  | No arithmetic-consistency success; retain the applicable scope and reason                                        |
| Worker/runtime/dependency failure or termination | Execution failure/refusal under the reviewed public outcome mapping, never a numerical result or partial success |

The experiment's success label is
`declaration_bound_supplied_p_arithmetic_consistent`. It is evidence for designing
the public result, not an issued overall status. This Contract does not certify
FWER, scientific significance, interval coverage, selection chronology, input
honesty or the correctness of the study.

Proposed precedence preserves the reviewed bridge: raw type/size/depth bounds;
strict parsing and document bounds; D0 schema/relationships; closed carrier and
selected scope/encoding checks; complete context and member-order comparison;
recomputation; all-row exact-value/display comparison. D0 relation errors retain
their stage and complete code set rather than inventing an order within that set.
No numerical work starts on an invalid binding. Successful early rows do not
survive a later mismatch. Public reason codes and execution-outcome mappings are
still to be registered and checked against existing verifier-level refusal rules.

## S6. Admission and execution proposal

Retain the measured experiment's deterministic input caps as the initial support
proposal. Their conjunction, not any individual maximum, defines admission.

| Limit                                          | Proposed initial bound                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Expected declaration / inputs / submitted text | 1 MiB / 256 KiB / 2 MiB UTF-8, with cheap UTF-16 length guard before UTF-8 counting        |
| Nesting depths                                 | 32 / 32 / 34                                                                               |
| Parsed nodes                                   | 24,576 / 2,048 / 28,672; objects, arrays and scalar values count, object keys do not       |
| String / key width; container size             | 4,096 UTF-16 code units; 1,024 entries                                                     |
| D0 observations/units                          | At most 1,024 each                                                                         |
| D0 analyses/families/result slots              | At most 16 each; at most 120 members per family                                            |
| Selected groups and comparisons                | 3..16 groups; exactly all pairs, 3..120 members                                            |
| Candidate private request/response             | At most 256 KiB each; internal implementation boundary, not a public transport requirement |

The simultaneous count-max D0 has 42,450 nodes and is intentionally refused.
An admitted D0 plus sidecar and maximum output has the embedding upper bound
24,576+2,048+(1+120*4)+3=27,108, below 28,672. Depth 32 embeds at 34.
If the final public envelope adds fields or nesting, recompute these bounds and
review the affected ingress fixtures before treating the proposed caps as valid.

Node/Python architecture, hash checks, private worker transport and sorting
implementation are reference techniques, not interoperability requirements.
Retain them for the next bounded experiment unless a concrete defect requires
change. Public semantics specify results, admission and failure behavior.

A supported-execution proposal should initially target a single reproducible
Linux x64 configuration, with exact Node/Python and dependency identities chosen
and justified in that proposal. This is a proposed scope, not approval of any
currently observed runtime. Wider platforms require their own evidence.

Current experiment settings are a 30-second outer deadline, 25-second worker
timeout, 256-MiB Python address-space limit, 256-MiB Node old-space setting and
512-MiB sampled process-tree RSS ceiling. These measure different things; none
proves a universal 512-MiB whole-call memory bound. The live sampler's requested
2-ms interval includes additional scan/scheduling delay and can miss peaks.

Before supported behavior, define process accounting, startup-to-exit coverage,
native allocations and buffers, trusted Node startup options/loaders, isolated
Python launch, runtime origins, concurrency assumptions and the stopping mechanism.
Choose and demonstrate enforceable whole-call controls in the selected environment,
or explicitly narrow the support claim and admission. Exercise timeout and
memory-ceiling termination and verify no accepted output or orphan worker survives.
Do not infer these properties from successful small probes or old-space settings.

## S7. Evidence reuse and scientific extension

PR #289 covers ordinary Scheme 1 and its conditional strong-FWER theorem for
valid marginal levels. PR #294 supplies the relevant IEEE source facts, with
Holm applicability recorded by its author intake. PR #290/#292 supply candidate
derivation and implementation-review evidence; PR #299/#300 supply the binding
design, repairs and completed experiment round. Their scopes do not collectively
close B-2 without an explicit independent applicability/provenance determination.

If scientific FWER is later requested, separately establish valid marginal
p-producing procedures, permitted selection/family conditions, rounded-input
effects, source-to-Contract/check identities and the intended error guarantee.
Numbers in [0,1], a digest, exact arithmetic or an origin label are insufficient.
No new p-generator, R2 numerical callback, Naik source, R4 integration, interval
or second adjustment method is required for this arithmetic-only proposal.

## S8. Future authoritative change set

After research and RFC decisions, the coupled change set needs the bounded
Profile and Contract; allocated Requirement namespaces/anchors; permanent
Contract/Profile/schema/check/bundle identities; closed Record/result/report
schemas; versioned check comparisons and reasons; independent positive/negative
conformance expectations; exact-bundle dispatch; authority and public-surface
assignments; regenerated views; and old-bundle regression evidence.

The current identity policy already recognizes Contract identifiers and extensible
Requirement namespaces. Reuse that adopted grammar. Do not describe an unissued
R2 schema, Contract or bundle as adopted merely because the grammar is present.
Compare each actually reused R2 surface with its current disposition. Publication
of reused R2 surfaces as settled meaning remains subject to the RFC dependency.
