# Historical raw reviewer return: recovery and custody follow-up

Recovery: **RECOVERED**. Exact-byte verification: **PASS**.
Durable preservation and receipt: **CONFIRMED in public Git**.
Owner/operator selected public Git original-review preservation instead of private
Google Drive storage; no private-storage requirement remains for this raw return.
This record concerns only the historical raw return, not the 17 PDFs.

## Exact recovered artifact

- Original retained attachment basename: `pasted-text.txt`.
- Byte size: 18,810.
- SHA-256: `5b5a41500b7284cc10a8902e69209af83226472bdc01bdd8cba3100ae160a253`.
- Expected identity: the historical completion-review record, preserved as
  [r5-completion-review-original.md.txt](r5-completion-review-original.md.txt).
- Method: direct binary read and SHA-256 calculation of the retained attachment;
  exact match to both previously recorded size and digest. No text reconstruction,
  retyping, newline conversion, synthesis or substitution was used.

The recovered return is distinct from the 24,011-byte coordinator-structured
completion record and the later bounded review returns.

## Search and recovery provenance

The source-packet coordinator followed the existing digest through the Protocol
records and the original R5 task's local history. The shared Protocol Git object
database contained 8,165 objects at inspection, including objects available across
local branches and worktrees; no 18,810-byte blob was present. This is a statement
about the inspected local object database, not every external archive.

The historical R5 task's verification command identified its original attached
text file in the local task attachment cache. That retained attachment was still
present and matched the expected bytes and SHA-256. A separate transfer copy was
created outside public Git and independently compared byte-for-byte; the original
attachment remains unchanged. The private recovery receipt records local source
and transfer locators, which are intentionally not copied into this public record.
Once the exact artifact was recovered, no broader content or scientific search
was necessary. No inaccessible company archive is claimed to have been searched.

## Durable public Git preservation

The owner/operator explicitly selected byte-exact public Git preservation after
full-content inspection found no private/sensitive information requiring private
storage. This follows the existing R2-R4 review-preservation practice and this
packet's original-return convention. The raw return is reviewer-authored evidence,
not a supplied copyrighted PDF. No PDF is added.

- Preserved original: [r5-historical-raw-review-original.md.txt](r5-historical-raw-review-original.md.txt).
- Git blob object: `ff354be1d0c75efba7d6b5fb3d24b021106ae79e`.
- Receipt: the preserved blob's exact byte size and SHA-256 match the recovered
  original, as recorded in CUSTODY-HANDOFF.json and checked by check.py.
- Existing packet attribute `*-original.md.txt -text` prevents Git newline
  conversion; no encoding conversion, formatter or content editing is applied.
- The metadata receipt contains no private attachment-cache path or Drive locator.

The earlier private-storage PENDING condition is superseded by this authorized
public-Git preservation, not by an assertion that a Google Drive upload occurred.
The 17 PDFs' separate private custody remains CONFIRMED on its existing
owner/operator attestation. Their bytes and receipt are unchanged.

Historical raw-return-unavailable and custody-PENDING statements in the original
reviews, prior handoffs and steward disposition describe their then-current state.
This later preservation record resolves only that follow-up; it does not rewrite
those original records or alter the accepted interpretation of their claims.

## Effect on accepted work

The [steward acceptance](2026-09-24-source-reconciliation-steward-disposition.md)
remains effective. The historical raw-return preservation follow-up is COMPLETE.
There are no remaining conditions specific to this accepted source-reconciliation
packet. Existing Release conditions remain outside its scope. There is
no new scientific review, mapping change, closure reopening, Release-state change,
gate closure, implementation change or R5 cross-model disposition.
