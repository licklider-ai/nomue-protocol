# External Research Document Intake (Batch W scaffolding)

**Status: intake framework only.** This directory receives external
research documents that decision records reference - the two S1/D3
surveys, the R-A survey, and future falsification reviews. The framework
(location, naming, linking, registration, sanitization) is prepared here;
**the document files themselves are provided by the steward**, and none
are present until the steward completes the intake procedure below.

## Reserved locations

| Subdirectory             | Reserved for                                               | Referenced from                   |
| ------------------------ | ---------------------------------------------------------- | --------------------------------- |
| `s1-d3-survey-1/`        | S1/D3 external survey 1 (log-channel floor analysis)       | ADR-0025 (D3, attachment pending) |
| `s1-d3-survey-2/`        | S1/D3 external survey 2 (native log-tail regime analysis)  | ADR-0025 (D3, attachment pending) |
| `r-a-survey/`            | R-A survey material                                        | future R-A decision record        |
| `r-b-survey-1/`          | R-B survey 1 (canonicalization/input constraints)          | ADR-0027 (Batch 5, pending)       |
| `r-b-survey-2/`          | R-B survey 2 (canonicalization/input constraints)          | ADR-0027 (Batch 5, pending)       |
| `r-b-falsification/`     | R-B targeted falsification results                         | ADR-0027 (Batch 5, pending)       |
| `falsification-reviews/` | Falsification review reports (one subdirectory per review) | future review records             |

Subdirectories are created at intake time (git does not track empty
directories); this table is the reservation.

## Naming convention

`<subdirectory>/<YYYY-MM-DD>-<short-kebab-slug>.<ext>` - the date is the
document's completion date (not the intake date), the slug is a short
content descriptor, and the original file format is kept (`.md`, `.pdf`,
`.docx` are all acceptable; a `.md` summary alongside a binary original is
encouraged). Each subdirectory gets a small `README.md` stating the
document's provenance: author, completion date, commissioning context, and
which decision record cites it.

## Intake procedure (steward)

1. **Sanitize first**: run the document through
   [SANITIZE-CHECKLIST.md](SANITIZE-CHECKLIST.md) and record the completed
   checklist in the subdirectory's `README.md`. This repository is
   public-facing; nothing enters before the checklist is complete.
2. Place the file under the reserved subdirectory using the naming
   convention, plus the provenance `README.md`.
3. **Link from the citing decision record** by appending a dated note (ADR
   discipline: append, never rewrite), e.g. in ADR-0025's D3 section:
   `Attached <date>: evidence/research/s1-d3-survey-1/<file>`.
4. **Register in the authority manifest**: add an entry to
   `authority/authority-manifest.yaml` under the artifact list,
   `class: informative` (research input, never authoritative), with a
   one-line note. Then run `pnpm generate` (refreshes
   `generated/AUTHORITY-INDEX.md`) and `pnpm check` before committing.
5. Commit with a message naming the decision record the document serves.

## Class discipline

Everything in `evidence/research/` is **informative research input**: it
never carries normative authority, never closes a gate by itself, and a
decision record citing it remains the decision's authority
(`AUTHORITY.md`).
