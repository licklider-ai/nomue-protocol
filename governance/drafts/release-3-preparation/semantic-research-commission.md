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

Can Release 3 define a comprehensive, independently verifiable family of one-way,
independent multi-group continuous-outcome Contracts covering omnibus inference,
contrasts, post-hoc comparisons, simultaneous intervals, and multiplicity control,
with explicit member sets, no automatic method switch, and fail-closed exclusions,
without silently making an unsupported statistical or data-design choice?

"Comprehensive" is an inventory and disposition requirement, not a claim that every
historical method is suitable for Protocol support. The report must define a
reproducible source-search and inclusion rule, catalogue every in-scope technique it
finds, and assign each technique one explicit disposition: Release 3 implementation
candidate, research-only evidence, transfer to a named later release, or reject with
rationale.

## Inventory completeness rule

The inventory boundary is every statistical procedure or procedure family that is
presented in inspectable primary literature or authoritative guidance as controlling
or characterizing multiple claims arising from independent one-way continuous-group
inference, including generic p-value procedures applicable to those claims.

The investigator must:

1. record the search date, scholarly indexes or authoritative collections, exact
   queries, language limits, access failures, and inclusion and exclusion rules;
2. search from the named seed procedures below and perform backward and forward
   citation chaining sufficient to identify distinct predecessor, successor, and
   competing procedure classes;
3. treat two variants as distinct when their member set, assumptions, error
   criterion, guarantee strength, ordering, output, or numerical construction
   differs materially;
4. use catalogues and software documentation only for discovery, then ground every
   decision-bearing claim in an inspected primary source or authoritative guidance;
5. record every excluded item and its reason rather than dropping it from the audit
   trail; and
6. freeze the resulting catalogue by content hash for independent completeness and
   classification review before it is used to open public discussion.

The resulting completeness claim is bounded to this documented method and date. It
is not a claim to know every procedure ever published. A later-discovered material
procedure triggers the recorded reopen rule rather than being silently ignored.

## Questions to answer

1. What exact population targets and null hypotheses do defensible one-way omnibus,
   pairwise, many-to-one, all-pairs, planned-contrast, and post-hoc procedures test?
   Distinguish equality of means, distributional equality, weighted or approximate
   targets, and claims about individual contrasts.
2. Which assumptions differ among classical equal-variance analysis of variance,
   Welch-type heteroscedastic omnibus procedures, and other plausible candidates?
   Which follow-up procedures are valid under each assumption set? Do not select a
   default merely because software exposes one.
3. For each candidate, what do the statistic, reference distribution, numerator and
   denominator degrees of freedom, critical value, adjusted p-value, and interval
   coverage mean? Include non-integer degrees of freedom where applicable.
4. Which declarations are required to make independent groups, experimental units,
   group assignment, analysis population, outcome scale, one-way design, comparison
   family, contrast coefficients, control group, and selection timing
   machine-checkable? Identify what cannot be inferred from values or row order.
5. Define and compare the protected member sets for a single omnibus claim,
   all-pairs, many-to-one, arbitrary or planned contrasts, hierarchical or
   gatekeeping families, and data-dependent post-hoc families. State when the member
   set must be fixed before observing results.
6. Catalogue the relevant error criteria and guarantee strengths, including at least
   per-comparison error, weak and strong FWER, FDR, and simultaneous coverage. State
   which criteria are coherent for each member set and result surface.
7. Catalogue applicable procedure classes and named candidates. The initial search
   seed must include Bonferroni and Sidak single-step procedures; Holm, Holm-Sidak,
   Hochberg, and Hommel stepwise procedures; closed testing and gatekeeping; Tukey,
   Tukey-Kramer, Dunnett, Scheffe, and Games-Howell families; Benjamini-Hochberg and
   Benjamini-Yekutieli FDR procedures; and resampling-based multiplicity procedures.
   The seed is not the final inventory and must not be treated as evidence that two
   similarly named variants are identical.
8. For each candidate procedure, is the output a rejection set, adjusted p-values,
   simultaneous confidence intervals, or some combination? Which outputs are
   coherent, consonant, directionally interpretable, and independently recomputable?
9. When is an omnibus gate required, optional, or invalid before follow-up testing?
   Distinguish protected hierarchical procedures from the common but unsupported
   convention that post-hoc work is automatically authorized by omnibus rejection.
10. Which missing values, non-finite values, empty or small groups, zero within-group
    variance, extreme imbalance, or other inputs make each procedure undefined,
    non-computable, or unsuitable for a supported claim?
11. Which conclusions from existing FND-1 and FND-2 records are reusable, which open
    holds are actually implicated, and which holds can remain outside scope?
12. Which findings can later be reused for factorial or interaction inference,
    multiple-endpoint procedures, or other releases, and which are specific to a
    one-way design?

## Required counterexamples

Attempt to construct at least these attacks against the proposed meaning:

- identical input values routed to different valid procedures with different
  meanings;
- an omnibus rejection represented as evidence that every group differs;
- a non-rejection represented as evidence that group means are equal;
- a post-hoc or pairwise claim inferred from an omnibus result;
- a pairwise procedure applied under a variance model it does not support;
- a family changed after inspecting unadjusted p-values or group means;
- a procedure controlling weak FWER represented as controlling strong FWER;
- an FDR guarantee represented as an FWER guarantee, or conversely;
- adjusted p-values from one family combined with intervals from another procedure;
- ordered stepwise decisions recomputed after losing ties or original member order;
- a many-to-one critical value reused for an all-pairs family;
- a balanced-design procedure silently extended to unequal group sizes;
- a stochastic resampling result without fixed randomness and replay semantics;
- independence inferred from row order or distinct labels;
- a variance assumption inferred from observed sample variances;
- missing rows silently removed;
- a factorial, blocked, clustered, or repeated design flattened into one-way groups;
- the same hypothesis placed in materially different comparison families; and
- a project convention described as external consensus.

For each attack, state which Contract or Public Check boundary rejects it, which
declaration or evidence is needed, or why the candidate must be deferred.

## Required report

Write an English report that clearly separates:

1. input and source identity;
2. source-established facts;
3. investigator inference;
4. material disagreement or uncertainty;
5. candidate Protocol decisions, clearly labeled as project choices;
6. the documented search and inclusion method plus a catalogue of all in-scope
   techniques found;
7. a matrix crossing member set, error criterion, procedure, assumptions, outputs,
   numerical dependencies, and explicit disposition;
8. the proposed dependency order for separately closable Release 3 Contracts and
   Public Checks;
9. required declarations, result fields, and refusal classes;
10. reusable findings and reopen conditions;
11. unresolved holds; and
12. one disposition: `PROGRAM_SCOPE_READY`, `NARROW`, `DEFER`, or `NO_GO`.

`PROGRAM_SCOPE_READY` means only that a bounded comprehensive public RFC question
and a complete disposition ledger can be drafted. It does not approve a procedure,
numerical implementation, issued Protocol meaning, or Release 3.

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
