# FND-1 Multiplicity Primary-Text Closure Commission

**Status: informative research commission; non-normative; not adopted.** This
commission addresses only `FND1-H01`, `FND1-H02`, and `FND1-H03` from the
reconciled FND-1 result. It does not reopen the other FND-1 findings and does
not authorize Protocol design or implementation.

## Assignment

Act as an independent primary-text investigator. Inspect the complete original
texts of the four papers below and determine which held claims can be closed,
narrowed, or must remain `NOT_VERIFIABLE`.

1. Holm, S. (1979), “A Simple Sequentially Rejective Multiple Test Procedure,”
   _Scandinavian Journal of Statistics_ 6(2), 65–70, JSTOR 4615733.
2. Benjamini, Y. and Hochberg, Y. (1995), “Controlling the False Discovery
   Rate: A Practical and Powerful Approach to Multiple Testing,” _Journal of
   the Royal Statistical Society: Series B_ 57(1), 289–300,
   DOI `10.1111/j.2517-6161.1995.tb02031.x`.
3. Dunnett, C. W. (1955), “A Multiple Comparison Procedure for Comparing
   Several Treatments with a Control,” _Journal of the American Statistical
   Association_ 50(272), 1096–1121,
   DOI `10.1080/01621459.1955.10501294`.
4. Tukey, J. W. (1949), “Comparing Individual Means in the Analysis of
   Variance,” _Biometrics_ 5(2), 99–114, DOI `10.2307/3001913`.

Use the exact repository commit containing this commission and record its full
SHA. Read the reconciled FND-1 result only to identify the holds and claim
boundaries. Do not treat any earlier investigator report as evidence.

## Source-access rule

- Open and inspect the complete original paper, not an abstract, snippet,
  review, textbook, later implementation, or regulatory summary.
- Record the stable URL or DOI, the host used, access date, and exact page,
  theorem, equation, table, or paragraph for every claim.
- If the original text cannot be inspected, mark the affected claim
  `NOT_VERIFIABLE` and preserve the hold.
- A later correction, extension, or generalization is a separate source. Do not
  attribute its result retroactively to the original paper.
- Keep quotation from each paper below 25 words in the whole report.

## Questions to close

### Holm (1979)

1. What procedure is defined, including ordering, critical values, stopping,
   and rejection rules?
2. Does the paper establish weak or strong family-wise error control?
3. Which assumptions, if any, are imposed on dependence among test statistics
   or p-values?
4. Which exact theorem, proof, or statement supports each answer?

### Benjamini and Hochberg (1995)

1. How are `V`, `R`, `Q`, and false discovery rate defined, including the
   `R = 0` case?
2. What step-up procedure is defined?
3. What does the original theorem establish, under which independence or other
   assumptions?
4. Which claims often associated with the procedure come only from later work?

### Dunnett (1955)

1. What comparison family is protected?
2. What simultaneous error or confidence guarantee is established?
3. Which distributional, variance, sample-size, balance, and sidedness
   assumptions are required?
4. Which exact distribution or critical-value construction is used?

### Tukey (1949)

1. What comparison family is addressed?
2. What simultaneous confidence or error guarantee is established?
3. Which distributional, variance, sample-size, balance, and sidedness
   assumptions are required?
4. Which claims apply to the original method and which belong to later
   Tukey-Kramer or other variants?

### Cross-source boundary

State only the narrow conclusions needed for the existing FND-1 holds:

- whether many-to-one, all-pairs, and sequential procedures define different
  protected objects or guarantee boundaries;
- whether FWER and FDR remain different quantities for the same hypothesis set;
- which original-paper conditions must be part of any future procedure identity;
  and
- which claims from the prior reconciliation must remain held.

Do not select a method, default, identifier, field, schema, refusal code,
public check, API, implementation, or release change.

## Required report

Return one English Markdown document with these sections:

1. `## 0. Investigation metadata`
2. `## 1. Input and access checks`
3. `## 2. Executive disposition`
4. `## 3. Original-text source register`
5. `## 4. Atomic claim ledger`
6. `## 5. Paper-by-paper findings`
7. `## 6. Cross-source boundary findings`
8. `## 7. Hold closure matrix`
9. `## 8. Falsification and overclaim checks`
10. `## 9. Remaining holds and next evidence`
11. `## 10. Public-artifact self-check`

Use only these atomic-claim statuses:

- `VERIFIED_DIRECT`
- `CROSS_SOURCE_INFERENCE`
- `NOT_VERIFIABLE`
- `CONTRADICTED`

For `FND1-H01`, `FND1-H02`, and `FND1-H03`, select exactly one disposition:

- `CLOSE`
- `NARROW_AND_CLOSE`
- `KEEP_OPEN`

The report is ready for repository close review only if all four original texts
were inspected and every decision-bearing claim has a pinpoint.

End with exactly one line:

`READY FOR FND-1 MULTIPLICITY CLOSURE REVIEW - NOT PROTOCOL ADOPTION`

or

`NOT READY FOR FND-1 MULTIPLICITY CLOSURE REVIEW - NOT PROTOCOL ADOPTION`

## Public attribution

Use role-based attribution such as “independent primary-text investigator.” Do
not record or imply the software, service, provider, or mechanism used to draft
or review the report. Do not claim human authorship unless that is factually
true. Preserve research provenance through source pinpoints, access dates, the
commission commit, and content hashes.
