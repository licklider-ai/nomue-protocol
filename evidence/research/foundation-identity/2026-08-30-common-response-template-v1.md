# Common Response Template for FND Independent Research

- **Version:** 1.0
- **Completion date:** 2026-08-30
- **Applies to:** FND-1 or FND-2 independent primary-source research
- **Status:** informative response structure; non-normative

## Use rules

- Preserve the headings and their order.
- Produce one English Markdown document. Preserve official source titles,
  classes, slots, and terms in their original spelling.
- Enter `NOT_APPLICABLE` in package-specific fields that do not apply.
- Keep source-established facts, investigator inference, and a possible future
  nomue convention separate.
- If a source cannot be inspected, use `NOT_VERIFIABLE` rather than inference
  from an abstract, snippet, or secondary account.
- The proposed four-relation taxonomy and candidate vocabulary are hypotheses;
  they may be refuted or replaced.
- The final disposition concerns readiness for Research Gate adjudication, not
  Protocol adoption or implementation permission.

## 0. Research metadata

| Item                                                           | Response                                                        |
| -------------------------------------------------------------- | --------------------------------------------------------------- |
| Package                                                        | `FND-1` or `FND-2`                                              |
| Investigator or model                                          |                                                                 |
| Investigation date                                             |                                                                 |
| Knowledge or source cutoff                                     |                                                                 |
| Instruction path and commit                                    |                                                                 |
| Corpus path and version                                        |                                                                 |
| Web and repository access                                      | `AVAILABLE / PARTIAL / UNAVAILABLE`                             |
| Other FND result viewed                                        | Normally `NO`; disclose scope and timing if exposed             |
| Earlier nomue conclusions, v2, or adjudication material viewed | Normally `NO`; disclose scope and use if automatically supplied |

## 1. Identity and input checks

### 1.1 Input completeness

- Decision: `INPUT_COMPLETE / INPUT_INCOMPLETE`
- Repository commit investigated:
- Files received and read:
- Missing or unreadable files:
- Assigned case IDs:
- Can all explicit exclusions be honored:

If the decision is `INPUT_INCOMPLETE`, list the missing material and stop. Do
not reconstruct the corpus or response format from memory.

### 1.2 Independence

- No other model's answer used as evidence:
- No nomue candidate conclusion assumed:
- No search snippet, blog, or generated answer used as a primary basis:
- Any unavoidable exposure and mitigation:

## 2. Executive verdict

### 2.1 Research disposition

Choose one: `ADVANCE / NARROW / DEFER / NO_GO`.

**Selection:**

**One-paragraph rationale:**

**Protocol adoption:** `NO`

### 2.2 Conclusion summary

| Item                         | Conclusion | Confidence            | Principal evidence |
| ---------------------------- | ---------- | --------------------- | ------------------ |
| Core hypotheses              |            | `HIGH / MEDIUM / LOW` |                    |
| Candidate taxonomy           |            |                       |                    |
| Minimum candidate attributes |            |                       |                    |
| Strongest counterexample     |            |                       |                    |
| Largest unresolved issue     |            |                       |                    |

## 3. Research method

### 3.1 Search and selection method

- Databases and repositories:
- Search strings:
- Date range:
- Inclusion criteria:
- Exclusion criteria:
- Version or tag fixation method:
- Failed or inaccessible searches:

### 3.2 Evidence hierarchy

Classify every source as one of:

1. `PRIMARY_NORMATIVE`: regulatory or standards text, official specification,
   or version-fixed official model;
2. `PRIMARY_RESEARCH`: original method paper, original simulation, or original
   empirical investigation;
3. `OFFICIAL_DOCUMENTATION`: upstream or institutional documentation that is
   not treated as normative text or an original method paper;
4. `SECONDARY`: review, commentary, or textbook used only for discovery or
   context.

## 4. Source register

| Source ID | Full citation or title | Type | Version, tag, or date | Direct URL or DOI | Access                                | Pinpoint used |
| --------- | ---------------------- | ---- | --------------------- | ----------------- | ------------------------------------- | ------------- |
| `SRC-01`  |                        |      |                       |                   | `VERIFIED / PARTIAL / NOT_VERIFIABLE` |               |

## 5. Claim-evidence ledger

Split compound propositions so that each row contains one testable claim. Any
short quotation includes a page, section, theorem, class, slot, or line
pinpoint, and total verbatim quotation from one source remains below 25 words.

| Claim ID | Claim | Claim class                                             | Source ID and pinpoint | Evidence result                                       | Domain limit | Investigator inference |
| -------- | ----- | ------------------------------------------------------- | ---------------------- | ----------------------------------------------------- | ------------ | ---------------------- |
| `CLM-01` |       | `DIRECT_FACT / INFERENCE / POSSIBLE_PROJECT_CONVENTION` |                        | `SUPPORTED / PARTIAL / CONTRADICTED / NOT_VERIFIABLE` |              |                        |

## 6. Counterexample case classification

Include every assigned case in ID order. The provisional labels aid comparison;
use `unresolved` and propose a better taxonomy when they do not fit.

| Case ID | Provisional relation                                                                            | Decisive attributes | Reasoning independent of result values | Evidence IDs | Confidence            | Missing declaration or ambiguity |
| ------- | ----------------------------------------------------------------------------------------------- | ------------------- | -------------------------------------- | ------------ | --------------------- | -------------------------------- |
|         | `aligned / parallel_not_combinable / not_comparable / inadmissible_or_unsupported / unresolved` |                     |                                        |              | `HIGH / MEDIUM / LOW` |                                  |

## 7. Package-specific required analysis

### 7.1 Candidate attribute or vocabulary matrix

| Candidate | Proposed role | Evidence status                                       | Always required or conditional | Normalization or equivalence rule | Counterexample | Recommendation                                      |
| --------- | ------------- | ----------------------------------------------------- | ------------------------------ | --------------------------------- | -------------- | --------------------------------------------------- |
|           |               | `SUPPORTED / PARTIAL / CONTRADICTED / NOT_VERIFIABLE` |                                |                                   |                | `KEEP / SPLIT / MERGE / NARROW / DROP / UNRESOLVED` |

### 7.2 Standard or framework capability matrix

| Standard or framework | Exact version | Relevant class or concept | Direct representation | Composition or external profile needed | Not found | Evidence IDs |
| --------------------- | ------------- | ------------------------- | --------------------- | -------------------------------------- | --------- | ------------ |
|                       |               |                           |                       |                                        |           |              |

### 7.3 Internal-consistency rules

| Rule candidate | Inputs needed | Deterministic check possible | Failure class | Evidence or inference | Unresolved issue |
| -------------- | ------------- | ---------------------------- | ------------- | --------------------- | ---------------- |
|                |               | `YES / PARTIAL / NO`         |               |                       |                  |

### 7.4 Package-specific worked examples

Provide every worked example required by the assigned entry point. For each
example, state the declarations, relation or identity conclusion, source basis,
and remaining uncertainty.

## 8. Adversarial findings

### 8.1 Falsification attempts

| Target hypothesis | Strongest attempted counterexample | Result                                         | Consequence |
| ----------------- | ---------------------------------- | ---------------------------------------------- | ----------- |
|                   |                                    | `SURVIVED / NARROWED / FALSIFIED / UNRESOLVED` |             |

### 8.2 Material disagreements

| Issue | Source or school A | Source or school B | Why it matters | Proposed hold |
| ----- | ------------------ | ------------------ | -------------- | ------------- |
|       |                    |                    |                |               |

### 8.3 Negative and absence claims

Complete this table whenever asserting that a standard lacks a class, slot,
attribute, concept, or constraint.

| Claim | Inspected version or tag | Inspected scope                                              | Search method | Result | Residual uncertainty |
| ----- | ------------------------ | ------------------------------------------------------------ | ------------- | ------ | -------------------- |
|       |                          | Classes, slots, schemas, prose, or another explicit boundary |               |        |                      |

## 9. Required narrowing and unresolved holds

### 9.1 Candidate-hypothesis revision

| Original hypothesis | Keep, change, or reject | Corrected narrow form | Reason and evidence IDs |
| ------------------- | ----------------------- | --------------------- | ----------------------- |
|                     |                         |                       |                         |

### 9.2 Holds

| Hold ID   | Unresolved question | Why evidence is insufficient | Next evidence needed | Downstream work blocked |
| --------- | ------------------- | ---------------------------- | -------------------- | ----------------------- |
| `HOLD-01` |                     |                              |                      |                         |

## 10. Research Gate handoff

### 10.1 Deliverables achieved

- 12/12 assigned cases classified:
- Primary-source register:
- Claim-evidence ledger:
- Investigator-added counterexamples:
- Material disagreements:
- Version-fixed standard inspection:
- Package-specific deliverables:

### 10.2 Recommended next action

- Next research:
- Work that remains unauthorized:
- Scope needing another independent review:

### 10.3 Final statement

End with exactly one applicable line:

`READY FOR FND-1 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

`NOT READY FOR FND-1 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

`READY FOR FND-2 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

`NOT READY FOR FND-2 RESEARCH GATE ADJUDICATION - NOT PROTOCOL ADOPTION`

## 11. Public-artifact and sanitization self-check

- [ ] Every assigned case was processed.
- [ ] Direct fact, inference, and possible project convention are separated.
- [ ] Decision-bearing claims rest primarily on primary sources.
- [ ] Source version, tag, or date is recorded.
- [ ] Inaccessible source content is marked `NOT_VERIFIABLE`.
- [ ] Semantic identity is not inferred from numerical proximity.
- [ ] Every absence claim states its inspected scope.
- [ ] Release 2, paired-t work, and t-family numerical contracts remain excluded.
- [ ] No Protocol adoption, schema, identifier, transport, or implementation
      default is selected.
- [ ] No confidential strategy, personal data, credential, internal URL,
      non-public third-party material, or active-negotiation detail is present.
- [ ] Quotations are short, attributed, and redistributable.
