# Integration validation and limits

This record concerns archival integration on 2026-09-11, not scientific
certification of every historical claim.

## Evidence used

Each directly merged original PR was inspected at a fixed head, checked for
compatible current-tree composition, and merged with an expected-head guard.
Fixed-head CI was successful. Stacked history was retained through ordinary
merges, including corrective commits and the original review receipts.
Historical narrative assertions about prior source inspection were treated as
attributed records. They were not rewritten as new primary-source findings.

The numerical archive reviews supply focused new evidence:

- R3: 110,668 independent arithmetic controls, 23 binding controls, 9,499
  existing standalone assertions, 157 bridge checks per mode, 70 D0 cases,
  15 integrity controls and fixed input/manifest checks.
- R4: 968 arithmetic cases and 18,380 quantities, 220 fixed tail rows,
  28 checker probes, source-boundary scripts, 324 composition checks, and
  124 consumer plus 318 wrapper checks in normal and optimized modes.

Detailed scope and limitations are in the original reviewer reports. The
reviewers did not read the original primary PDFs. The R3 reviewer could not
rerun live process-tree RSS measurement or complete the `tsx` launcher-based
validator in its isolated environment; neither was claimed as a pass. The
integration coordinator's direct repository validator did pass.

## Composition and preservation

- Current authority, registries, schemas, specification, reference code,
  conformance, tooling, workflows, dependencies and contribution instructions
  were compared with initial main
  `8b9a95b2436fba0725e3f2753c5a41a2de24e8e3`; no change was present.
- Local sequential merge trees were compared with fetched remote main and
  matched despite different local merge-commit metadata.
- R3 source prefixes and the corrected 49-entry classifications were preserved.
  The proposal's fixed input identities remain unchanged.
- PR #309's 17 storage entries were verified: 15 exact source-byte copies and
  two explicitly disclosed one-line English transcriptions.
- Original independent review reports and evidence are retained. Two
  formatting derivatives have adjacent original-byte copies. Parsed JSON
  equality and parsed JavaScript AST equality, excluding parser source-position
  and formatting metadata, were verified. The storage manifest pins both.

## Repository checks

Composed changed-file formatting, Markdown lint, direct repository validation,
language and private-dependency audits passed before the relevant uploads.
Full formatting of the assembled tree exposed two reviewer-return formatting
differences; only the disclosed script/JSON derivatives were normalized, with
original bytes retained. The final audit PR runs CI over the complete assembled
tree. Its actual result is recorded by GitHub, not predicted in this file.

Whitespace checking has deliberate historical exceptions: one raw Probe C
stdout trailing space retained by #265, ten Markdown hard-break lines in the
two #309 transcriptions, and original reviewer Markdown hard breaks. These
are identified preservation choices, not a claim of zero whitespace output.
No historical checksum was silently regenerated to conceal a changed original.

No new primary-paper acquisition, full scientific re-review of every old
derivation, portable memory/time proof, platform certification, RFC decision,
formal B-2 closure, method adoption or release was performed. Original
transport-only bundles and the defective #209 hook are explicitly classified
in the inventory rather than represented as merged assets.
