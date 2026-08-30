# FND-1 Claude Code repository-analysis prompt

## Commission

Act as an independent repository investigator and adversarial reviewer for
FND-1. Your job is to test the FND-1 hypotheses and counterexamples against the
public nomue-protocol repository, its authority boundaries, and its current
representational surfaces. Do not search for support merely to justify a nomue
proposal.

This is the repository-analysis pass. It is not the sole primary-source pass and
must not claim that it has completed the external literature basis assigned to
Genspark. External web access may be partial; repository and logical findings
remain useful when their scope is stated exactly.

## Repository operation

1. Start from the exact commit containing this prompt and record its full SHA.
2. Create a reviewer-owned branch from that commit. Do not work on `main`
   directly.
3. Read repository `AGENTS.md` and the governance files it requires.
4. Read exactly these commission inputs before broader repository inspection:
   - this prompt;
   - [`README.md`](README.md), including the preserved FND-1 scientific question
     set;
   - [`../2026-08-30-counterexample-corpus-v1.md`](../2026-08-30-counterexample-corpus-v1.md);
   - [`../2026-08-30-common-response-template-v1.md`](../2026-08-30-common-response-template-v1.md).
5. If any commission input is missing, unreadable, or version-ambiguous, replace
   only
   [`2026-08-30-claude-code-repository-analysis-result.md`](2026-08-30-claude-code-repository-analysis-result.md)
   with sections 0 and 1, mark `INPUT_INCOMPLETE`, and stop.
6. Otherwise perform the full pass and replace only that assigned result file.
7. Format and check the completed result with:

   ```bash
   pnpm exec prettier --write evidence/research/foundation-identity/fnd-1/2026-08-30-claude-code-repository-analysis-result.md
   pnpm exec markdownlint-cli2 evidence/research/foundation-identity/fnd-1/2026-08-30-claude-code-repository-analysis-result.md
   pnpm validate
   ```

8. Commit the single result-file change, push the reviewer-owned branch, and
   report the branch name, full commit SHA, changed-file list, and validation
   results. Do not open or merge a Protocol-adoption change.

This pass prompt supersedes the preserved single-pass repository procedure and
exact final-line choices in `README.md`. The scientific scope, exclusions,
hypotheses, questions, and counterexample duties in that file remain binding.

## Independence boundary

- Use a fresh context created for this commission.
- Do not read the Genspark result, the final FND-1 result, or the FND-2 result.
- Do not search for or read earlier FND-1/FND-2 result branches, prior nomue
  research packages, adversarial reviews, adjudication memoranda, closure
  records, or unpublished conclusions.
- Do not inspect or use Release 2 candidate artifacts as evidence. Exclude
  `governance/drafts/release-2-*`, paired-t material, and t-family numerical
  contracts from the inspection.
- Another model's answer, search snippet, blog, and product description are not
  evidence.
- Disclose any unavoidable exposure, including automatically supplied context,
  and do not use excluded material in the findings.

## Required repository investigation

Inspect only what is needed to answer the FND-1 questions, including applicable
parts of:

- `CHARTER.md`, `AUTHORITY.md`, and `authority/authority-manifest.yaml`;
- `governance/RFC.md` and `governance/ID-POLICY.md`;
- current non-Release-2 specifications, schemas, registries, conformance
  artifacts, mappings, and evidence classifications;
- requirement and vocabulary definitions that could collide with candidate
  estimand, analysis-set, hypothesis-family, multiplicity, routing, or refusal
  concepts; and
- public upstream model repositories or formal machine-readable standards that
  are accessible and directly relevant.

Use `rg` or equivalent mechanical searches and record exact paths, anchors,
class names, slot names, registry entries, and inspected versions. Scope every
absence claim to the exact files and versions searched. Do not infer a general
standard absence from one model file.

Perform all of the following:

1. classify `FND1-01` through `FND1-12` and add the two required
   sensitivity-analysis cases using value-independent reasoning;
2. attack the four-relation vocabulary and identify cases that require
   `unresolved`, multiple axes, or a different relation;
3. test the proposed identity attributes for necessity, overlap, and bearer
   confusion;
4. propose formal internal-consistency checks only where the required inputs are
   explicit and result values are not used for routing;
5. inventory current repository surfaces that already express, partially
   express, or explicitly exclude the candidate concepts;
6. identify authority, identifier, schema, conformance, and public-contract
   consequences that a later adoption would have, without editing those
   surfaces;
7. inspect whether current terms could be silently overloaded by the FND-1
   concepts;
8. separate repo-observed facts, logical derivation, external-source facts,
   possible future project convention, and not-verifiable claims; and
9. preserve missing declarations and contradictions rather than filling them
   from nearby fields or implementation behavior.

Failure to access an external publisher is not a stop condition for this pass.
Record the source as `NOT_VERIFIABLE` and continue the repository analysis. Do
not promote model memory, an abstract, or secondary documentation into an
external primary-source fact.

## Aligned report contract

Write one English Markdown document with exactly these top-level sections, in
this order:

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

Allowed claim statuses are `REPO_VERIFIED`, `LOGICAL_DERIVATION`,
`EXTERNAL_PRIMARY_VERIFIED`, `POSSIBLE_PROJECT_CONVENTION`, and
`NOT_VERIFIABLE`.

### Counterexample classifications

| Case ID | Proposed relation | Decisive attributes | Evidence or claim IDs | Missing declarations | Confidence |
| ------- | ----------------- | ------------------- | --------------------- | -------------------- | ---------- |

Process all 12 assigned cases and the two investigator-created cases. Never
infer an absent declaration and never justify identity from numerical
proximity.

Section 7 must include an identity-attribute matrix, proposed value-independent
internal-consistency rules, and a repository implication-surface inventory.
Section 8 must include a multiplicity-family catalogue limited to what the pass
can establish and a table separating clinical-trial-specific ICH language from
possibly reusable abstract structure. Mark external semantics
`NOT_VERIFIABLE` when the formal text was not inspected. Section 10 must list
every unresolved hold, the evidence needed to close it, and the repository work
that remains unauthorized.

Choose one disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`. Also state
whether the pass is `READY` or `NOT_READY` for cross-pass reconciliation. This
is readiness for comparison with the independent primary-source pass, not
Protocol adoption and not closure of the FND-1 Research Gate.

The final line must be exactly one of:

`CLAUDE CODE FND-1 REPOSITORY PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`CLAUDE CODE FND-1 REPOSITORY PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`CLAUDE CODE FND-1 REPOSITORY PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`CLAUDE CODE FND-1 REPOSITORY PASS COMPLETE - NO_GO - NOT PROTOCOL ADOPTION`

## Explicit non-decisions

Do not edit or select a Protocol field, schema, identifier, vocabulary,
requirement, refusal code, supported method, method default, public check, API,
implementation, release change, or Release 2 decision. Do not treat a reference
implementation as authority and do not recommend automatic combination merely
because two results are classified as aligned.
