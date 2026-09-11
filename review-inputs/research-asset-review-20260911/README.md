# Independent research-asset archive assessments

These are the original reports returned by two separate nonauthor review
tasks configured as `gpt-5.6-sol`. Both assess archival preservation of fixed
R3/R4 experimental stacks, not formal promotion or supported implementation.
No served-build attestation or human review is claimed.

- `r3/REPORT.md` and `r3/EVIDENCE.json` describe the R3 arithmetic, binding and
  integrity checks. The original reviewer scripts, pin verification and
  checksum inventory are retained alongside them.
- `r4/R4-ASSET-ARCHIVE-REVIEW.md` and
  `r4/R4-ASSET-ARCHIVE-PINS.json` describe five R4 stacks, their 26 commits,
  focused reproduction and remaining limits.

Both reviewers reused fixed repository source reports; neither newly inspected
the original primary PDFs. Historical scratch paths in their original JSON
records identify the review environment, not dependencies of main. The
integration coordinator supplies this wrapper and the disclosed formatting
derivatives below, and does not rewrite the
reviewers' conclusions or independence disclosures.

Two returned files required repository formatting: the R3 binding script and
R4 pin JSON. Original bytes are retained in adjacent `.txt` files; the
published `.mjs` and `.json` copies are formatting derivatives. The script's
parsed JavaScript AST is identical apart from parser position/formatting
metadata, and the JSON parsed values are identical. The original R3 checksum
inventory is `r3/ORIGINAL-SHA256SUMS.txt` and refers to the returned bytes.
The coordinator's `STORED-IDENTITIES.json` distinguishes originals from
published copies. It covers returned assets, not this coordinator wrapper.

The integration audit and current reading clarifications are under
`governance/drafts/research-asset-integration-20260911/`.
