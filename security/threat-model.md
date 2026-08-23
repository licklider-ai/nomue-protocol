# Threat Model

**Status: Informative.** This is the published threat model required as
evidence for gate R1-05 (threat model and adversarial corpus,
[../authority/release-1-gates.yaml](../authority/release-1-gates.yaml)).
Publishing this document is evidence toward that gate; it is not itself a
decision to close it. Current R1-05 state is recorded only in the Release 1
gate registry and gate index, not duplicated in this candidate-frozen threat
model. Nothing in this document, or in
[phase-1-verifier-security.md](phase-1-verifier-security.md) and
[phase-2a-resource-refusal.md](phase-2a-resource-refusal.md) which it
supersedes in scope, claims the verifier is "securely complete".

## What is in scope

This threat model covers the reference verifier
(`reference/verifier/`) and the tooling that produces conformance evidence
about it (`tooling/`), as defined and bounded by the Layer 1 boundary in
[../spec/core/layer-boundary.md](../spec/core/layer-boundary.md). It does
not cover: any product that emits Records, any agent or UI that collects
declarations from a researcher, transport or storage of Record files, or
any private repository (`../AGENTS.md` forbids this repository depending on
one, and by the same boundary this threat model does not analyze one).

## Assets

- **The verifier's refusal-to-fabricate guarantee.** The single property
  this whole specification exists to protect: a verifier must never report
  a result it did not actually establish (NRS-SEC-0004, NRS-CORE-0011).
  Everything below is ultimately an attack on this asset or an attempt to
  make the verifier do something it promises never to do.
- **The host running the verifier**, and any other process, file, or
  network resource reachable from it.
- **The integrity of the verification report as evidence**: a report must
  reflect the Record actually supplied, not an attacker-influenced
  substitute.
- **Availability of the verifier itself** (it should fail fast and safely
  on hostile input rather than hang or crash uninformatively).

## Trust boundary and actors

The verifier trusts its own source tree (schemas, registries, code, as
checked out) and nothing else. Everything else is an actor:

| Actor                                        | Capability                                                                 | Trust level                                         |
| -------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------- |
| The Record file supplied to `verify`         | Fully attacker-controlled bytes, any JSON shape, any string/number content | Untrusted                                           |
| The operator invoking the CLI                | Chooses the file path and command; not itself part of the verified content | Trusted to invoke, untrusted content passed through |
| The repository's own schemas/registries/code | Read from the local checkout only                                          | Trusted                                             |
| The network                                  | Never consulted (offline-by-default, NRS-SEC-0001)                         | Out of scope: no code path reaches it               |

There is no notion of an authenticated Record author in this phase (no
attestation exists yet, see [../spec/attestation/README.md](../spec/attestation/README.md)):
every Record is untrusted regardless of what it claims about its own
provenance.

## Attack surface

The only path from an external actor into the verifier is the byte content
of the file named on the command line (or, for library callers, the string
passed to `verifyRecordText`/`verifyRecordTextWithResources`). Within that,
the surface is:

- raw byte size and encoding (is it valid UTF-8, is it small enough to read),
- JSON syntax (is it parseable, does it exhaust the parser),
- JSON structural shape (object/array nesting depth, member/array counts,
  string lengths, duplicate member names, surrogate validity),
- declared identifiers and URIs (`record_id`, `revision_id`,
  `interpretation_bundle_id`, and payload-level identifiers) - strings that
  look like locators but are never dereferenced,
- declared numeric values (magnitude, special values that JSON cannot even
  encode as numbers - `NaN`/`Infinity` tokens are a parse-level concern),
- declared statistical results that the verifier recomputes and compares
  against.

There is no second surface: no environment variable changes verification
meaning, no configuration file is read from outside the repository, and no
plugin or extension mechanism exists to load additional code (Phase 1/2A
has none, see [../spec/extensions/README.md](../spec/extensions/README.md)).

## Threat catalogue

Organized by consequence, each row naming the mitigation and the evidence
that it holds.

### Spoofing a locator to get an unintended fetch

**Threat**: a Record declares an identifier or URI intended to trigger the
verifier to fetch, open, or otherwise act on the referenced resource (an
internal-network URL, a local file path, a pseudo-scheme).

**Mitigation**: identifiers are identifiers, not locators (NRS-CORE-0004);
the verifier never dereferences any URI in a Record (NRS-SEC-0001). This is
enforced by construction (no network-module import, no `fetch`, in
`reference/verifier/`) and audited mechanically
(`tooling/src/phase1/audits.ts` `auditExternalUriDereference`, run by
`pnpm validate`).

**Adversarial corpus**: fixture `B-009`
(`conformance/fixtures/verifier_behavior/B-009.json`) declares
`record_id: "http://attacker.example.invalid/../../../../etc/passwd?leak=1"`
and `revision_id: "javascript:alert(document.cookie)//not-a-real-revision"`

- both syntactically valid under the generic `uri` pattern
  (`schemas/common/identifier.schema.json`) - and expects the Record to verify
  and pass exactly as it would with ordinary identifiers. No path traversal,
  no script execution, no HTTP request: the identifiers are opaque strings.

### Tampering with recorded content

**Threat**: content is altered after a digest was declared, or a Record
declares a digest that does not match its actual content, hoping the
verifier accepts it anyway.

**Mitigation**: the content digest is always recomputed from the Record's
own canonical form and compared against the declared value
(NRS-VERIFY-0006); the declared digest is never trusted. Digest and
canonicalization failures are closed
(`NRS-DIGEST-MISMATCH`, `NRS-CANONICALIZATION-FAILED`).

**Adversarial corpus**: fixtures `I-001`/`I-002`
(declared-digest mismatch, and content changed after sealing without a
digest update); canonicalization test vector `digest-mismatch`
(`canonicalization/test-vectors/manifest.yaml`).

### Repudiation

Out of scope for this phase: no identity assertion (attestation) exists yet
for a Record author to repudiate (see
[../spec/attestation/README.md](../spec/attestation/README.md)).

### Information disclosure from the verifier process

**Threat**: a hostile Record causes the verifier to include unintended host
information (file-system paths beyond the invoked one, environment
variables, other process state) in its output.

**Mitigation**: reports and refusals contain only fields the schemas
declare (`additionalProperties: false` throughout); nothing outside the
schema-declared shape is ever emitted. Hostile or malformed identifiers that
cannot be carried faithfully are omitted from refusals, never echoed
verbatim into a context that could be misread as executable or fabricated
(`isDeclarableBundleId` in `reference/verifier/src/refusal.ts`).

**Residual risk**: no dedicated review has been done for message-string
injection (a hostile string value appearing verbatim inside a `message`
field of a refusal or a Welch-recompute mismatch description). This is
recorded as an open item below, not mitigated by a specific fixture today.

### Denial of service via oversized or expensive input

**Threat**: a Record is crafted to consume excessive time, memory, or stack
depth in the verifier, denying service to whatever process or operator
invoked it.

**Mitigation, in layers**:

1. Raw size limit (5 MiB) rejects the input before any parsing.
2. Parsed-value limits (nesting depth 64, observation count 10,000, string
   length 16,384 UTF-16 code units) are enforced by an **iterative**
   traversal (`reference/verifier/src/limits.ts` `checkParsedLimits`) so a
   hostile deep input cannot overflow the checker itself, and JSON-parser
   exhaustion on deeply nested input is itself caught and treated as a
   resource refusal rather than an uncaught exception.
3. In-process processing-time (5,000 ms) and peak-heap (512 MiB) budgets
   (NRS-SEC-0006, `startProcessingBudget`/`checkProcessingBudget`) are
   checked at pipeline checkpoints as defense-in-depth against an
   unexpectedly expensive code path _within_ the above ceilings - see
   [ADR-0022](../governance/decisions/ADR-0022-in-process-time-memory-bounds.md)
   for the exact checkpoints, the chosen values and their rationale, and
   why this is checkpoint-based rather than preemptive (Node.js has no
   synchronous preemption).

**Adversarial corpus**: fixtures `A2-R-001`..`A2-R-004` (file size, nesting
depth, observation count, string length, each a pinned safe refusal with
exit code 4); `B-007` (nesting depth via the Phase 1 pipeline); `B-008`
(a numeric literal, `1e999`, that parses to infinity - a degenerate-value
denial vector rather than a size vector, closed via
`NRS-NON-FINITE-NUMERIC-VALUE`); `B-010`/`B-011` (Batch 3 V3: finite but
extreme between-group separation making the squared test statistic
overflow binary64 inside the tail-evaluation path - the kernel refuses
explicitly with `NRS-T-SQUARED-OVERFLOW` per NRS-VERIFY-0026 instead of
silently reporting an endpoint probability). The time/memory budget itself
is proven by unit test with an injected clock/heap reader
(`tooling/tests/verifier.test.ts`), not a conformance fixture: a genuinely
slow or memory-heavy input cannot be constructed within the ceilings above
(this is recorded explicitly in `NRS-SEC-0006`'s registry entry).

### Elevation of privilege via code execution

**Threat**: a Record is crafted so that some part of its content is
executed as code (a script embedded as a string that some future code path
evaluates, a crafted value that exploits a dependency's `eval`-like
behavior).

**Mitigation**: the verifier never executes Record-supplied code,
containers, scripts, plugins, or commands (NRS-SEC-0002). No `eval`, no
`new Function`, no `child_process`/`vm`/`worker_threads` import exists
anywhere in `reference/` or `tooling/` except the deliberately isolated,
non-Record-processing R1-08 oracle generator (see
[../tooling/r1-08-oracle/README.md](../tooling/r1-08-oracle/README.md) for
why that one exception is scoped and safe). Enforced mechanically by
`auditExecutionSurface` in `tooling/src/phase1/audits.ts`, run by
`pnpm validate`.

**Adversarial corpus**: no fixture directly exercises this, because there
is no field in the Phase 1/2A schemas whose value is ever passed to an
execution primitive - the mitigation is structural (no execution surface
exists to reach), verified by the static audit above, not by input
crafting. Signature-algorithm confusion (a related elevation vector once a
cryptosuite exists) has no corpus yet because no cryptosuite is defined in
this phase (see [../spec/attestation/README.md](../spec/attestation/README.md));
it is deferred to the phase that defines attestation.

### JSON-level ambiguity and parser divergence

**Threat**: input is crafted so that different JSON parsers (or the same
parser under different builds) disagree on its meaning, letting an attacker
present one interpretation to a human and rely on another being verified.

**Mitigation**: strict JCS input eligibility (NRS-CANON-0007,
NRS-CANON-0008) rejects duplicate object member names and strings with
unpaired surrogates on the raw text, before routing, canonicalization, or
digest computation - no first-wins/last-wins semantics, no Unicode
normalization (ADR-0018). Raw `NaN`/`Infinity` tokens and negative zero are
handled per the finite-binary64 numeric model
(`canonicalization/phase-1-numeric-model.md`).

**Adversarial corpus**: fixtures `JSON-DUP-001`..`JSON-DUP-011` (duplicate
members at various depths and encodings), `JSON-UNI-001`..`JSON-UNI-005`
(lone surrogates, surrogate in a member name, and - to prove no
false-positive rejection - correctly paired astral characters and
NFC/NFD-distinct strings that must NOT be rejected); canonicalization test
vectors `negative-zero`, `invalid-nan-token`, `invalid-infinity-token`.

## Run-log evidence

Every fixture named above is pinned in
[../conformance/manifest.yaml](../conformance/manifest.yaml) with its
expected exit code, refusal kind, and reason codes, and is replayed against
the reference verifier by `pnpm conformance:test` (all fixtures) or
`pnpm refusal:test` (the `A2-R-*` resource-refusal subset) on every commit
via CI (`.github/workflows/ci.yml`, both the Linux and Windows jobs). A
local run at the time this document was written:

```text
$ pnpm conformance:test
conformance:test: OK (107 fixtures match their pinned expectations)

$ pnpm refusal:test
conformance:test (include A2-R*): OK (8 fixtures match their pinned expectations)
```

These are reproducible by anyone who clones this repository; they are not a
one-time claim.

## Residual risks and known exclusions

- A time-bounded, schema-guided randomized mutation fuzzer now exists
  (`tooling/src/fuzz/schema-guided-fuzzer.ts`,
  [../evidence/development/fuzz-runs/README.md](../evidence/development/fuzz-runs/README.md)),
  complementing the curated-by-threat-category corpus above; it is not a
  continuously running, professionally red-teamed fuzzing campaign, only a
  reproducible, time-bounded local/CI-triggerable run.
- No side-channel analysis (timing, cache behavior) of any check.
- No sandboxing (containerization, seccomp, or similar) of the verifier
  process itself; the mitigations above are all in-language, not
  OS-enforced.
- No dedicated review of message-string content for injection into
  downstream consumers of verifier output (see "Information disclosure"
  above).
- The processing-time and memory budgets are checkpoint-based, not
  preemptive; a pathological code path _within_ a single checkpoint segment
  is not interrupted mid-flight.
- No independent third-party security review has been performed.

## Vulnerability reporting

Operational contact routing can change without changing Protocol semantics, so
this frozen threat model does not hard-code an email address or service endpoint.
The publication surface identifies the current private reporting channel. The
reporting process is:

- security-relevant findings are reported privately (not as a public issue)
  to the project stewards through the current published security channel;
- a finding is acknowledged and, once triaged, tracked either as a fix
  landing normally (if it is a defect within the guarantees already made)
  or as a documented gap here (if it reveals a guarantee this document
  should not have implied);
- this repository's own discipline against unqualified "guaranteed"/
  "verified" language (see `governance/CONTRIBUTING.md` and this document's
  own hedged claims) applies equally to how a resolved report is described.

Changing the operational contact channel does not change the Protocol or this
threat model; release/publication operations own that routing metadata.
