# R4 / R2 equivalence: EQ-01 and EQ-02 limited repair

Status: **UNISSUED CANDIDATE**. **NON-AUTHORITATIVE**.
Prepared 2026-09-17 by the repair author using OpenAI Codex.

- EQ-01 REPAIR IMPLEMENTED — CLOSE REVIEW PENDING
- EQ-02 REPAIR IMPLEMENTED — CLOSE REVIEW PENDING
- Main Integration Decision: **HOLD**.
- Existing T01-T14, A1, A1-01 and BR-01/02/03 closures remain closed.

## Scope and inputs

Base main and original equivalence-review target:
`554818683d037d378ef3c11f1758b848adca1ec3`.

Branch: `repair/r4-r2-equivalence-eq01-eq02-20260917`.
The exact repair target is the containing Git commit supplied in the close-review
handoff, not a self-referential hash in this packet.

The user's input is the existing verdict
**R4 ↔ R2 READINESS EQUIVALENCE ADVERSARIAL REVIEW — GAP**:
zero BLOCKERs, EQ-01/EQ-02 SHOULD-FIX, and EQ-03 NOTE.
This package repairs only those two findings and does not issue their independent
closure or a new equivalence verdict. EQ-03's G5 distribution concern is unchanged.

## Repair map

- EQ-01: [new independent substitute review](T13-SUBSTITUTE-PROVENANCE-REVIEW.md)
  and [provenance map](T13-REVIEW-PROVENANCE-CONFIRMATION.md) supply replacement
  evidence for the narrow T13 provenance gap. They do not recover or authenticate
  the historical receipt. [T14 treatment](T14-REVIEW-PROVENANCE-CONFIRMATION.md)
  retains the maintainer/user-provided final-readiness classification.
- EQ-02: [CLI successor candidate](PUBLIC-CLI-CONTRACT-CANDIDATE.md) concretizes
  T03 intent as an unissued decision proposal, not implemented/adopted behavior.
- [INPUTS.json](INPUTS.json) binds fixed repository inputs, the new substitute
  review and small Actions metadata. [MANIFEST.json](MANIFEST.json) binds this
  new package, excluding itself.
- [Close-only request](CLOSE-REVIEW-REQUEST.md) defines the next review boundary.

This supplements the [A1 packet](../r4-adoption-readiness-a1-20260917/README.md)
without editing its historical intakes, evidence map, ratification packet or
closed results. Both bounded repairs still need close-only review. Full A2
landing and A3 production/shared-verifier connection remain **STRONGER-THAN-R2**,
not newly mandatory implementation gates for the R2 benchmark.

## Source honesty and preservation

Three T13 layers remain distinct: historical reported GO, existing structured
maintainer/user-provided intake, and new independent substitute provenance review.
The new review independently corroborates fixed Git evidence; it does not prove
what the historical reviewer did. No original receipt authenticity, reviewer
continuity, earlier receipt path, chat-native hash/byte length or served-model
attestation is claimed. T14 is later readiness/integration judgment, not a second
independent scientific review.

The earlier uncommitted Japanese source-export approach and both original-result
export files have been removed. All new public documents are English; no encoded
non-English source or validator exemption replaces them. The English substitute
review is preserved in full, with a document title and formatting only.
Its stored digest/length describes this newly stored artifact alone.

No historical file, numerical evidence, oracle, expectation, formal authority,
schema, registry, Requirement, Public Check, supported bundle, production
dispatcher or reference source changes. This repair does not rerun numerical
research or full T13/T14 review. Release 4 remains **UNISSUED CANDIDATE**.

## Actions retention note

The substitute reviewer verified exact-target archive bytes against recorded
digests. Their reported expiry is 2026-12-15. This repair preserves run/artifact
IDs, digest, byte length and expiry metadata, rechecked through GitHub's metadata
API on 2026-09-17. It does not download or permanently archive their bytes or
claim that metadata alone retains their contents. Long-term retention remains a
NOTE, not a new equivalence blocker or a larger distribution task.

## Validation and reuse

Check the faithful substitute-review text, hashes/lengths, fixed Git objects,
local links, candidate ID/ownership, legacy CLI preservation and unchanged
historical files. Run validate, Markdown lint, format, typecheck, generated
consistency and `git diff --check`; committed-target results accompany the handoff.

Hashes use UTF-8 LF file bytes, matching Git's eol policy. New package formatting
may require regenerating this new manifest only, never a historical expected
hash. Neither author-side implemented status nor substitute-review GO closes
EQ-01/EQ-02; the existing equivalence reviewer decides the bounded delta.
