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
but each runs in a reviewer context independent of the package-authoring
context. Separate investigators or models are preferred. If one external
investigator handles both packages, the work uses isolated contexts and neither
investigation has access to the other result.

FND-1 now uses two isolated passes with different jobs: a Genspark
primary-source pass and a Claude Code repository-analysis pass. Neither pass
sees the other result before reconciliation. The FND-1 entry point defines the
active execution mode and preserves the original scientific question set. Both
passes and their source-bounded reconciliation are now complete; the disposition
is `NARROW`, the full FND-1 Research Gate remains open, and no Protocol adoption
is authorized.

Three bounded source-completion follow-ups are now commissioned. Each uses an
external primary-source pass and a separate repository-analysis pass, with
reconciliation only after both results are frozen:

| Topic                           | Commission                                                                                                                                 | Open boundary                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Non-clinical estimand structure | [`fnd-1/2026-08-31-nonclinical-estimand-source-closure-commission.md`](fnd-1/2026-08-31-nonclinical-estimand-source-closure-commission.md) | `FND1-H04`                                             |
| All-pairs successor sources     | [`fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md`](fnd-1/2026-08-31-all-pairs-successor-source-closure-commission.md)   | Retained all-pairs and unequal-size source requirement |
| Analysis-data source completion | [`fnd-2/2026-08-31-analysis-data-source-completion-commission.md`](fnd-2/2026-08-31-analysis-data-source-completion-commission.md)         | FND-2 `HOLD-01` through `HOLD-04`                      |

The commissions create research work only. Their pending result placeholders
record no findings or decisions, and none of the follow-ups authorizes Protocol
adoption.

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

No archive or out-of-repository attachment is required. Each pass starts from
its assigned entry point. The Genspark pass returns one Markdown report for
verbatim intake. The Claude Code pass replaces only its assigned result
placeholder, runs the named repository checks, commits on a reviewer-owned
branch, and pushes that branch for reconciliation.

The newer source-completion follow-ups use role-based pass names and the same
operating pattern without naming the drafting or review mechanism in their
public artifacts.

## Independence and branch discipline

Each repository-operating reviewer branches from the exact commit containing
its commission. The FND-1 Claude Code reviewer changes only the Claude Code
pass-result file; the FND-2 reviewer changes only the FND-2 result file. Input
files remain unchanged during the investigation. Genspark does not claim a
repository operation; its returned Markdown is taken in separately.

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
