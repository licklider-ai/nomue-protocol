# Existing T13 final result: provenance intake

Source class: `maintainer/user-provided existing independent-review result`.
Supplied source timestamp: `2026-09-17T00:50:10Z`.
Intake date: 2026-09-17. Intake role: A1 repair author using OpenAI Codex.
Stable path: `T13-RESULT-INTAKE.md` within this packet.

## Reported identity and verdict

- Verdict: **T13 FULL FROZEN-CANDIDATE REVIEW — GO**.
- Exact reviewed frozen target: `88a5f488db8a777c691afbf85282f9be99fb00d4`.
- Candidate source: `c62ba0f4ffe0e7a1992968f84adc81bd4546b217`.
- Branch: `research/r4-t12-refreeze-f13-01-20260916`.
- F13-01: **CLOSED**. Blocker: **NONE**.
- Release 4: **UNISSUED CANDIDATE**.
- The reviewer did not patch the candidate.

## Reported reviewed scope

The supplied existing result reports the following full frozen-candidate scope:

- Invalid UTF-8 `FF`: `execution_refusal`, `refusal_kind = parse_error`,
  `NRS-PARSE-FAILED`, exit 2, no completed report and no numerical-core invocation.
- F-01 normal and optimized behavior; 12 independently checked failure-precedence
  cases and 3 incompatible UTF-8 mappings.
- No late-report resurrection after execution failure, and no conversion of
  execution failure into numerical indeterminate.
- T06-T08 source/schema/quantity bindings; T07 default/jitless assertions and
  T08 normal/optimized assertions.
- T09 exact-target Linux evidence, T10 exact-target corrected independent corpus,
  T11 exact-target regression preservation and historical T10 delivery comparison.
- CI staging source comparison, regenerated `app.mjs` hash comparison and
  formal/Public surface preservation.

Linux containment reused fixed-SHA saved Linux execution evidence and explicitly
distinguished it from local Windows evidence. This intake does not relabel saved
Linux evidence as a new local Linux execution or rerun any numerical checks.

## Reported finding and disposition

**F13-02 — P3 / non-blocker.** The re-freeze REPORT described
`84627967352206e9d1ecc54c5ca6a735319d9785` as the direct repair parent.
The actual immediate Git parent of `c62ba0f4ffe0e7a1992968f84adc81bd4546b217` is
`4dea1b0735b37d4f0e1cecf5a8eb733278c40ad8`; `84627967352206e9d1ecc54c5ca6a735319d9785`
is the repair ancestor.

The supplied review found a documentation-lineage wording issue only: manifest
source binding, ancestry and execution target were valid; behavior and evidence
were unaffected. A limited documentation correction was sufficient and semantic
review was unnecessary. T13 GO did not claim the later correction had already
been committed at the original frozen target.

## Repository facts checked during this intake

Git objects for the target and candidate source exist and are reachable from
base main `f1c77b743f655a8c37f323794a4ebdcb820927ab`. Git confirms the immediate parent and repair ancestry above.
The [original frozen REPORT](https://github.com/licklider-ai/nomue-protocol/blob/88a5f488db8a777c691afbf85282f9be99fb00d4/governance/drafts/release-4-preparation/t12-refreeze-f13-01-20260916/REPORT.md)
and [freeze manifest](https://github.com/licklider-ai/nomue-protocol/blob/88a5f488db8a777c691afbf85282f9be99fb00d4/governance/drafts/release-4-preparation/t12-refreeze-f13-01-20260916/FREEZE-MANIFEST.json)
remain unchanged. Subsequent [correction commit](https://github.com/licklider-ai/nomue-protocol/commit/9ec48f29aebbd46b327e8693efb3be2bf6606193)
changes the lineage wording and dependent manifest/receipt hashes, not source.
This corroboration is separate from the supplied review result and its timestamp.

## Source and integrity limits

This is a new repository intake, prepared by the A1 repair author from the
maintainer/user-provided existing result in the A1-01 repair instruction. It is
an English structured transcription of the supplied facts, not a verbatim
original receipt and not a new review. The supplied timestamp describes the
reported source result; it is not independently authenticated by a Git timestamp.
No earlier Git storage location, original GitHub receipt path, original
chat-native receipt hash, original byte length, reviewer identity or served-model
attestation is established. None is invented here.

[INPUTS.json](INPUTS.json) and [MANIFEST.json](MANIFEST.json) record the SHA-256
and byte length of this newly stored intake artifact. Those bindings cover its
UTF-8 Git content (LF; normalize checkout CRLF to LF), not any earlier receipt.
Its stable packet-local path is this file. Repository/GitHub facts checked during
intake are identified separately below; those checks do not repeat the review or
independently prove every reported review procedure.

## Reuse boundary

Reuse this existing GO for its exact frozen candidate and reported scope. A1-01
only makes that result traceable; it does not reopen T13, F13-01 or numerical
semantics, grant A1 GO, or adopt Release 4. The later F13-02 correction and merge
are subsequent events, not part of the original review. A1 close-only review of
this intake and its bindings remains pending.
