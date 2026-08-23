# Security, Trust, Privacy, and AI Boundaries

**Status: Informative boundary and security-evidence index.** Binding security and
verification requirements remain in the authoritative specification and registries;
this page does not create new guarantees.

The documents in this directory describe the threat model, adversarial corpus, and
security posture of the nomue Protocol reference verifier. Binding today: a
conforming verifier is offline by default and never implicitly dereferences external
URIs
([../spec/core/verification-principles.md](../spec/core/verification-principles.md)).

| Document                                                     | Content                                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| [threat-model.md](threat-model.md)                           | Assets, trust boundary, threat catalogue, adversarial corpus index, run-log evidence, residual risks, vulnerability-reporting process |
| [phase-1-verifier-security.md](phase-1-verifier-security.md) | Trust boundary, enforced guarantees, resource-limit table, failure-behavior reference                                                 |
| [phase-2a-resource-refusal.md](phase-2a-resource-refusal.md) | Versioned refusal artifact hardening added in Phase 2A                                                                                |

## Trust boundary

The Protocol is designed so that independent checking does not require trusting the
nomue product, a reference implementation, a network service, or the producer of a
Record. That principle does not make every input trustworthy. Different facts have
different owners and evidence:

- **Record bytes and producer declarations are untrusted input.** A declaration can
  be structurally valid and internally consistent while still being false in the
  world. Verification establishes only the covered properties of the procedures
  actually executed.
- **Protocol authority defines meaning; implementations consume it.** A nomue
  product, Emitter, Verifier, AI model, external library, or upstream tool does not
  acquire semantic authority because the project uses it.
- **A digest establishes a scoped content-binding/integrity fact, not authorship,
  confidentiality, or scientific truth.** A matching digest does not identify who
  created the content or establish that the underlying declarations are true.
- **A cryptographic signature establishes only the cryptographic claim its
  applicable procedure defines.** Current attestation material explicitly does not
  establish that the real-world party named by `attester.name` is who they claim to
  be merely because a pinned private key produced a valid signature
  ([../spec/attestation/README.md](../spec/attestation/README.md)).
- **Attestation is attributed assertion, not Verification.** Signed statements do
  not upgrade or replace Verification Results.

Trust therefore remains scoped. A relying party decides what weight to give facts
that are declarations or attestations; the Protocol does not silently promote them
into independently established facts.

## Privacy and confidentiality boundary

Local, offline-capable verification reduces the need to transmit locally available
verification material to a vendor service, but that architecture property is not a
privacy certification or confidentiality guarantee.

The current Protocol does not by itself define or guarantee:

- encryption at rest or in transit;
- access control, authorization, or user authentication for Record storage;
- secure deletion or retention policy;
- anonymization, pseudonymization, or resistance to re-identification;
- data minimization for a particular legal, institutional, or scientific context;
- confidentiality of identifiers, metadata, provenance references, or artifacts;
- compliance with a privacy, research-governance, or data-protection regime.

Those properties can belong to Layer 2 deployment/storage policy or to a future
explicit Protocol surface. They are not inferred from use of hashes, signatures,
offline verification, opaque identifiers, or the absence of implicit network
access.

Large or external datasets and artifacts may later be represented by identifiers,
digests, and provenance without being embedded in a Record. That representation
would identify or bind material; it would not itself define who is allowed to obtain
or disclose the material.

## AI, agents, and external tools

AI or agentic systems can assist a Layer 2 product or act as part of an Emitter, but
the Protocol applies the same evidence boundary regardless of whether content was
produced by a person, deterministic software, an AI model, or a mixed workflow.

- AI-generated declarations are declarations until a Protocol-defined procedure
  establishes a covered property about them.
- Model confidence, chain-of-thought, agent state, prompt history, or product session
  state is not Protocol evidence merely because it influenced Record production.
  Interactive agent/session behavior remains Layer 2 under the Layer 1 boundary.
- The Protocol does not require an AI-generated-content detector and does not infer
  truth or falsity from whether content appears AI-generated.
- Model, package, workflow-engine, or scientific-tool identity belongs in provenance
  or implementation identity where relevant. Naming a tool or model does not make
  its output authoritative and does not substitute for a Contract or public
  verification procedure.
- A reference implementation or external software package can supply execution
  evidence, but its behavior never fills a specification gap by precedent.

If future Protocol semantics depend materially on properties of a model, external
tool, privacy technique, security standard, or regulatory practice, the Research
Gate in [../governance/RFC.md](../governance/RFC.md) applies before that external
assumption is promoted into Protocol meaning.

## Guarantee boundary

Security, integrity, authentication, privacy, provenance, Verification, Conformance,
and Scientific Validity are separate questions. Evidence for one does not silently
establish another. In particular:

- integrity is not authenticity;
- authenticity of a key operation is not real-world identity proof unless an
  applicable procedure explicitly establishes that relation;
- confidentiality is not implied by integrity;
- Conformance is not Scientific Validity;
- Verification is scoped to the procedure and Scope reported;
- no single clean-looking Record or report establishes correctness of a research
  project as a whole.

The authoritative specification and registered bundle define which of these
properties, if any, are actually covered for a particular Record and version.

These security documents are evidence inputs for gate R1-05 (threat model and
adversarial corpus,
[../authority/release-1-gates.yaml](../authority/release-1-gates.yaml)); their
presence does not itself close the gate. Current gate state is recorded only in the
release-control artifacts. The vulnerability-reporting process is described in
[threat-model.md](threat-model.md); the current private reporting channel is
operational publication metadata and is intentionally not hard-coded into frozen
Protocol content.
