# Release 4 QR and Cancellation Supplement — Addendum to the Provided-Copy Review

**Status: informative independent review addendum; non-normative; not adopted.**

This addendum corrects two factual statements in `PROVIDED-COPY-REVIEW.md` (commit
`f8d9c5d2…`, blob `a8734fbd…`), records the author's clarification of observation P-1, and
reassesses that review's source-status determination (its Sections 8 and 11) against the
instructions that actually govern it. It responds to a follow-up request from the
author/coordinator context (Markdown file, SHA-256 `7b77387e391fb0b54c22ac040d5d7f757b93e518dd2da9f34266711dcf365a5b`),
which is itself an author statement, not independent testimony or a steward decision. Neither
prior review file in this directory nor the packet is modified; where this addendum and
`PROVIDED-COPY-REVIEW.md` differ, this addendum states the corrected position.

## 1. Summary

| Item                      | Result                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inputs                    | review commit, review blob, packet hash and size, and supplement blob all re-derived and matching the follow-up; `INPUT_INCOMPLETE` not raised (Section 2)                                                                                                                                                                                                                                                                                          |
| Checksum recount          | `SHA256SUMS` has **33** entries; the packet has **34** regular members including `SHA256SUMS`; all 33 verify `OK`; coverage is exact. The earlier "10 of 10" was a **reporting error caused by truncated display**, not an incomplete verification; evidence in Section 3                                                                                                                                                                           |
| Role corrections          | the statements that the maintainer "personally performed" the NIST acquisition and that this was "the only human action" are **withdrawn as unsupported**; supplier identity and operator identity are now distinguished, and nothing is substituted for the unknown (Section 4)                                                                                                                                                                    |
| P-1 disposition           | author clarification **recorded and found consistent with the packet bytes** (the described in-place edit reproduces `acquisition.json` exactly); it remains an author statement; the packet's undisclosed metadata post-processing is now disclosed; no effect on any hash or content determination (Section 5)                                                                                                                                    |
| Source status, reassessed | no governing clause requires the reviewer to download the pages personally; the provenance uncertainty creates **no concrete unresolved evidentiary issue** for the two bounded supporting-documentation claims; the source check for these two pages is recorded as **`COMPLETE_ON_PROVIDED_COPIES`**, superseding the "`SOURCE_ACCESS_INCOMPLETE` retained, residual narrowed" wording, with the provenance limits preserved verbatim (Section 6) |
| Existing numerical GO     | not reopened, not re-assessed, not extended                                                                                                                                                                                                                                                                                                                                                                                                         |
| Wider holds               | untouched (Section 7)                                                                                                                                                                                                                                                                                                                                                                                                                               |

## 2. Inputs verified

| Field                      | Re-derived value                                                                                                            | Matches follow-up |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Review commit              | `f8d9c5d20dd930eca2630459db0199a41d85e96d` (object type `commit`), sole parent `284bdf79…`, equal to the remote branch head | yes               |
| Review path and blob       | `review-inputs/r4-qr-cancellation-source-access/PROVIDED-COPY-REVIEW.md`, blob `a8734fbd60d8a196a85c82e035014f34efccbe54`   | yes               |
| Packet                     | `r4sourcehandoff20260908_1.zip`, SHA-256 `61edb647e867e4e26bc3771acce2eb2e2361924610ba34d7612fa9b184984ba4`, 48,116 bytes   | yes               |
| Supplement                 | commit `0be8bb1519d7aec2810b03192de6590ec9168c60`, blob `007d689e2c44f50df6242137348add66c5019cc8`                          | yes               |
| This addendum pre-existing | no, neither locally nor on the remote branch                                                                                | —                 |

`AGENTS.md` and its ordered prerequisites (`CHARTER.md`, `AUTHORITY.md`, the authority manifest,
the requirement registry, `governance/ID-POLICY.md`, `governance/RFC.md`) were read at the start
of this session and re-consulted for Section 6.

## 3. Checksum recount

Performed on 2026-09-08 at about 07:00 UTC on the same extracted packet, with no display
truncation.

| Measure                                                                | Value                                                                                                                                                                            |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lines in `SHA256SUMS`                                                  | 33                                                                                                                                                                               |
| Distinct paths in `SHA256SUMS`                                         | 33                                                                                                                                                                               |
| Regular (non-directory) members of the ZIP                             | 34                                                                                                                                                                               |
| Regular files after extraction                                         | 34                                                                                                                                                                               |
| `sha256sum -c SHA256SUMS`: lines ending `: OK`                         | 33                                                                                                                                                                               |
| `sha256sum -c SHA256SUMS`: lines not ending `: OK`                     | 0                                                                                                                                                                                |
| Exit status of `sha256sum -c`                                          | 0                                                                                                                                                                                |
| Set of `SHA256SUMS` paths versus set of ZIP members minus `SHA256SUMS` | identical                                                                                                                                                                        |
| Entries by top-level path                                              | `lapack/` 19 (`original.html` + 18 `assets/`), `nist-supplied/` 9, `README.md`, `acquire.py`, `acquisition.json`, `nist-intake.json`, `supplied-archives/nist_prc437.zip` 1 each |

**Why the earlier report said "10 of 10".** In the earlier pass the verification consisted of
three separate commands: `sha256sum -c SHA256SUMS` piped through a frequency count whose display
was cut to its first ten lines; a second `sha256sum -c SHA256SUMS` filtered to lines not ending
`: OK`, which printed nothing; and a set comparison between the `SHA256SUMS` paths and the files
present, which reported identical sets. The second and third commands ran over every entry and
are what supported the statements "every hash … re-computed and matched" and "the set of files
covered … equals the set of files present". The number 10 was read from the truncated first
display, which showed ten of the thirty-three `OK` lines, and was written into the report as the
entry count without being cross-checked against the other two results. Re-running the same
truncated pipeline today reproduces exactly ten displayed lines; removing the truncation shows
thirty-three. The classification is therefore a reporting error, not an incomplete verification:
the checks that establish integrity were complete, and the count that was reported was wrong.
The reader could not have distinguished the two cases from the earlier text alone, which is why
the full recount above is given with its method.

## 4. Supported role descriptions

### 4.1 Statements withdrawn

`PROVIDED-COPY-REVIEW.md` contains, in Section 2, the statements that the maintainer "by the
packet's own record, personally performed the NIST acquisition" and that "the maintainer's `curl`
acquisition of the NIST page is the only human action in the evidence chain, and it was
performed by the party that commissioned the work under review"; in Section 5.2 and Section 8,
that the NIST copy was "acquired by the commissioning maintainer"; and, in Section 11 item 1,
a corroboration route defined as "a party other than the author and the maintainer". These
statements are withdrawn as unsupported. Nothing in the packet identifies who operated `curl`.

### 4.2 What the packet supports

| Role                                                                                                           | Supported description                                                                                                                                                                                                                                  | Basis                                                    |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Commissioner of this review session                                                                            | the repository maintainer's account (GitHub `tasuku-kobayashi`), which opened PR 205, PR 208, and PR 210, uploaded the packet and the follow-up into this session, and asked for the reviews in this directory                                         | PR metadata read through the GitHub API; session uploads |
| Packet preparer (LAPACK copy, `acquisition.json`, `acquire.py`, `nist-intake.json`, `README.md`, `SHA256SUMS`) | "the continuing OpenAI-assisted authoring context", per the packet's own description                                                                                                                                                                   | packet `README.md`; `nist-intake.json` `kind` field      |
| NIST copy: supplier                                                                                            | a party the packet calls "the user" relative to the authoring context ("user-supplied copy"); the packet does not name that party                                                                                                                      | packet `README.md`; `nist-intake.json`                   |
| NIST copy: operator of `curl`                                                                                  | **not identified.** The acquisition record states that a Linux command-line client (`curl`, TLS) with a browser-like User-Agent was used and that no GUI browser was used; it does not say who ran it, whether by hand or by script, or from what host | the acquisition record text file under `nist-supplied/`  |
| Human contributions in the evidence chain                                                                      | **not fully established.** Known: the commissioner's requests and uploads. Unknown: who operated `curl` for the NIST copy, and whether any other person handled the files between acquisition and packaging                                            | absence of any attribution in the packet                 |
| Reviewer                                                                                                       | Anthropic `claude-fable-5-1` in this Claude Code remote session, the same session that produced `284bdf79…` and `f8d9c5d2…`; no other model or person contributed to the reviews themselves                                                            | session service report; Section 2 of the prior reports   |

The corrected independence statement is: the reviews in this directory are separate from the
author's model and provider and from the authoring work context; they are not separate from the
model family of the PR 208 and PR 210 reviewers; the packet was prepared by the authoring context
and its NIST copy by an unidentified supplier and operator; no human-investigator independence is
claimed, and no human contribution beyond the commissioner's is asserted. The corroboration route
in Section 6.4 is restated in terms of "a party independent of the authoring context and of the
NIST supplier" rather than naming the maintainer.

## 5. P-1 disposition

The follow-up states that `acquire.py` in the packet is the script that was executed, and that
after execution the author/coordinator replaced only the `method` string in every
`acquisition.json` record with the longer wording, leaving source files, URLs, timestamps,
statuses, sizes, and hashes untouched; it gives the equivalent post-processing code.

What this review can check against the bytes, and did:

- `acquisition.json` is byte-identical to `json.dumps(records, ensure_ascii=False, indent=2)`
  plus one trailing newline, which is exactly how both the supplied script and the described
  post-processing write the file.
- Every record's keys appear in the insertion order the supplied script produces
  (`requested_url`, `started_utc`, `method`, then the response fields, then
  `html_img_attributes` for image records), consistent with the `method` value having been
  replaced in place rather than the records being rebuilt.
- All 20 records carry the identical replacement string, as the described loop would produce.
- Taking the file, substituting the script's original string into every record, and then
  applying the described replacement reproduces the packet's `acquisition.json` byte for byte.
- The 19 `bytes` and `sha256` values, the 18 image attribute dictionaries, and the recorded
  URLs were already matched against the files and the HTML in `PROVIDED-COPY-REVIEW.md`
  Section 4.

Disposition: **recorded; consistent with the evidence; not independently established.** The
clarification explains the discrepancy noted in P-1 without contradiction, and the bytes are
consistent with it; but the bytes cannot show that no other field was edited, only that every
field checked matches the files it describes. The residual is the one the follow-up itself
names: the metadata post-processing was not disclosed in the packet, and its disclosure now is
an author statement. The packet is preserved unchanged, as requested; no attempt was made to
"repair" the script to match. P-1 does not affect any hash, any content determination in
`PROVIDED-COPY-REVIEW.md` Section 6, or the provenance classification of either copy.

## 6. Source-status reassessment

### 6.1 The instructions that govern

| Source                                            | Text (verbatim or closely paraphrased)                                                                                                                                                                                                                                                                                                                                                   | Kind                             |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `governance/RFC.md`, research gate item 2         | "At least one research pass is performed independently of the agent or reviewer responsible for the proposed solution. For statistical or numerical methodology, the project requires a separate LLM/model to perform an independent primary-source review before implementation"                                                                                                        | governance                       |
| `governance/RFC.md`, research gate item 3         | "Decision-bearing claims are grounded in primary sources appropriate to the domain … Secondary sources may assist discovery or context but do not silently replace the primary basis"                                                                                                                                                                                                    | governance                       |
| `governance/RFC.md`, last paragraph before Stages | "Uncertainty is not resolved by copying the behavior of the reference implementation, by model memory, or by silently choosing the most convenient behavior"                                                                                                                                                                                                                             | governance                       |
| `AGENTS.md`, hard rules                           | independent primary-source review by a separate investigator is required before statistical or numerical methodology is promoted into design or implementation; provenance records name the accountable role, review scope, independence boundary, inspected sources, date, environment, and hashes                                                                                      | governance                       |
| PR 208 review, Section 5                          | "Completion work for a reviewer with access: fetch both pages, record the retrieval date and a content hash, confirm the partition, degrees-of-freedom, and driver-family statements"                                                                                                                                                                                                    | reviewer-written completion note |
| PR 210 review, Section 12 item 1                  | "A reviewer with access to `itl.nist.gov` and `www.netlib.org`: complete Section 5 for the two documentation pages (date, acquisition method, raw HTML hash distinguished from extracted text, …). This remains supporting-documentation closure only"                                                                                                                                   | reviewer-written completion note |
| First commission in this session (maintainer)     | if official retrieval fails and sufficient original material has not been provided, keep `SOURCE_ACCESS_INCOMPLETE`; distinguish raw HTML, tool-extracted text, and provided copies; do not substitute author summaries or hash matches for content inspection                                                                                                                           | commission                       |
| Packet `README.md`                                | commissions a provided-copy review; "Neither is your own direct official retrieval. Inspect provenance and content separately"; "SOURCE_ACCESS_INCOMPLETE is not automatically closed by receiving files: the reviewer assesses provenance, actual content, missing-resource impact and the bounded claims"; "Keep SOURCE_ACCESS_INCOMPLETE if the required evidence remains incomplete" | commission                       |

None of the governance texts requires that the reviewing party itself perform the HTTP transfer,
and none prohibits review of supplied originals. The research gate requires that the pass be
performed by a party independent of the solution author and that claims rest on primary sources
rather than memory or convenience; it is silent on who carries the bytes. The two "reviewer with
access" sentences were written by the PR 208 and PR 210 reviewers, in this same model family,
to describe the route that was open when the pages could not be reached; they are completion
notes, carry no "MUST", and were not adopted by any steward. `PROVIDED-COPY-REVIEW.md` Section 8
treated the second of them as a standing prerequisite ("retrieval by a reviewer with access to
the official hosts: no") and on that basis retained `SOURCE_ACCESS_INCOMPLETE`. That treatment
elevated a completion note into a universal requirement without a controlling clause. **No
controlling clause makes independent downloading mandatory.** The first commission in this
session expressly contemplated that sufficient provided original material could satisfy the
check, and the packet commission expressly asks for a provided-copy review.

### 6.2 Is there a concrete unresolved evidentiary issue?

The provenance route does not prove the suppliers' transfer claims. That disclosure stands as
written in `PROVIDED-COPY-REVIEW.md` Sections 5.1, 5.2, and 9 (P-2 to P-4). The question the
follow-up asks is whether this unproven residue leaves a concrete issue for the two bounded
claims, which are: (A) the NIST page describes a fixed-effects, equally replicated `a × b`
layout whose corrected total sum of squares partitions into A, B, AB, and error with `N − ab`
residual degrees of freedom; (B) the LAPACK page distinguishes `xGELS`, full-rank, QR or LQ, from
the rank-deficient-capable `xGELSX`/`xGELSY`/`xGELSS`/`xGELSD` drivers.

Two ways the residue could matter were considered.

1. **The copies might not be what the official hosts serve.** Against this: the reviewed bytes
   are identified by hash and were hashed by the two supplying parties independently of this
   review; the LAPACK copy carries the LaTeX2HTML 98.2 generator header and the 1999-10-01
   address block of that document family, and the NIST copy carries a per-response CDN challenge
   script with an embedded timestamp inside the reported window, a federated-analytics tag, and
   the site's header-footer include paths, all observed in the bytes. These markers are
   consistent with live responses and are not proof. The decisive point is different: neither
   claim is decision-bearing for the supplement's verdict. Both were independently re-derived
   from the design matrix and from upstream LAPACK and NumPy sources retrieved with hashes
   (PR 208 Section 6.1; PR 210 Sections 5 and 7), and PR 210 Section 5 records that the content
   verdict does not depend on either page. A copy altered to misstate either claim would
   contradict those independent derivations and be detected; a copy altered in any other way
   would change nothing the reviews rely on. There is therefore no determination in this
   directory, in PR 208, or in PR 210 whose correctness turns on the transfer claims.
2. **The official pages might differ now or later.** The NIST page embeds per-response values
   (the challenge script's `t` and `r` fields), so its raw-byte hash is expected to differ on
   every retrieval even when the content is unchanged; the LAPACK page is a static 1999 file but
   may still be re-published. A later hash mismatch is therefore not diagnostic of anything by
   itself; the meaningful comparison is of the substantive passages quoted in
   `PROVIDED-COPY-REVIEW.md` Section 6. This corrects that review's Section 8 and Section 11,
   which said that a hash match "would close the residual"; for the NIST page a raw-hash match
   across retrievals is not even the expected outcome.

Conclusion: the provenance residue is a disclosed limitation, not a concrete unresolved
evidentiary issue for claims (A) and (B). No proportionate additional evidence is required for
the bounded claims. What would add corroboration, if a steward wants it, is stated in
Section 6.4; it is optional, not a condition.

### 6.3 Determination

For the two supporting-documentation pages, the source check is recorded as
**`COMPLETE_ON_PROVIDED_COPIES`**, meaning:

- the reviewing party, separate from the author's model, provider, and work context, read the
  primary text and images of both pages from hash-identified bytes and found every bounded
  claim supported at the quoted locations, with no contradiction (`PROVIDED-COPY-REVIEW.md`
  Sections 6 and 7, unchanged);
- the bytes are supplied originals, not the reviewer's own transfers; the HTTP status, absence
  of redirect, User-Agent, exact times, and operator identity of the NIST copy remain
  supplier-reported or unknown, and the LAPACK transfer details are author-recorded with a
  post-edited method string (Section 5); these limits are part of the record and are not
  discharged by this determination;
- `SOURCE_ACCESS_INCOMPLETE`, as defined in PR 208 Section 5 and PR 210 Section 5 (pages not
  inspected, no content hash, characterisation not re-inspected), no longer describes the state
  of these two pages, and the "retained, residual narrowed to provenance" wording in
  `PROVIDED-COPY-REVIEW.md` Section 8 is superseded by this section.

This is a reviewer determination within the commissioned scope. It is not a steward decision,
does not make the pages primary methodological sources, and does not close the original
factorial-methodology source holds, which concern different sources.

### 6.4 Optional corroboration and reopen conditions

1. Optional: any party independent of the authoring context and of the NIST supplier may
   retrieve either page from its official host and compare the passages quoted in
   `PROVIDED-COPY-REVIEW.md` Section 6 with the retrieved content. Report date, requested and
   final URL, method, byte count, and raw-byte hash for the record, but treat a hash difference
   as expected for the NIST page and as a prompt for content comparison for either page.
2. Optional: the packet preparer may add the disclosure of the `acquisition.json` method-string
   edit to a successor packet so that the packet is self-describing.
3. Reopen this addendum if the supplement blob `007d689e…`, the review blobs `13167c81…` or
   `a8734fbd…`, or the packet `61edb647…` change, or if a content comparison under item 1 shows
   a substantive difference from the quoted passages.

## 7. Boundary statement

This addendum concerns reporting accuracy, role attribution, one provenance-record
clarification, and the status label for two supporting-documentation pages. It re-executes no
numerical probe, makes no request to either official host, and re-reviews neither SF-1 nor N-1
to N-9. It does not close the original factorial-methodology source holds in the Release 4
preparation package, the S6 unbalanced two-system hold from the semantic result at `a2687f10…`,
the programme `INPUT_INCOMPLETE`, or the numerical commission; it does not authorise any
production algorithm, graph selection, tolerance, or release. Release 3 scope and numbering are
unchanged. The existing numerical `GO` for the supplement at `0be8bb15…` is not reopened. No
merge, ratification, identifier issuance, public discussion, website claim, or method adoption
is made or authorised by this record.

## 8. Validation

Performed in the session container on branch `claude/pr210-nist-lapack-verification-j44enn`
after adding this file, with dependencies installed by `pnpm install --frozen-lockfile`:
Prettier on this file (`--write` then `--check`), `pnpm lint:markdown`, `pnpm typecheck`,
`pnpm validate`, and `git diff --check` with confirmation that the only change against
`f8d9c5d2…` is the addition of this file. All passed on the committed text: Prettier reports
the file formatted; `pnpm lint:markdown` reports 361 files, 0 issues; `pnpm typecheck` is clean;
`pnpm validate` reports every validator clean; `git diff --check` is clean and the staged diff
adds exactly this one file. No authoritative artifact, generated file, or production code
changed, so the full `pnpm check` suite was not run, consistent with the prior reviews.

## 9. Provenance

- Addendum date: 2026-09-08 (recount and checks 06:58–07:05 UTC).
- Inputs: Section 2; the follow-up request file, SHA-256 `7b77387e…`, read in full.
- Reviewer: Anthropic `claude-fable-5-1` in a Claude Code remote session (session identifier in
  the commit trailer), the same session as `284bdf79…` and `f8d9c5d2…`; no other model or person
  contributed to the addendum; the author/coordinator context supplied the follow-up statement
  assessed in Section 5.
- Tools: `git` and the GitHub API for identities; `unzip -Z1`, `sha256sum -c`, `awk`, `sort`,
  `diff`, `wc` for the recount; Python 3 standard library `json` for the byte-level checks in
  Section 5. No network access to either official host was attempted.
- Validation results: Section 8.
- Only file created by this addendum:
  `review-inputs/r4-qr-cancellation-source-access/PROVIDED-COPY-REVIEW-ADDENDUM.md`. Both
  prior review files in this directory, the reviewed supplement, the PR 208 and PR 210 review
  files, the packet, and all other artifacts are unchanged.
