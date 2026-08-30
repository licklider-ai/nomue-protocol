# FND-1 Genspark primary-source research prompt

## Commission

Act as an independent primary-source investigator and adversarial reviewer for
FND-1. Your job is to test and narrow claims about estimand identity, inference
routing, analysis families, and multiplicity. Do not search for support merely
to justify a nomue hypothesis.

This is the external-source pass. You do not operate the nomue-protocol
repository and must not claim to have committed or pushed a file. Return one
complete English Markdown report as your entire answer. The commissioning
steward will place that report into the repository without changing its
substantive content.

## Fixed inputs

Use exactly the following public repository inputs at commission base
`dd823569ebad526cafe98f36cba1d67b3b2bcf41`:

1. FND-1 scientific instructions:
   <https://raw.githubusercontent.com/licklider-ai/nomue-protocol/dd823569ebad526cafe98f36cba1d67b3b2bcf41/evidence/research/foundation-identity/fnd-1/README.md>
2. Counterexample corpus Version 1:
   <https://raw.githubusercontent.com/licklider-ai/nomue-protocol/dd823569ebad526cafe98f36cba1d67b3b2bcf41/evidence/research/foundation-identity/2026-08-30-counterexample-corpus-v1.md>
3. Common response template Version 1:
   <https://raw.githubusercontent.com/licklider-ai/nomue-protocol/dd823569ebad526cafe98f36cba1d67b3b2bcf41/evidence/research/foundation-identity/2026-08-30-common-response-template-v1.md>

Record this exact base SHA in the report. If any of the three inputs is missing,
unreadable, or resolves to a different version, output only sections 0 and 1,
mark `INPUT_INCOMPLETE`, and stop. Do not reconstruct missing input.

This pass prompt supersedes the repository-operation steps and exact final-line
choices in the fixed FND-1 instructions. The scientific scope, exclusions,
hypotheses, questions, counterexample duties, and minimum primary-source basis
in those instructions remain binding.

## Independence boundary

- Work in a fresh context created for this commission.
- Do not read any FND-1 result, Claude Code pass result, or FND-2 result.
- Do not read prior nomue research packages, adversarial reviews, adjudication
  memoranda, closure records, unpublished conclusions, or `review/*` branches.
- Do not inspect Release 2, paired-t, or t-family candidate material.
- Do not use another model's answer, search snippet, blog, vendor page, or
  product description as evidence.
- Disclose any unavoidable prior exposure and identify exactly how it was
  prevented from affecting the evidence or conclusions.

## Required primary-source investigation

Use full formal or original texts. Inspect at least:

- ICH E9(R1);
- the final FDA guidance on multiple endpoints in clinical trials;
- Holm (1979);
- Benjamini and Hochberg (1995);
- Dunnett (1955);
- Tukey (1949);
- the ASA Statement on p-values;
- primary sources on sensitivity analysis and estimand alignment;
- primary sources on outcome-dependent or diagnostic-dependent method
  selection; and
- at least two formal or primary sources applicable outside clinical trials or
  specifically relevant to general scientific or non-clinical research.

For every decision-bearing source, record the complete citation, DOI or stable
direct URL, version or date, and page, section, theorem, table, or equivalent
pinpoint. Open and inspect the full text. Search results and abstracts may help
discovery but do not verify a claim.

If an external source cannot be inspected, continue a source-bounded pass and
mark the affected claims `NOT_VERIFIABLE`. Do not stop merely because a source
host is inaccessible. `ADVANCE` is unavailable unless the complete minimum
primary-source basis above has been inspected. Keep verbatim quotation from any
single source below 25 words in the whole report.

## Questions and falsification duties

Answer every question and attack every candidate hypothesis in the fixed FND-1
instructions. In particular:

1. separate scientific estimand, statistical inference target, estimator, test
   null, uncertainty target, decision role, and multiplicity guarantee;
2. test which proposed identity attributes are always required, conditional, or
   unnecessary;
3. distinguish primary/sensitivity analyses for one estimand from analyses that
   change the estimand;
4. examine unit conversion, transformation, and reparameterization identity;
5. test internal agreement among effect estimate, interval, test null,
   direction, margin, analysis set, and multiplicity family;
6. compare omnibus, all-pairs, many-to-one, planned-contrast, and gatekeeping
   questions without selecting a default procedure;
7. analyze FWER and FDR as meaning or guarantee boundaries rather than treating
   them as interchangeable labels;
8. attack the provisional four-relation vocabulary and propose `unresolved`
   whenever it is insufficient;
9. classify all `FND1-01` through `FND1-12` cases without using result-value
   agreement; and
10. add the two required investigator-created sensitivity-analysis cases.

Preserve disagreement among sources. Do not resolve it by majority vote. A
useful result may be `NARROW`, `DEFER`, or `NO_GO`.

## Aligned report contract

Return one Markdown document with exactly these top-level sections, in this
order:

1. `## 0. Pass metadata`
2. `## 1. Input, access, and independence checks`
3. `## 2. Executive verdict`
4. `## 3. Research method and access record`
5. `## 4. Source and repository register`
6. `## 5. Atomic claim-evidence ledger`
7. `## 6. Counterexample classifications`
8. `## 7. Candidate attributes and consistency rules`
9. `## 8. Multiplicity and ICH boundary analysis`
10. `## 9. Falsification attempts and material disagreements`
11. `## 10. Holds and cross-pass handoff`
12. `## 11. Public-artifact and sanitization self-check`

Use these exact columns where applicable:

### Source and repository register

| Source ID | Citation or path | Type | Version or date | Access | Pinpoint | Claim use |
| --------- | ---------------- | ---- | --------------- | ------ | -------- | --------- |

### Atomic claim-evidence ledger

| Claim ID | Atomic claim | Status | Evidence IDs | Exact scope | Confidence |
| -------- | ------------ | ------ | ------------ | ----------- | ---------- |

Allowed claim statuses are `VERIFIED_DIRECT`, `CROSS_SOURCE_INFERENCE`,
`POSSIBLE_PROJECT_CONVENTION`, and `NOT_VERIFIABLE`.

### Counterexample classifications

| Case ID | Proposed relation | Decisive attributes | Evidence or claim IDs | Missing declarations | Confidence |
| ------- | ----------------- | ------------------- | --------------------- | -------------------- | ---------- |

Process all 12 assigned cases and the two investigator-created cases. Never
infer an absent declaration and never justify identity from numerical
proximity.

Section 7 must contain both an identity-attribute matrix and proposed
value-independent internal-consistency rules. Section 8 must contain both a
multiplicity-family catalogue and a table separating clinical-trial-specific
ICH language from possibly reusable abstract structure. Section 10 must list
every unresolved hold, the evidence needed to close it, and the Protocol work
that remains blocked.

Choose one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`. Also state
whether the pass is `READY` or `NOT_READY` for cross-pass reconciliation. This
is readiness for comparison with the independent repository pass, not Protocol
adoption and not closure of the FND-1 Research Gate.

The final line must be exactly one of:

`GENSPARK FND-1 PRIMARY-SOURCE PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`GENSPARK FND-1 PRIMARY-SOURCE PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`GENSPARK FND-1 PRIMARY-SOURCE PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`GENSPARK FND-1 PRIMARY-SOURCE PASS COMPLETE - NO_GO - NOT PROTOCOL ADOPTION`

## Explicit non-decisions

Do not select a Protocol field, schema, identifier, refusal code, supported
method, method default, public check, API, implementation, release change, or
Release 2 decision. Do not recommend automatic combination merely because two
results are classified as aligned.
