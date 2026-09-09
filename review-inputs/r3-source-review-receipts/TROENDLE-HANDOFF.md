# Bounded Troendle supplied-source investigation

Use the immutable integration commit identified in the submitting PR body as
INPUT_COMMIT. Pin that full SHA before beginning; do not silently follow a
moving branch. This document is a future investigation instruction, not evidence
that the investigation has already occurred.

## Task and fixed inputs

Investigate only the supplied Troendle (1995), "A Stepwise Resampling Method of
Multiple Hypothesis Testing," JASA 90:370-378, supplier 30, for its exact RSM-02
variant and assumptions. The approved supplied-source cap is effective and needs
no reapproval. Do not acquire new originals or treat bibliography entries as
independently inspected sources. PR #174/#263/#265 algorithm repair is separate.

Read AGENTS.md and its ordered Read-first documents, applicable local instructions,
the semantic-source-acquisition commission, and cumulative Parts Y, Z and AA.
Read the Ge report at `review-inputs/r3-supplied-source-scope/REVIEW-RESULT.md`
as prior bounded evidence; reuse it with attribution rather than calling it a
new independent source reading. The fixed semantic catalogue is at commit
`7bd9c5ab854777c3e99e624d9d2ed62731228852`, blob
`8f21526040924b891f64724c2d0fde9ea94eff92`. Locate its path from the tree.

Verify INPUT_COMMIT has sole parent
`9e95cdee40b64cbf0f42dca8e3fab1c075507168`, changes only the cumulative append
and the two files under this handoff directory, and preserves the 542963-byte
Parts A-Z prefix with SHA-256
`8fbe47a29f0953823af1288331b53cffa20088fb612dedd3af6856bdf8857162`.
Verify the current cumulative result against its committed blob before edits;
preserve its entire bytes as the next append's prefix.

## Supplied PDF identity

- File: `30_Troendle_1995.pdf`.
- Bytes: 1020647. PDF pages: 10.
- SHA-256: `21c9fbad95c8c29e709863aa45d314deca1f70f4bf148da1b7407f3178f08b54`.
- Existing purchase ZIP: identify it by the archive hash below in the custody inventory.
- ZIP member: the entry ending in `/30_Troendle_1995.pdf`.
- ZIP SHA-256: `7066b13da148d8d00034c053012f245f73583fbd51e6f7c6fa702f1f8d67c6c0`.

The PDF identity is the controlling source pin. Locate the existing supplied PDF
or archive; if unavailable, ask for that same file to be attached. Do not replace
it from the internet. Check cover/article page mapping, extract the full text,
and inspect page images for every decision-bearing definition, algorithm,
theorem, assumption, equation and table. Record unreadable passages explicitly.

## Questions and required reasoning

1. Identify the hypothesis family, statistic, direction of extremeness, step order,
   resampling scheme and shared resamples, treatment of ties, probability counting,
   stopping rule, and any adjusted-p construction actually given in the paper.
   If something is unspecified, distinguish it from an investigator convention.
2. State the precise error criterion and whether the guarantee is finite-sample,
   asymptotic, approximate or conditional. List exchangeability, dependence,
   consistency or other conditions only as supported by exact source pinpoints.
   Separate source theorems from your own derivations and citations to unread work.
3. Compare this variant with the previously investigated Ge maxT/minP variants.
   State what differs and what cannot be inferred. Do not claim that one supplied
   paper closes every Westfall-Young, Troendle or Romano-Wolf variant.
4. Build a small deterministic independent example from the printed algorithm.
   Prefer exact enumeration/rational arithmetic where applicable. Check ordering,
   ties, shared resampling and the first true rejection step. Compare a shortcut
   with explicit intersections only if the paper or a separately stated proof
   justifies that comparison. A finite diagnostic is not a universal FWER proof.
5. Map supported claims and unresolved/excluded claims to RSM-02. Explain whether
   this adds bounded evidence without changing the full historical hold. Preserve
   the distinction between semantic evidence and numerical/runtime certification.

## Deliverables and boundaries

Create a neutral branch from INPUT_COMMIT, for example
`research/r3-troendle-supplied-primary-20260909`. Do not overwrite an existing
branch. Write an English report under
`review-inputs/r3-troendle-supplied-primary/REVIEW-RESULT.md`, a disposable
reproduction script if numerical checks warrant it, and the next cumulative
append (Part AB if still free on the fixed input). Include exact input/PDF/output
identities, page pinpoints, claim boundaries, commands/results, independent-review
handoff, and truthful author/provider/context disclosure without inventing model
identity or independence. Do not commit the copyrighted PDF.

Preserve the 9 CLOSED / 1 PARTIAL / 4 INPUT_INCOMPLETE ledger and all members,
SOURCE_SET_READY=false, overall INPUT_INCOMPLETE, prior limited acceptances,
NARROW/TRANSFER and the existing candidate/reserved classifications. Do not
silently close a hold, substitute a source, adopt a method, repair the separate
numerical lane, merge, or authorize public opening. A candidate future scope
proposal can be identified explicitly as unapproved.

Run `pnpm format:check`, `pnpm lint:markdown`,
`node --import tsx tooling/src/validate.ts`, and `git diff --cached --check`,
plus the new diagnostic and prefix/unchanged-file checks. Disclose unavailable
or failed checks accurately. Commit and create a separate draft PR targeting the
integration branch, with immutable identities and validation in its body. Finish
with a Japanese report of findings, limitations and the precise next review task.
