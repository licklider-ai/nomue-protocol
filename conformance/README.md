# Conformance Architecture and Suite

Conformance is scoped adherence to declared Protocol rules. It is not a universal
badge and not a synonym for Verification, support, capability maturity, or
Scientific Validity.

For covered current behavior, authoritative expected judgments live in
[manifest.yaml](manifest.yaml) and the
[canonicalization vector manifest](../canonicalization/test-vectors/manifest.yaml).
The executable suite applies those pinned expectations. Hand-authored tables under
[expectations/](expectations/) are non-authoritative authoring inputs derived from
the specification and registries; they prevent implementation output from silently
authoring its own expectations, but they do not create a second authority for
conformance judgment. Expected values never live only in fixture names or readmes.

## Conformance is always relative

A useful conformance claim identifies five things:

1. **Subject** - the exact artifact or implementation being evaluated, including an
   implementation build identity where relevant.
2. **Target** - the Protocol rules, component, bundle, schema, check surface, or
   other authoritative target against which the subject is evaluated.
3. **Version basis** - the exact versioned identities and authority state that fix
   the target. A nearby version or successor is a different basis unless explicit
   compatibility says otherwise.
4. **Scope** - the behaviors, capabilities, or artifact surfaces actually covered
   by the claim.
5. **Evidence basis** - the fixtures, vectors, tests, or other evidence used to
   establish the scoped judgment.

This is an architecture model, not a new conformance-report schema. The repository
currently records the evidence forms needed by its existing surfaces; future
capabilities add machine-readable conformance material only when their design needs
it.

An unqualified statement such as "fully nomue-conformant" is therefore not useful
by itself. Conformance to one schema, bundle, check set, or behavior family does not
silently establish conformance to another.

## Conformance subjects

The same scoped model can evaluate different kinds of subjects without giving them
the same obligations.

### Produced artifacts and Records

A Record or other produced artifact is evaluated against the exact structural and
semantic targets that apply to it. Structural conformance, semantic invariants, and
individual Verification Results remain distinct dimensions: for example, a Record
can satisfy its JSON Schema while a recomputation check reports a declared-result
mismatch. One successful dimension does not upgrade another.

The current Record fixtures therefore pin both conformance judgments and, where
applicable, the separate per-check execution/outcome expectations needed to test the
reference Verifier. Those fields coexist in one fixture manifest for testability;
they do not collapse Conformance and Verification into one concept.

### Emitters

An Emitter implementation can be evaluated only for the Record surfaces and
emission requirements it claims to implement. The current `E-*` family evaluates
emitted Records and independently authored expectations for the existing
NRS-EMIT requirements. It does not introduce a separate runtime "emitter
conformance" check: emitted Records are still judged by the same applicable Record
requirements as equivalent Records from any producer.

A successful Emitter claim for one bundle or Record surface says nothing about a
successor bundle or a capability the Emitter does not claim to implement.

### Verifiers

A Verifier implementation can be evaluated for the exact bundles, routing/refusal
behavior, Public Checks, report surfaces, and versions it claims to support. The
subject includes the implementation build identity; the conformance target remains
the Protocol authority rather than the implementation's own behavior.

Passing the repository's current verifier-behavior fixtures is evidence only for
those covered behaviors. It is not a certification that every possible input or
every future Protocol surface is correct, and it does not make the reference
Verifier normative.

### Contracts, Profiles, Workflows, and other future components

A future Contract, Profile, Workflow, Extension, or implementation of one can become
a conformance subject or target only when the Protocol has defined the authoritative
rules needed to judge it. Architecture vocabulary alone does not create a
conformance obligation or claim.

Composition also needs its own coverage. Conformance of each operation in a Workflow
does not by itself establish conformance of the Workflow's ordering, dependencies,
or cross-operation invariants; those composition semantics need an applicable target
and evidence when they are specified.

## Conformance and Verification

Conformance asks whether an artifact or implementation adheres to declared Protocol
rules for a stated target and scope. Verification executes a declared check or
procedure against a specific Record and records what that procedure established.

A Public Check can itself evaluate a conformance-related property, such as Record
schema conformance, but that result remains a scoped Verification Result about that
Record. It does not establish that the Verifier implementation is conformant, and a
Verifier conformance suite result does not establish that every Record it later
sees will pass Verification.

Neither concept produces an overall statement that the research is correct.

## Version, support, maturity, and conformance

These axes remain separate:

- **Version identity** fixes the exact subject and target identities involved in a
  claim.
- **Support** states which exact capabilities or bundles an implementation or
  published surface actually exposes.
- **Capability maturity** summarizes how far a named/versioned capability has
  progressed from architectural fit through independent evidence.
- **Conformance** evaluates adherence for a declared subject, target, version basis,
  and scope.

A successor component or bundle does not inherit a conformance claim from its
predecessor. A capability can have strong conformance evidence while remaining
unsupported by any registered bundle, and a supported capability can still expose a
conformance defect. The axes answer different questions.

## Evidence discipline

Conformance evidence is useful only to the extent that its expected judgments come
from Protocol authority rather than from the implementation under test. Positive and
negative cases both matter, especially at fail-closed boundaries.

The current manifests are authoritative for the expected judgment of the behavior
they cover, not for behavior they do not exercise. Passing the current suite is
therefore a scoped evidence statement, not proof of exhaustive correctness.

Where independent derivation is practical, the suite prefers it. Numerical
expectations use independent oracles; canonicalization vectors and several emitter
expectations have independent derivation paths. Known places where expectations were
historically authored from reference behavior are recorded explicitly below rather
than hidden behind a generic conformance claim.

## Phase 1 families

| Family            | Status   | Fixtures                                                                                                          |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| structural        | active   | S-002..S-004                                                                                                      |
| semantic          | active   | M-001..M-014                                                                                                      |
| canonicalization  | active   | vectors in [../canonicalization/test-vectors/](../canonicalization/test-vectors/manifest.yaml) (single authority) |
| public_checks     | active   | V-001..V-003, I-001..I-002, P-001..P-007, A2-V-001..006, A2-A-001..009, A2-P-001..009, A2-C-001..002              |
| strict_json       | active   | JSON-DUP-001..011, JSON-UNI-001..005 (ADR-0018), JSON-NEG-001..003 (Batch 5)                                      |
| routing           | active   | S-001 (reclassified, ADR-0017), ROUTE-001..008                                                                    |
| verifier_behavior | active   | B-001..B-009, A2-R-001..008, A2-B-001..004                                                                        |
| attestation       | reserved | no registered Release 1 bundle declares attestation support                                                       |
| emitter           | active   | E-001..E-005 (Batch 2 U3) - see below                                                                             |
| approval          | active   | D1-001..D1-003 (Batch 2 U6)                                                                                       |
| lifecycle         | active   | LC-001..LC-008 (projection matrix), LC-020..LC-023 (operations) - Batch 6, ADR-0028                               |

Run with:

```bash
pnpm conformance:test
```

## Current suite contract

- Fixtures judge covered behavior of the specification; expected results come
  from the specification, registries, and schemas - never from an
  implementation alone. Declared numeric values are cross-checked against
  independent oracles
  ([../evidence/development/phase-1/oracle/](../evidence/development/phase-1/oracle/README.md)).
- Released fixtures are immutable and are superseded, not overwritten.
- Every fixture is traceable to Requirement IDs.
- Pinned reason codes are cross-checked against the reason-code registry's
  `applicable_check_ids` by `pnpm validate`, so the manifest cannot silently
  contradict the registry.

## Phase 2A expectation provenance

Phase 2A expectations (`A2-*`) are **hand-authored before verifier
execution** in
[expectations/phase-2a-expectations.yaml](expectations/phase-2a-expectations.yaml),
derived from the specification and registries; the authoring script asserts
the implementation against that table and never overwrites it. Semantic
projection hashes for `A2-*` fixtures are pinned through an independent JCS
implementation rather than the verifier's canonicalizer. Phase 1 Record
interpretation semantics and successful verification projections remain
pinned; verifier-level refusal behavior received explicitly documented
pre-release corrections under ADR-0015 (B-007 reason codes, refusal kinds,
parse-failure code, and the B-002..B-006 input pins for the version-string
advance) and under ADR-0017 (bundle-independent routing: the
first-registered-bundle fallback was removed, S-001 was reclassified to the
routing family with unchanged input bytes and corrected expectations, and
the B-002..B-006 input pins refreshed again with the verifier
version-string advance to 0.2.0-draft.2). `pnpm regression:phase1` replays
the Phase 1 fixtures.

## Strict-JSON expectation provenance

Strict JCS input-eligibility expectations (`JSON-DUP-*`, `JSON-UNI-*`) are
hand-authored in
[expectations/strict-json-expectations.yaml](expectations/strict-json-expectations.yaml)
and asserted by `tooling/src/phase1/author-strict-json.ts` (ADR-0018).
Refusal inputs are raw JSON text (duplicates cannot be expressed through
`JSON.stringify`); duplicate members and unpaired surrogates are rejected
before routing, canonicalization, or digest computation, with no
first-wins or last-wins semantics; acceptance fixtures pin the absence of
false positives, and an independent differential classifier cross-checks
every fixture input.

## Routing expectation provenance

Routing expectations (S-001, `ROUTE-*`) are hand-authored in
[expectations/routing-expectations.yaml](expectations/routing-expectations.yaml)
and asserted by `tooling/src/phase1/author-routing.ts`, which additionally
asserts that S-001's input bytes still match the historical Phase 1 input
hash. ROUTE-007/ROUTE-008 replay a pinned probe set against reversed and
deterministically shuffled interpretation-bundle registry orders and
require outcomes identical to the canonical order (registry order has no
semantic meaning; no default bundle exists).

## The `emitter` family (active, E-001..E-005)

There is no separate normative concept of "emitted" content beyond
NRS-EMIT-0001 (schema validity) and NRS-EMIT-0004 (domain-separated digest
correctness), both restatements of existing structural/integrity requirements: a Record
produced by a third-party emitter is judged by the exact same checks as any
other Record. What is distinct about this family is how its fixtures were
authored (`tooling/src/phase1/author-emitter-fixtures.ts`): expected schema
validity and digest correctness are computed independently - a fresh AJV
instance against the raw schema files, and the independent `canonicalize`
npm package plus `node:crypto` directly, never
`reference/verifier/src/jcs.ts` - **before** the reference verifier is
invoked at all. The reference verifier is then run only as a consistency
check, and each fixture's `independent_verification` block in
[manifest.yaml](manifest.yaml) records how its expectation was actually
derived, for a reviewer who wants to check the reasoning without re-running
any code. This closes the "Known Phase 1 limitation" below specifically for
this family: E-family expectations are not authored-then-pinned from the
reference verifier's own output.

## Known Phase 1 limitation (recorded openly)

Non-numeric expectations (execution states, exit codes, semantic projection
hashes) originate from the reference verifier at authoring time: they pin
behavior for regression and cross-platform comparison rather than deriving it
independently from the specification. Numeric expectations are independently
cross-checked (oracles), and reason-code expectations are registry-checked;
fully implementation-independent expectation derivation is open work tracked
by the independent review record
([../evidence/development/phase-1/reviews/independent-review.md](../evidence/development/phase-1/reviews/independent-review.md))
and relevant to gates R1-03 and R1-08.

Editing rules are in [AGENTS.md](AGENTS.md).
