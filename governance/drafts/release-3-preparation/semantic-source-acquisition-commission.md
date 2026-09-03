# Release 3 Semantic Source-Acquisition Commission

**Status: informative follow-up research commission; non-normative; not adopted.**
This commission asks for the primary-text work needed to resolve source-acquisition
holds SR-A through SR-L in the reviewed Release 3 semantic catalogue. It selects no
procedure, Contract, identifier, schema, Public Check, implementation, or release
outcome.

## Fixed repository inputs

Perform the work against:

- commit `7bd9c5ab854777c3e99e624d9d2ed62731228852`;
- tree `f0436f5784dbe34d4c150893c20a60f0431c5d90`;
- semantic result
  `governance/drafts/release-3-preparation/semantic-research-result.md`, blob
  `8f21526040924b891f64724c2d0fde9ea94eff92`;
- original semantic commission, blob
  `c6760efc8450efe5fe2da6ccce2b2fac4846c066`; and
- the preserved full and repair review results, blobs
  `fc61decb017821c403841a6db822ccd5e5b7233d`,
  `e646429582d206d5299ce5ff1d0c2b8978323cd3`, and
  `395054fd1e2f22a5ad63460b86be0394de429605`.

Verify these identities before source work. Read `AGENTS.md`, `CHARTER.md`,
`AUTHORITY.md`, and `governance/RFC.md`. Private repositories are outside scope.

## Question

Can the source-acquisition holds in Section 17 of the semantic result be closed by
direct inspection of the identified primary texts, without silently changing a
procedure variant, assumption, guarantee, comparison family, or output claim?

This is a source-completion pass, not a new catalogue search. A newly discovered
material in-scope technique is recorded as a reopen trigger; it is not silently
inserted into the reviewed catalogue.

## Required source coverage

Inspect the sources assigned to every hold in the semantic result:

| Hold | Coverage                                          |
| ---- | ------------------------------------------------- |
| SR-A | omnibus procedures OMN-01 through OMN-04          |
| SR-B | PVL-01 attribution and PVL-02                     |
| SR-C | PVL-06 through PVL-10                             |
| SR-D | CLS-01 through CLS-06                             |
| SR-E | APR-01 historical attribution                     |
| SR-F | APR-05 and APR-06                                 |
| SR-G | APR-09                                            |
| SR-H | APR-10 through APR-14                             |
| SR-I | HET-01 through HET-03                             |
| SR-J | MTO-02, MTO-03, and MCB-01                        |
| SR-K | FDR-01 dependence scope and FDR-02 through FDR-04 |
| SR-L | GUI-01 and GUI-02                                 |

The exact source names are those in Sections 2.2 and 17 of the fixed semantic
result, including the supplemental sources named in the applicable hold rows.
Do not treat a search snippet, software manual, textbook summary, or model memory as
a substitute for a decision-bearing primary source.

Lawfully supplied local copies may be inspected. Do not commit copyrighted source
files unless their redistribution terms clearly allow it. For each inspected
artifact, record its bibliographic identity, acquisition route, inspection date,
SHA-256, and exact printed page, section, theorem, table, or equation pinpoints.

## Required analysis

For each affected catalogue entry:

1. identify the exact procedure and variant described by the source;
2. separate the source's stated result from investigator inference;
3. record the member set, null or interval target, error criterion, and guarantee
   strength;
4. record sampling, variance, dependence, balance, ordering, selection, and
   degrees-of-freedom assumptions;
5. record the result classes and numerical quantities the source actually
   justifies;
6. identify any mismatch with the reviewed catalogue;
7. state whether the source supports, narrows, contradicts, or does not resolve the
   catalogue characterization; and
8. state the exact reopen condition for anything not closed.

Conflicting primary sources are not resolved by majority count or convenience.
Record the conflict and require separate adjudication.

## Hold dispositions

Assign exactly one disposition to each of SR-A through SR-L:

- `CLOSED`: all decision-bearing source claims needed by the hold are directly
  supported, with exact artifact identity and pinpoints;
- `PARTIAL`: some claims are supported but named gaps remain;
- `NO_GO`: inspected evidence materially contradicts the proposed catalogue
  treatment; or
- `INPUT_INCOMPLETE`: required source text cannot be identified or inspected.

`CLOSED` does not select the procedure for Release 3. It means only that the
source-acquisition obstacle has been removed.

## Required output

Write one English report at:

`governance/drafts/release-3-preparation/semantic-source-acquisition-result.md`

The report must contain:

1. repository identity and every inspected source artifact identity;
2. an acquisition log, including failed routes;
3. a claim-to-source table with exact pinpoints;
4. one disposition for every hold SR-A through SR-L;
5. an entry-by-entry impact table covering every item assigned to those holds;
6. conflicts, unresolved questions, and reopen conditions;
7. a statement of whether the existing `NARROW` program disposition can be
   reconsidered for the comprehensive public question; and
8. one overall disposition:
   `SOURCE_SET_READY`, `PARTIAL`, `NO_GO`, or `INPUT_INCOMPLETE`.

`SOURCE_SET_READY` means only that the source basis needed to reconsider the
comprehensive Release 3 public question is reviewable. It does not open public
discussion, change the existing semantic result, adopt its catalogue, or authorize
implementation.

## Repository boundary and review

- Add only the required result file.
- Do not edit the fixed semantic result, either commission, the RFC draft,
  authoritative artifacts, registries, schemas, conformance artifacts, reference
  code, or Release 2 material.
- Use neutral, role-based public metadata and branch naming.
- Run `pnpm format:check`, `pnpm lint:markdown`, and
  `node --import tsx tooling/src/validate.ts`.
- Open a review PR; do not merge it.
- The result requires an independent exact-head primary-source review before any
  hold or public-opening gate is treated as closed.
