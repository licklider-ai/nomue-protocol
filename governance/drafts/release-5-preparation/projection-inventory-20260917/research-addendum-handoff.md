# Independent Release 5 research addendum handoff

Status: ready-to-use bounded commission, not a research result or a gate closure.
Use a fresh investigator context separate from the proposal and inventory author.
Disclose the investigator/model/provider, prior involvement and actual source
access. Do not call a second author-side pass independent.

## Fix the review inputs first

Repository: `licklider-ai/nomue-protocol`. Main baseline for this packet:
`a24958e1107cc75ecf189eb0176691357812a6ba`.
Review the exact proposed packet commit stated in its PR, not a floating branch.
Record that head and tree and check every source hash with `check.mjs` before using
the inventory. Reviewers without repository access need exports of the frozen RFC,
research result, commission, authorization request and this packet including its
named source schemas; they should report which identity checks they cannot perform.

Read [the commission](../research-commission.md),
[the original research result](../research-result.md),
[the opening RFC](../opening-rfc-candidate.md),
[the opening receipt](../public-opening-record.md) and this packet. Preserve prior
results; deliver a separately attributable addendum. Existing unaffected claims
can be reused within their recorded inspection scope.

## Source-access hold to resolve

The original result's `R5-RH-1` names the following sources. These are acquisition
targets, not a claim that the coordinator read their full text. Record exact edition,
URL/DOI, retrieved artifact SHA-256, inspected pages/sections and the claim affected.
Abstracts and search snippets do not close the hold.

| Original source                              | Identity                                                       | Specific purpose                                                                           |
| -------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| SRC-S1 Hurlbert (1984)                       | DOI `10.2307/1942661`                                          | Experimental-unit and pseudoreplication distinctions                                       |
| SRC-S2 Lazic (2010)                          | DOI `10.1186/1471-2202-11-5`                                   | Unit versus observational repetition and independence                                      |
| SRC-S3 ARRIVE explanation/elaboration (2020) | DOI `10.1371/journal.pbio.3000411`                             | Exact experimental-unit guidance, preserving source domain                                 |
| SRC-S7 Zimmerman (1997)                      | DOI `10.3102/10769986022003349`                                | Paired and independent observations; limits of correlation-based inference                 |
| SRC-S8 Zimmerman (2004); Rasch et al. (2011) | DOI `10.1348/000711004849222`; DOI `10.1007/s00362-009-0224-x` | Outcome-dependent preliminary testing; no unsupported general selection theorem            |
| SRC-S9 Nosek et al. (2018)                   | DOI `10.1073/pnas.1708274114`                                  | Preregistration versus an unproved timing declaration                                      |
| SRC-S13 ICH E9 (1998)                        | CPMP/ICH/363/96, especially sections 5.2 and 7                 | Analysis sets and pre-unblinding planning; do not generalize clinical rules to all domains |

If full text cannot be obtained, preserve each unresolved claim and acquisition
limitation. A source may be removed from decision support only with an explicit
claim-level rationale and a resulting scope recommendation; lack of access is not
successful confirmation. Do not commit copyrighted full texts without permission.

## Questions beyond the earlier pass

Answer commission Q11–Q14 explicitly. Assess the actual opening scope: common
projection, timing, report evidence and non-claims. Product selection policies are
excluded. In addition, resolve or narrowly hold these inventory questions:

1. Which common experimental-unit facts are expressible without treating a free-text
   unit label as a scientific classification?
2. How can independent-family repetition and R2 within-pair repetition be exposed
   without losing their different meanings or redoing admissibility?
3. Can the exact D0 compound declarations justify an explicit mapping for pairing,
   repetition and clustering, or are successor Profile declarations needed?
4. Can D0 per-analysis population membership yield the intended population status;
   what exact prerequisites and exclusions are needed?
5. How should independent-family pair-identity inapplicability be represented without
   an absent-field default or a fabricated declaration?
6. Is supplied-dataset-wide outcome access an appropriate stated convention? Assess
   later excluded observations, selector input context, post-access edits and
   restoration, and access to other datasets. Separate coherence from source-backed
   claims that this is a scientific standard.
7. What can a Record-only verifier actually establish about timing? Distinguish
   presence/enum/report consistency from truth, identity, authentication and history.

Use constructed counterexamples to expose ambiguous mappings. Label source facts,
logical deductions and proposed conventions separately. No new public enum or
schema is frozen by this investigation.

## Deliverable and disposition

Return an English addendum with fixed inputs; inspected source inventory; individual
R5-RH-1 dispositions; Q11–Q14 answers; answers to the seven questions above;
counterexamples; earlier claims changed or preserved; and exact remaining holds.
Recommend whether each proposed mapping can advance to an unissued schema draft,
needs a Profile successor, should narrow the scope, or still needs evidence.

Use `PROCEED`, `PROCEED_AFTER_REPAIR` or `HOLD` for the bounded next design step,
with a separate source-access and independence disclosure. This is not an adoption,
issuance, runtime-support or release verdict. Do not change the public RFC issue,
its clock, registries, historical schemas, implementation or retained review files.

The steward assesses the independently produced result before research closure.
Prepare the report and exact remaining decision questions; do not infer approval
from a passing inventory script or from the discussion already being open.
