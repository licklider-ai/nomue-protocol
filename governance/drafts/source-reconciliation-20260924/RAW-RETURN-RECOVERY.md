# Historical raw reviewer return: recovery and custody follow-up

Recovery: **RECOVERED**. Exact-byte verification: **PASS**.
Company-managed private durable custody and its receipt: **PENDING**.
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

## Custody boundary

Recovery and a local transfer copy do not establish company-managed durable
custody. The existing owner/operator confirmation covers the 17 PDFs only.
It has not been extended to this raw return. A destination or owner/operator
confirmation of completed retention for this exact artifact is still required.
The private recovery receipt is a transfer handoff, not a storage-completion receipt.
No private URL, folder identifier, attachment-cache locator or raw text is public.

The [custody supplement](CUSTODY-HANDOFF.json) now distinguishes RECOVERED from
its still-PENDING private storage location and custody receipt. The recovered raw
bytes and private receipt are not committed to this repository.

## Effect on accepted work

The [steward acceptance](2026-09-24-source-reconciliation-steward-disposition.md)
remains effective. Neither the earlier lack of recovery nor the remaining custody
follow-up invalidates the accepted 17-source scientific reconciliation. There is
no new scientific review, mapping change, closure reopening, Release-state change,
gate closure, implementation change or R5 cross-model disposition.
