# Release 3 Independent Multi-Group Statistical Semantics Commission

**Status: informative research commission; non-normative; not adopted.** This
commission produces Research Gate input for a possible Release 3 RFC. It does not
select a Contract, procedure, identifier, schema, Public Check, support domain, or
release outcome.

## Independence and posture

Assign this work to an investigator who did not author the Release 3 scope proposal
or its future implementation. The investigator attempts to falsify the proposed
scope and does not search merely for support. Statistical and methodological claims
must be based on directly inspected primary sources, standards, or authoritative
guidance appropriate to the claim.

Secondary sources may help find primary material but may not silently replace it.
Model memory, software defaults, and agreement among libraries are not evidence.

## Fixed repository inputs

Read these public repository inputs before source work:

1. `CHARTER.md`;
2. `AUTHORITY.md`;
3. `governance/RFC.md`;
4. `governance/drafts/release-horizon-r3-r20.md`;
5. `governance/drafts/release-3-preparation/README.md`;
6. `governance/drafts/capability-evolution-roadmap.md`;
7. the current FND-1 README and its controlling multiplicity and estimand steward
   dispositions; and
8. the current FND-2 README and controlling disposition.

Record the exact commit, tree, and blob identity of every repository input used.
Private product repositories and their work-item systems are outside the evidence
base and must not be read or cited.

## Bounded question

Can Release 3 define one independently verifiable, one-way, independent multi-group
continuous-outcome omnibus Contract with an explicit one-member comparison family,
no automatic method switch, and fail-closed exclusions, without silently making an
unsupported statistical or data-design choice?

## Questions to answer

1. What exact population target and null hypothesis do the defensible one-way
   omnibus procedures test? Distinguish equality of means, distributional equality,
   and any weighted or approximate target.
2. Which assumptions differ among classical equal-variance analysis of variance,
   Welch-type heteroscedastic omnibus procedures, and other plausible candidates?
   Do not select a default merely because software exposes one.
3. What do the test statistic and numerator and denominator degrees of freedom mean,
   including cases in which a denominator degree of freedom is non-integer?
4. Which declarations are required to make independent groups, experimental units,
   group assignment, analysis population, outcome scale, and one-way design
   machine-checkable? Identify what cannot be inferred from values or row order.
5. Is a one-member family containing only the omnibus hypothesis a defensible and
   useful initial multiplicity boundary? State exactly what it does and does not
   guarantee.
6. What additional semantics would pairwise, many-to-one, planned-contrast,
   all-pairs, post-hoc, or simultaneous-interval support require? Confirm whether
   excluding all of them makes the initial slice materially safer and narrower.
7. What minimum result surface is scientifically coherent for the selected omnibus
   target? Separate necessary outputs from conventional but optional reporting.
8. Which missing values, non-finite values, empty or small groups, zero within-group
   variance, extreme imbalance, or other inputs make the procedure undefined,
   non-computable, or unsuitable for the initial supported claim?
9. Which conclusions from existing FND-1 and FND-2 records are reusable, which open
   holds are actually implicated, and which holds can remain outside scope?
10. Which findings can later be reused for factorial or interaction inference, and
    which are specific to a one-way design?

## Required counterexamples

Attempt to construct at least these attacks against the proposed meaning:

- identical input values routed to different valid procedures with different
  meanings;
- an omnibus rejection represented as evidence that every group differs;
- a non-rejection represented as evidence that group means are equal;
- a post-hoc or pairwise claim inferred from an omnibus result;
- independence inferred from row order or distinct labels;
- a variance assumption inferred from observed sample variances;
- missing rows silently removed;
- a factorial, blocked, clustered, or repeated design flattened into one-way groups;
- the same hypothesis placed in materially different comparison families; and
- a project convention described as external consensus.

For each attack, state whether the proposed narrow scope rejects it, needs an added
declaration, or cannot yet defend against it.

## Required report

Write an English report that clearly separates:

1. input and source identity;
2. source-established facts;
3. investigator inference;
4. material disagreement or uncertainty;
5. candidate Protocol decisions, clearly labeled as project choices;
6. the minimum defensible scope and explicit exclusions;
7. required declarations, result fields, and refusal classes;
8. reusable findings and reopen conditions;
9. unresolved holds; and
10. one disposition: `SCOPE_READY`, `NARROW`, `DEFER`, or `NO_GO`.

`SCOPE_READY` means only that a bounded public RFC question can be drafted. It does
not approve numerical implementation, issue Protocol meaning, or authorize Release 3.

Record short quotations sparingly and respect source licensing and quotation limits.
Include a claim-to-source table with direct page, section, theorem, or equation
pinpoints for every decision-bearing claim.

## Stop conditions

Return `INPUT_INCOMPLETE` without a semantic disposition if a fixed repository input
cannot be identified, required primary texts cannot be inspected, or source identity
is ambiguous. Return `DEFER` or `NO_GO` rather than filling a material gap with a
software convention.

Do not edit authoritative Protocol artifacts, candidate schemas, registries,
reference code, or Release 2 material as part of this commission.
