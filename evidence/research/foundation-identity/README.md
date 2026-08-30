# FND-1 and FND-2 Independent Research Package

**Status: informative research input; non-normative; not adopted.** This
package commissions two independent primary-source investigations. It creates
no Protocol meaning, supported capability, schema, identifier, implementation
authority, or release decision.

## Purpose

The package prepares foundational evidence before any dependent Protocol design
is frozen:

- **FND-1:** estimand identity, inference routing, and multiplicity;
- **FND-2:** analysis-data identity, missingness, provenance, and standards
  linking.

The two investigations are deliberately separated. They may run in parallel,
but each is assigned to a different model or investigator and a separate
authoring context. Neither investigator uses the other investigation's result
as evidence.

Release 2, its candidate work, paired-t procedures, and t-family numerical
contracts are outside both investigations. Nothing in this package changes the
current Release 2 scope or investigation line.

## Repository-native entry points

| Investigation | Reviewer entry point                 | Result file to replace                                                                               |
| ------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| FND-1         | [`fnd-1/README.md`](fnd-1/README.md) | [`fnd-1/2026-08-30-independent-research-result.md`](fnd-1/2026-08-30-independent-research-result.md) |
| FND-2         | [`fnd-2/README.md`](fnd-2/README.md) | [`fnd-2/2026-08-30-independent-research-result.md`](fnd-2/2026-08-30-independent-research-result.md) |

Shared inputs:

- [`2026-08-30-counterexample-corpus-v1.md`](2026-08-30-counterexample-corpus-v1.md)
- [`2026-08-30-common-response-template-v1.md`](2026-08-30-common-response-template-v1.md)

No archive or out-of-repository attachment is required. A reviewer starts from
the assigned entry point, performs the primary-source investigation, replaces
only the assigned result placeholder, runs the repository checks named in the
entry point, commits the result on a reviewer-owned branch, and pushes that
branch for adjudication.

## Independence and branch discipline

Each reviewer branches from the exact commit containing this package. The FND-1
reviewer changes only the FND-1 result file; the FND-2 reviewer changes only the
FND-2 result file. Input files remain unchanged during the investigation.

If prior nomue conclusions, earlier research packages, adjudication records, or
the other investigation's result are automatically visible, the investigator
discloses that exposure and does not use those materials as evidence. Search
snippets, another model's answer, blogs, and product descriptions do not replace
the required primary sources.

## Handoff boundary

A completed result can recommend `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO` for
Research Gate adjudication. It cannot adopt a Protocol field, schema, identifier,
method default, transport standard, implementation, or release change.

## Provenance and sanitization

- Commissioning context: foundational research preparation under the Research
  Gate described in `governance/RFC.md` and the informative frontier in
  `governance/drafts/research-frontier-map.md`.
- Package completion date: 2026-08-30.
- Citing decision record: none; this is pre-decision research input.
- Sanitization check: complete (2026-08-30, reviewer: research-package
  preparer).
- All checklist items checked; remediation performed: none.

Each completed result repeats the sanitization self-check before it is pushed.
