# ADR-0023: Snapshot Manifest Mechanism for Gate R1-07

**Status: Accepted** (Phase 2A hardening, 2026-08-13).

Informative note (post-ADR clarification): ADR-0027 subsequently added domain
separation for digest contexts (NRS-CANON-0020). Item 3 below describes the
pre-ADR-0027 snapshot-hash input. Current snapshot hashing prefixes
`nomue/snapshot-manifest/v1` + LF before the JCS canonical form of the manifest;
the implementation in `tooling/src/release/snapshot-manifest.ts` already follows
that later rule.

## Context

Gate R1-07 (immutable public surface and version authority) requires, as
its first piece of evidence, "a content-addressed snapshot manifest with
hashes." `NRS-VERSION-0001` already requires every published Public Draft
to be immutable and content-addressed, but nothing produced that manifest:
Record-level content-addressing (JCS + SHA-256, per
[ADR-0006](ADR-0006-jcs-sha256-digest-projection.md)) existed, but there was
no equivalent at the scale of a whole specification snapshot, and no way to
state "the hash of this snapshot" as a single reproducible value.

## Decision

1. **Reuse the existing authority classification, do not invent a new file
   list.** `tooling/src/release/snapshot-manifest.ts` enumerates every file
   already classified `authoritative` in
   [../../authority/authority-manifest.yaml](../../authority/authority-manifest.yaml)
   - the single existing source of truth for "what counts" - rather than
     maintaining a second, parallel list that could drift from it.
2. **Per-file hash**: SHA-256 of the file's UTF-8 text with line endings
   normalized to LF, matching the normalization `tooling/src/phase1/bindings.ts`
   already uses for TypeScript-binding source hashes (a Windows checkout
   must produce the same per-file hash as a Linux checkout).
3. **One overall snapshot hash**: SHA-256 of the RFC 8785 JCS canonical form
   of the manifest object itself (path + hash + file count + source commit),
   using the verifier's own `jcsCanonicalize` - the same canonicalization
   model this specification already applies to a single Record's content
   digest, applied one level up. This was chosen over an ad hoc
   concatenation-and-hash scheme specifically so the snapshot-hash mechanism
   is not a second, differently-specified canonicalization living alongside
   the Record one.
4. **`--check` is a mechanism sanity check, not a drift check against a
   frozen expectation.** No Public Draft has been published (Phase 2A,
   pre-Release-1), so there is nothing frozen to compare against yet. The
   check instead proves: every authoritative file exists and hashes without
   error, the file list is non-empty, and two independent builds within one
   process produce an identical hash (the computation is deterministic, not
   merely "happened to succeed once"). This is wired into `pnpm validate`
   so it runs on every commit.
5. **Running this tool does not close gate R1-07.** Per this repository's
   standing rule, no gate is flipped except by an explicit steward decision
   at release-candidate review; this mechanism only makes the required
   evidence producible on demand.

## Rejected alternatives

- **A frozen "golden" manifest checked into evidence/, drift-checked on
  every commit** (the same pattern as `pnpm check:generated`): rejected for
  this mechanism specifically, because the manifest's entire purpose is to
  capture "this exact commit's authoritative content," which legitimately
  changes on every commit before Release 1. Freezing it now would either
  require regenerating and re-committing it on every single change (pure
  churn, no signal) or accepting silent drift (defeating the purpose). The
  freeze-and-compare pattern is the right one only once a real Public Draft
  snapshot is actually cut.
- **Hashing the raw git tree object** (`git rev-parse HEAD^{tree}` or
  similar) instead of an explicit file-by-file manifest: rejected because it
  would hash every tracked file, not only the ones this repository considers
  authoritative (generated/, evidence/, node_modules/ exclusions, etc. would
  all need separate filtering anyway), and it would not produce a
  human-readable per-file manifest suitable for archival alongside a release
  candidate.

## Consequences

- `pnpm snapshot:manifest --hash-only` is the command to run at actual
  Public Draft proposal time to obtain the one-line hash.
- `governance/RELEASE-POLICY.md` documents this as the concrete procedure
  fulfilling the "every snapshot is content-addressed" policy statement.
- `registries/requirements.yaml`'s `NRS-VERSION-0001` entry notes that the
  mechanism (not the release-time review itself) is now mechanically
  demonstrable via `pnpm validate`.
