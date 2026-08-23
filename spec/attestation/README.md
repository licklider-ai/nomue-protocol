# Attestation

**Status: Normative (EXPERIMENTAL), DRAFT.** This document was previously fully
reserved ("no attestation format is defined"). It defines the attestation
contract: the fixed attestation statement, the concept-level shape of an
assertion, the signature algorithm allow-list discipline, where a
signature-verification result lives relative to the report's own
`verification_results`, and - since the signature-infrastructure
ratification (Batch 4, 2026-08-13) - the algorithm evolution path, the
trust root, the v0 no-revocation rule, and the long-term-validity note.
The first increment was reviewed and merged by the steward. Gates R1-01
(verification depth and capability matrix) and R1-11 (cryptosuite and
trust semantics) track this work; this document's existence does not itself
close either gate.

**Why EXPERIMENTAL, not CORE, for now**: this is CORE-candidate material by
its nature (it defines a guarantee boundary), but the 60-day public RFC
discussion and named-steward approval this repository's own process
requires for CORE material ([../../governance/RFC.md](../../governance/RFC.md),
[../../registries/stability-tiers.yaml](../../registries/stability-tiers.yaml))
has not happened. Marking it EXPERIMENTAL here is honest about that, not a
statement that the content is expected to be unstable in substance.

## What is fixed by this increment

<a id="NRS-ATTEST-0001"></a>
**NRS-ATTEST-0001 - The attestation statement** (stability: EXPERIMENTAL, status: active)
An assertion whose `statement` is
`urn:nomue:attestation-statement:verification-procedure-executed:1` MUST be
read as meaning exactly this, and nothing more:

> nomue-attested asserts, with a signature, that for a specific scope of a
> specific Record, a specified verification procedure was executed at a
> specified version and its result was recorded in this Record. It is not
> a guarantee of the correctness of research, papers, or scientific
> conclusions.

This wording is fixed by this increment and is not to be paraphrased or
extended in a conforming implementation; a different claim requires a
different, newly registered statement identifier, not a reinterpretation of
this one.

<a id="NRS-ATTEST-0002"></a>
**NRS-ATTEST-0002 - Assertion shape** (stability: EXPERIMENTAL, status: active)
Each assertion MUST be contained in an attestation object that carries an
`attester`, and the assertion itself MUST carry, at minimum: a subject (the
specific Record revision it is about), a scope (what part of that revision,
using the same scope shape as a public check result), the fixed statement
identifier of NRS-ATTEST-0001, and a signature. In
[../../schemas/reports/verification-report-0.2-draft-3.schema.json](../../schemas/reports/verification-report-0.2-draft-3.schema.json),
the enclosing attester is bound by `$defs/attestation` and the assertion-local
fields are bound by `$defs/assertion`.

<a id="NRS-ATTEST-0003"></a>
**NRS-ATTEST-0003 - Signature algorithm allow-list, no algorithm agility** (stability: EXPERIMENTAL, status: active)
A signature's `algorithm` MUST be a member of the registered allow-list in
[../../registries/attestation-signature-suites.yaml](../../registries/attestation-signature-suites.yaml);
an implementation MUST NOT accept an unlisted algorithm value, and MUST NOT
select a verification algorithm by any means other than the exact declared
`algorithm` value (no negotiation, no fallback, no inference from key
shape). The schema enforces the allow-list as a closed enum
(`$defs/signatureAlgorithm`), so an unlisted value is a schema-invalid
document, not a runtime choice.

Informative note: the allow-list registry lists exactly one suite,
`urn:nomue:signature-suite:ed25519:1` (RFC 8032 Ed25519, plain
deterministic variant), with `status: adopted` since 2026-08-13 (ratified
steward decision, recorded in
[ADR-0026](../../governance/decisions/ADR-0026-ed25519-adoption-pq-migration-path.md)
together with the rejection rationale for hedged/randomized variants:
fault-injection attacks presuppose physical signer access, outside the
server-side signing threat model). Gate R1-11's close remains a separate
steward decision.

## Algorithm evolution and post-quantum path

<a id="NRS-ATTEST-0006"></a>
**NRS-ATTEST-0006 - Algorithm change only by versioned allow-list addition plus spec-version transition** (stability: EXPERIMENTAL, status: active)
An implementation or registry maintainer MUST introduce any new or changed
signature algorithm exclusively by adding a NEW versioned suite entry to
the allow-list registry together with a specification-version transition;
an existing suite entry MUST NOT be edited in place to denote a different
algorithm, and a suite MUST only ever leave service by tombstoning
(`status: withdrawn` with `superseded_by` set), never by deletion. Runtime
algorithm agility remains zero throughout any transition (NRS-ATTEST-0003).

Informative note (post-quantum reservation): the named future candidates
are ML-DSA (FIPS 204) and SLH-DSA (FIPS 205). No suite entry, parameter
set, or timeline is decided here; the reservation exists so the eventual
transition is an ordinary NRS-ATTEST-0006 registry addition. The adopted
custody platform already exposes these algorithm families
(Cloud KMS `PQ_SIGN_ML_DSA_*` / `PQ_SIGN_SLH_DSA_*` identifiers, checked
2026-08-13), so the operational path exists when a transition is proposed.

<a id="NRS-ATTEST-0004"></a>
**NRS-ATTEST-0004 - Signature verification is depth-3, non-recomputable evidence** (stability: EXPERIMENTAL, status: active)
An assertion's `signature_verification` result MUST use the same
execution/outcome shape as a public check result, and MUST be classified as
signature evidence (depth ③: execution-signature confirmation), never as
calculation evidence (depth ①) or consistency evidence (depth ②) - it
confirms that the attester's signature over the assertion's content is
valid, not that the underlying verification procedure's result is
independently recomputable from raw data. Here the depth labels are shorthand
for the authoritative evidence-class dimensions `calculation_evidence`,
`consistency_evidence`, and `signature_evidence` in
[../../registries/public-checks.yaml](../../registries/public-checks.yaml)
and its meta-schema; they are not a separate classification table in
`public-checks.md`.

<a id="NRS-ATTEST-0005"></a>
**NRS-ATTEST-0005 - Attestation-derived results never enter `verification_results`** (stability: EXPERIMENTAL, status: active)
A `signature_verification` result, or any other result whose validity
depends on trusting a specific attester's key, MUST NOT appear in a
report's `verification_results` array. It MUST appear only inside the
`assertions[]` it belongs to, under `attestations`. This is a structural
schema fact (verification-report-0.2-draft-3's `verification_results`
items are drawn only from the public-check `checkResult` definition;
`attestations` is a disjoint sibling field), not a rule re-derived per
report.

Informative note: this is the concrete binding of the "two-layer check
separation" distinction between re-runnable public checks and
attester-key-dependent assertions.
[NRS-VERIFY-0004](../core/verification-principles.md#NRS-VERIFY-0004)
(attestation non-escalation, already CORE, already active) already
prohibits an attestation from mutating an existing verification result;
this clause adds that an attestation-derived result must never be placed
where it could be mistaken for one in the first place.

## Trust root

<a id="NRS-ATTEST-0007"></a>
**NRS-ATTEST-0007 - Only trust-root-pinned keys produce nomue-attested** (stability: EXPERIMENTAL, status: active)
A signature qualifies an assertion as "nomue-attested" ONLY when it
verifies against a public key pinned in the trust root registry
([../../registries/attestation-trust-root.yaml](../../registries/attestation-trust-root.yaml))
whose validity window covers the evaluation time; a verifier MUST judge a
signature by any other key - even one that is cryptographically valid and
uses an allow-listed algorithm - as NOT nomue-attested, reporting an
explicit failed `signature_verification` result rather than silently
accepting or omitting it. The trust root is part of the content-addressed
snapshot surface (it is classified authoritative, so the snapshot manifest
of NRS-VERSION-0001 covers it), which is what makes "which keys count"
itself a verifiable, versioned fact rather than an out-of-band claim.

<a id="NRS-ATTEST-0008"></a>
**NRS-ATTEST-0008 - Key generation transitions** (stability: EXPERIMENTAL, status: active)
The trust root MUST manage keys as numbered generations: a new key is
introduced only by ADDING a new generation entry (never by editing an
existing entry's key material), an old generation leaves service only by
being marked `superseded` with `superseded_by` naming its successor (never
by deletion), and overlapping validity windows during a transition are
permitted and MUST be represented explicitly as each generation's own
validity interval. Each entry MUST carry the key identifier, generation
number, public key, fingerprint together with the fingerprint's computation
method, and validity interval.

Informative note: the fingerprint method fixed by the registry is SHA-256
over the DER-encoded SubjectPublicKeyInfo (SPKI) of the public key,
rendered as `sha256:` plus lowercase hex - computable with standard tools
from the PEM alone, and printable via `pnpm trust-root:fingerprint`. The
registry currently pins no key (`keys: []`): the first generation is added
by the steward's key ceremony
([../../governance/KEY-CEREMONY-RUNBOOK.md](../../governance/KEY-CEREMONY-RUNBOOK.md)),
and until then every trust-root evaluation fails closed - nothing is
nomue-attested before the first pin is committed and published.

## Revocation and transparency (v0)

<a id="NRS-ATTEST-0009"></a>
**NRS-ATTEST-0009 - v0 has no revocation mechanism** (stability: EXPERIMENTAL, status: active)
Layer 1 v0 defines NO revocation mechanism: a verifier MUST NOT consult
any revocation source, MUST NOT interpret the reserved `revocation`
placeholder member as affecting any verification outcome, and MUST NOT
treat the absence of revocation information as a positive claim of
non-compromise. Compromise response in v0 is operational, not protocol:
key-generation supersession in the trust root (NRS-ATTEST-0008) plus the
published compromise runbook
([../../security/KEY-COMPROMISE-RUNBOOK.md](../../security/KEY-COMPROMISE-RUNBOOK.md)).

<a id="NRS-ATTEST-0010"></a>
**NRS-ATTEST-0010 - Transparency logs are a detection layer, never a validity condition** (stability: EXPERIMENTAL, status: active)
If a future increment adopts a transparency log, the log MUST serve
detection of revocation-relevant events and mis-issuance only; an
implementation MUST NOT make signature-verification success conditional on
log inclusion, log availability, or log consistency proofs. Verification
validity derives from the signature and the trust root alone.

## Long-term validity (LTV)

Informative note: verification validity beyond roughly 20 years is not
achievable by a signature alone. It is carried by trusted timestamps plus
re-sealing before algorithm obsolescence (before "Q-day" for the
pre-quantum suites) - the AdES-LTA / RFC 4998 (Evidence Record Syntax)
style of practice, where the evidence is periodically re-anchored under
then-current algorithms. This records the rebuttal to position A5:
re-sealing is not an optional enhancement but a PRECONDITION of any
20-year-plus validity claim; a bare Ed25519 signature makes no such claim.
Timestamping of canonical Records is a best-effort steward operation (see
the runbook's timestamping section); it is never a v0 validity condition.

<a id="NRS-ATTEST-0011"></a>
**NRS-ATTEST-0011 - Optional RFC 3161 timestamp field** (stability: EXPERIMENTAL, status: active)
An assertion MAY carry an optional `rfc3161_timestamp` member (bound in
schema at
[../../schemas/reports/verification-report-0.2-draft-3.schema.json](../../schemas/reports/verification-report-0.2-draft-3.schema.json))
holding a base64-encoded RFC 3161 TimeStampToken over the assertion's
signing payload; a verifier MUST NOT require its presence, MUST NOT make
any v0 verification or conformance outcome depend on it, and MUST NOT
interpret its absence as a claim about when the assertion was made.

Informative note (Records): a canonical Record itself is timestamped
detached - an RFC 3161 token over the Record's `content_digest` bytes,
stored alongside the Record (for example `<record>.tsr`), never inside it:
the Record envelope's surface is closed (NRS-CORE-0007), and a detached
token reaches the same evidentiary goal without a schema transition.

## What this increment does not decide (open discussion items)

The following remain undecided (the list has narrowed since the first
increment - see the dated notes):

- **Issuer identity verification**: nothing here establishes that the party
  named in `attester.name` is who they claim to be, beyond the
  cryptographic fact that they hold the private key for a pinned `key_id`.
- **Key custody and distribution** (decided 2026-08-13, recorded here):
  custody is Google Cloud KMS per the key ceremony runbook; distribution
  is the trust root registry (NRS-ATTEST-0007) with multi-channel
  fingerprint publication. The `key_id` mint authority is the steward via
  the ceremony.
- **Revocation distribution** (decided 2026-08-13, recorded here): v0 has
  no revocation mechanism (NRS-ATTEST-0009); the placeholder member stays
  reserved and inert.

A future increment resolves the remaining items through the normal RFC
process; this increment does not pre-decide them by shipping ad hoc
behavior.

## Reference implementation (non-normative)

`reference/verifier/src/attestation.ts` implements real Ed25519
sign/verify (via `node:crypto`, no third-party cryptography dependency), a
pure `attachAttestations(report, attestations)` function proven, by unit
test, never to change `report.conformance` or
`report.verification_results`, and - since Batch 4 - the trust-root path:
`computeSpkiSha256Fingerprint`, `loadTrustRoot`, and
`verifyAssertionAsNomueAttested` (pin lookup by `signature.key_id`,
validity-window check against an explicitly supplied evaluation time,
then cryptographic verification against the pinned key; failures report
`NRS-SIGNATURE-KEY-NOT-PINNED` or `NRS-SIGNATURE-KEY-OUTSIDE-VALIDITY`).
`pnpm trust-root:fingerprint` prints and re-derives pinned fingerprints.
It is not wired into the `verify` CLI pipeline - there is no bundle that
declares attestation support yet (every registered bundle's
`attestation_support` is `none`), so attaching an attestation is a
separate, explicit step a caller performs on an already-produced report,
not something `pnpm nomue-record verify` does automatically.
