<!--
GENERATED FILE - DO NOT EDIT.

Source artifacts:
- registries/vocabulary.yaml (sha256:8349db89f37ba3b8436faa3b53ff8fc1737d57b7769d2c5e679552a402938ebc)

Generation command: pnpm generate
-->

# Vocabulary Index

Non-authoritative view of the vocabulary registry.

Registry version: 0.1.0 (updated 2026-08-18)

| Term | Definition |
| --- | --- |
| nomue Protocol | The open specification system that defines the semantic contracts, machine-readable structures, version identities, verification semantics, conformance rules, and governance needed for independently checkable research evidence. The Protocol is not itself a Record, a verifier implementation, or a product application; it contains the nomue Record Specification and the Protocol's other specifications, registries, and contracts. |
| nomue Record Specification | A sub-specification of the nomue Protocol that defines the structure and Record-level semantics of a nomue Record. Abbreviated NRS. NRS is not the umbrella Protocol. |
| Record | A machine-readable evidence object that conforms to an applicable nomue Protocol specification and interpretation bundle and that binds the declarations, provenance references, computational and result bindings, lifecycle facts, approvals, or attestations its applicable surface defines, so that specific declared properties can be checked independently. |
| Layer 1 | The nomue Protocol layer: the open semantic and verification authority - specifications, registries, schemas, and conformance artifacts - consumed by independent implementations and products. Layer 1 excludes agent session state, interactive protocols, transport, user interfaces, and product workflow orchestration, which belong to Layer 2. |
| Layer 2 | Products and applications - such as a nomue application - that produce, consume, present, orchestrate, or assist with Protocol-conformant Records and verification. Layer 2 has no authority to redefine Protocol semantics; product behavior is never silently elevated to Protocol-backed meaning. |
| Contract | A named, versioned set of Protocol-defined declarations, semantics, constraints, outputs, and verification obligations for a bounded capability or analytical operation. A Contract is not a legal agreement and not merely a software interface; it is distinct from a Public Contract Surface and from a Profile. |
| Analysis Contract | A Contract that describes a scientific analysis or analytical operation: the quantities or estimands it targets, the inputs and declarations it requires, the identity and parameters of its procedure or model, its outputs and uncertainty representation, and the verification semantics that apply to it. |
| Profile | A named, versioned specialization of Protocol semantics for a bounded scientific, design, or domain context, for which specific checks and guarantees are supported. A Profile is not a method, not an Analysis Contract, and not an Interpretation Bundle. |
| Workflow | A declared composition of Protocol-recognized operations or analytical steps whose ordering and dependencies are relevant to interpretation, provenance, or verification. A Workflow is a scientific-analysis concept, distinct from user-interface flows, agent sessions, and build or CI pipelines; a Record is not required to declare one. |
| Analysis DAG | A directed acyclic representation of an analytical Workflow in which nodes represent declared analytical or transformation operations and edges represent declared data or dependency relationships. |
| Emitter | An implementation or system that emits a nomue Record - a nomue application or an independent third-party producer alike. Emitting Records confers no authority over Protocol semantics. |
| Verifier | An implementation that evaluates a Record under declared Protocol semantics and emits scoped verification results or a versioned refusal. Any party can implement a Verifier; the nomue reference verifier is one Reference Implementation, not the definition of verification. |
| Conformance | The property of an artifact or implementation satisfying the structural and semantic rules of the specification for a declared scope, as judged by the conformance suite. Conformance concerns adherence to the specification; it does not by itself establish the outcome of any check on a particular Record. |
| Verification | The execution of declared checks or procedures against a Record and its locally available material, producing scope-bound results. Verification concerns what a specific check established; it is distinct from Conformance (adherence to the specification) and from Attestation (a signed assertion by an issuer). |
| Verification Result | The recorded outcome of one executed check or procedure, bound to its evaluated scope, check or procedure identifier, and applicable version. |
| Public Check | A published, versioned check whose procedure and pass criteria are part of the public specification surface, so that any party can execute it and compare results. |
| Recompute | A verification procedure that re-derives a declared output from declared inputs using a published procedure and compares the re-derived value with the declared value. |
| Consistency Check | A verification procedure that tests whether declared parts of a Record agree with each other under published rules, without re-deriving outputs from raw inputs. |
| Attestation | A signed Assertion by an identified Issuer about a Record or a part of one, recorded so that a Relying Party can decide what weight to give it. An Attestation is not a substitute for Verification and never changes an existing Verification Result. |
| Assertion | A statement made by a party, carried in a Record or an Attestation, whose truth is attributed to that party rather than established by the specification. |
| Issuer | The identified party that signs and takes responsibility for an Attestation. |
| Relying Party | A person or system that reads a Record, its Verification Results, or its Attestations and decides what to conclude or do based on them. |
| Scope | The explicitly identified portion of a Record, set of properties, and conditions to which a Verification Result or guarantee applies. Results are inseparable from their Scope. |
| Scientific Validity | The soundness of a scientific claim or method in its domain. The nomue Protocol does not establish Scientific Validity; outside an explicitly supported and scoped procedure it is represented as not asserted. |
| not asserted | A representation stating that the specification and its tools take no position on a property. Deliberately distinct from "unknown" (a question posed but unanswered) and from "passed" (an evaluation that succeeded). |
| Reference Implementation | An implementation published to demonstrate the specification. It is non-normative; where it disagrees with the specification, registries, schemas, or conformance suite, those artifacts govern. |
| Normative | The classification of text or artifacts that define binding meaning, guarantees, or constraints, expressed with registered requirement keywords bound to Requirement IDs. |
| Informative | The classification of text that explains, motivates, or illustrates without defining binding meaning. Informative text never overrides Normative text. |
| Generated Artifact | A file produced mechanically from authoritative sources, such as the views under the generated directory. Generated Artifacts are non-authoritative and are never edited by hand. |
| Public Contract Surface | A registered, externally relied-upon Protocol surface whose compatibility and change policy are explicitly tracked in the public-contract-surface registry. |
| Interpretation Bundle | A registered, supported, exact combination of versioned Protocol components - schema, canonicalization, profile, public checks, and any other explicitly bound procedure - required to interpret and verify a Record. Combinations outside a registered bundle fail closed. |
| Protocol Snapshot | An immutable, content-addressed publication unit that fixes a specific set of Protocol authority artifacts for independent reference and implementation. A Protocol Snapshot publishes authority; it is distinct from an Interpretation Bundle, which registers the exact version combination needed to interpret a Record. |
| Stability Tier | The registered change-control class of specification material - CORE, STABLE-INTENT, or EXPERIMENTAL - determining compatibility expectations and the required public-discussion window for changes. |
| Extension | A Protocol-governed mechanism by which typed semantics are added beyond a base surface without silently changing the meaning or guarantees of existing covered behavior. |
| Canonicalization | A published deterministic transformation or procedure used to produce the canonical representation required for equality, digesting, signing, or other Protocol-defined identity operations. |
| parsed binary64 value | The finite IEEE 754 binary64 number produced by the declared JSON parsing path for a numeric token. Phase 1 and Phase 2 numerical recomputation treats this value as the sole numeric contract input (NRS-CANON-0009). |
| source-decimal fidelity | The property that a parsed binary64 value exactly preserves a source decimal token, measurement-system value, or author intent. Conformance and verification do not assert source-decimal fidelity (NRS-CANON-0010). |
| numerical underflow | A binary64 evaluation that yields zero for a quantity that is positive in the mathematical model, such as a tail probability from finite test statistic and positive degrees-of-freedom inputs (NRS-VERIFY-0021). |
| tail-safe evaluation | A two-sided Student t p-value evaluated by a direct lower-tail or survival-tail method and not by subtracting a positive-tail cumulative probability from one (NRS-VERIFY-0019). |
| field-specific tolerance | A versioned public-check tolerance policy that assigns independent absolute and relative tolerances per compared field rather than a single global bound (NRS-CANON-0006, NRS-VERSION-0009). |
| resource limit | A verifier bound on input size or work, such as maximum observations, that is not evidence of a numerical accuracy guarantee for all inputs below that limit (NRS-CORE-0012). |
| numerical domain restriction | An empirical numerical condition threshold that may be used only when explicitly owned by a versioned public check and covered by declared conformance evidence (NRS-CANON-0011). |
| Public Draft | A published, immutable, content-addressed snapshot of the specification that is explicitly not a finished standard and carries no compatibility promise toward later drafts. |
