# Public-Release Sanitization Checklist

**Status:** required pre-publication review for external research material.
Before adding material under `evidence/research/`, the steward completes this
checklist and records the reviewer and date in the relevant subdirectory's
`README.md`. If any item requires remediation, only the sanitized version is
committed; the source document stays outside the public repository.

## Checks

- [ ] **Internal strategy:** No confidential business strategy, priorities,
      schedules, or competitive assessments are present.
- [ ] **People and personal data:** No non-consensual names, contact details,
      affiliations that identify participants, or other personal data are present.
- [ ] **Non-public material:** No NDA material, unpublished third-party data,
      unpublished manuscripts, or content that cannot be redistributed is present.
- [ ] **Active negotiations:** No details of ongoing partnerships, contracts,
      hiring, or financing discussions are present.
- [ ] **Credentials and internal URLs:** No API keys, tokens, internal URLs, or
      authenticated UI details appear, including in screenshots.
- [ ] **File metadata:** Author, organization, revision history, comments, and
      other sensitive PDF or Office metadata have been removed.
- [ ] **Quotation and redistribution rights:** Quotations are short, attributed,
      and lawful; no unlicensed full-text reproduction is present.

## Record format

```text
Sanitization check: complete (YYYY-MM-DD, reviewer: <name or role>)
- All items checked / Remediation performed: <none | summary>
```
