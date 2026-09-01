# FND-1 All-Pairs Successor Source-Supplied Completion Commission

**Status: informative primary-source completion commission; non-normative; not
adopted.** This commission reopens only the source claims left
`NOT_VERIFIABLE` by the initial all-pairs successor primary-source pass. It
selects no procedure, defines no method identifier, authorizes no
implementation, closes no Research Gate, and affects no release.

## 1. Bounded purpose

Inspect four supplied primary-source artifacts that were unavailable during the
initial pass. Determine which parts of the retained all-pairs and unequal-size
successor-source requirement can now be supported directly, which can be
supported only by a later primary source, and which still require Tukey's 1953
manuscript or its authenticated archival printing.

The investigation may narrow the unresolved source requirement. It must not
treat access to later papers as direct inspection of Tukey (1953), and it must
not delay all accessible work merely because that manuscript remains
unavailable.

## 2. Fixed inputs and independence boundary

Read only:

1. this commission;
2. the original
   [`all-pairs successor-source closure commission`](2026-08-31-all-pairs-successor-source-closure-commission.md);
3. the frozen initial
   [`primary-source result`](2026-08-31-all-pairs-successor-primary-source-result.md);
   and
4. the source artifacts listed in Section 3, supplied directly to the
   investigator.

Do not read the repository-analysis result, a future reconciliation or review,
unrelated research results, review branches, private repositories, or Release 2
material. The prior primary-source result is an access and question ledger, not
evidence for any source-content claim.

This is a completion of the same primary-source research role, not a new blind
independent pass. Disclose any additional exposure or artifact difference.

## 3. Supplied artifact register

The source files are inspection inputs, not repository contents. Recompute each
SHA-256 before reading. Inspect every page, including cover or rights pages,
and record a printed-page to PDF-page map in the result.

| Artifact ID | Source and supplied filename                                                                                                                                                                                                                                         | Expected SHA-256                                                   | PDF pages and expected printed-page map                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `AP-SRC-01` | Kramer (1956), "Extension of Multiple Range Tests to Group Means with Unequal Numbers of Replications"; `Extension of Multiple Range Tests to Group Means with Unequal Numbers of Replications_Kramer1956.pdf`                                                       | `6640f49f3e33db76b7ee3bfcea356b54cc2e39a87e6149f1c1c13b2005b9ff0c` | 5 PDF pages; PDF 1 is bibliographic front matter; printed 307-310 map to PDF 2-5 |
| `AP-SRC-02` | Hayter (1984), "A Proof of the Conjecture that the Tukey-Kramer Multiple Comparisons Procedure is Conservative"; `A Proof of the Conjecture that the Tukey-Kramer Multiple Comparisons Procedure is Conservative_Hayter1984.pdf`                                     | `755a1cd250fd50e13f444d00a630e356c0dd679daeaebc0554b62782e49d98b4` | 15 PDF pages; printed 61-75 map to PDF 1-15                                      |
| `AP-SRC-03` | Spjøtvoll and Stoline (1973), "An Extension of the T-Method of Multiple Comparison to Include the Cases with Unequal Sample Sizes"; `An Extension of the T-Method of Multiple Comparison to Include the Cases with Unequal Sample Sizes_Spjøtvoll & Stoline1973.pdf` | `66fb02dd75c038fccc7fc76238e4dddf64911cd3ccd2197dc7b9ff582fd81418` | 5 PDF pages; PDF 1 is publisher front matter; printed 975-978 map to PDF 2-5     |
| `AP-SRC-04` | Dunnett (1980), "Pairwise Multiple Comparisons in the Homogeneous Variance, Unequal Sample Size Case"; `Pairwise Multiple Comparisons in the Homogeneous Variance, Unequal Sample Size Case_Dunnett1980.pdf`                                                         | `8c5b9b7a13db3dcd9091fe31844a7b9eebeae56ee2dd9c866330f8fdb8f3dcb1` | 8 PDF pages; PDF 1 is publisher front matter; printed 789-795 map to PDF 2-8     |

If a hash differs, do not assume corruption or equivalence. Record
`ARTIFACT_VARIANT`, verify bibliographic identity from the file itself, derive a
new page map, and state whether the difference is only packaging or could
affect content. If any artifact cannot be read, continue all other work and mark
only the affected claims `NOT_VERIFIABLE`.

## 4. Known unavailable source

At commissioning time, no full text was available for John W. Tukey, "The
Problem of Multiple Comparisons" (1953 unpublished manuscript), including the
archival printing in _The Collected Works of John W. Tukey, Volume VIII:
Multiple Comparisons, 1948-1983_ (1994).

This known absence is not `INPUT_INCOMPLETE` for the present four-source pass.
Do not infer the manuscript's wording from a later citation. Instead:

1. distinguish claims directly established by an inspected later primary source
   from claims about what Tukey (1953) itself states;
2. determine whether an inspected later formal source supports a defensible
   narrower construction or guarantee without claiming original-source
   verification; and
3. retain an exact residual requirement for manuscript wording, printed-page
   identity, and archival-reprint fidelity if those facts remain material.

If an authenticated 1953 or 1994 artifact becomes available before the report
is finalized, record it as `AP-SRC-05`, hash it, derive its page map, and inspect
it under the same rules. Do not wait for it before completing Sections 5-12 for
the four supplied artifacts.

## 5. Required source-specific questions

### 5.1 Kramer (1956)

1. Which named multiple-range procedures does the paper say its unequal-
   replication construction applies to?
2. What effective sample-size or standard-error construction is proposed?
3. Is the construction presented as a test, confidence procedure, heuristic,
   conservative procedure, exact procedure, or another object?
4. Which distributional, variance, independence, and design assumptions are
   stated or inherited?
5. What is proved, what is illustrated numerically, and what is merely proposed?

### 5.2 Hayter (1984)

1. What balanced procedure and joint probability statement does the paper
   formalize, and how is the Studentized-range constant parameterized?
2. What unequal-size modification is studied?
3. What theorem is proved, under which model, and what exact or conservative
   coverage or error-control conclusion follows?
4. Which historical claims are the paper's report about earlier work rather
   than direct evidence from that earlier work?
5. Which extensions or unresolved problems remain outside the theorem?

### 5.3 Spjøtvoll and Stoline (1973)

1. What object is the extended T-method: tests, simultaneous intervals, or
   both?
2. What family, assumptions, balance condition, and guarantee are stated?
3. How does the construction differ from the Tukey-Kramer modification?
4. Which parts are mathematical results and which are tabulated computational
   instruments?

### 5.4 Dunnett (1980)

1. Which six procedures are compared, for what pairwise family and model?
2. Which conclusions are simulation observations rather than proofs?
3. What does the paper establish or not establish about Tukey-Kramer
   conservativeness, sample-size imbalance, and error rates?
4. Which later-proof question remains open within the 1980 paper itself?

## 6. Cross-source chronology and attribution tests

Build a source-by-source chronology that keeps separate:

- the unavailable 1953 manuscript;
- Kramer's 1956 multiple-range proposal;
- the 1973 extended T-method;
- Dunnett's 1980 simulation comparison;
- Hayter's 1984 proof; and
- the 1994 archival printing of the 1953 manuscript.

Attack at least these possible overclaims:

1. that Kramer (1956) proved general conservative simultaneous coverage;
2. that Dunnett's simulation supplied a proof;
3. that Hayter's theorem can be backdated to Kramer or Tukey;
4. that every unequal-size all-pairs procedure is the same procedure;
5. that a modern label identifies one source, one member set, and one
   guarantee;
6. that a later primary paper's description is direct inspection of the 1953
   manuscript; and
7. that a printed table or simulation result is the mathematical guarantee.

## 7. Reopened claim ledger

Revisit every `S1` through `S12` row in the initial primary-source result. For
each row, provide:

- old status;
- new status from `VERIFIED_DIRECT_ORIGINAL`, `VERIFIED_DIRECT_LATER`,
  `CROSS_SOURCE_INFERENCE`, `CONTRADICTED`, or `NOT_VERIFIABLE`;
- source ID and printed-page plus theorem, equation, table, or paragraph
  pinpoint;
- exact claim scope; and
- whether the row can be closed, narrowed, or remains open.

`VERIFIED_DIRECT_LATER` may support a narrower current mathematical statement,
but it must never be phrased as verification of the unavailable original text.

## 8. Required claim matrix

For each supplied source, report:

| Field                      | Required content                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------- |
| Source identity            | Citation, DOI or stable identifier, artifact SHA-256, page map                     |
| Procedure object           | Test, simultaneous interval, multiple range procedure, simulation, proof, or table |
| Member set                 | Exact pairwise, range-based, selected, or other family                             |
| Design                     | Balanced, unequal-size, or other restriction                                       |
| Variance model             | Common, separate, known, estimated, or unstated                                    |
| Distributional assumptions | Exact scope and pinpoint                                                           |
| Guarantee                  | Exact, conservative, approximate, simulation-supported, conjectural, or unstated   |
| Sidedness                  | One-sided, two-sided, simultaneous intervals, or not applicable                    |
| Attribution role           | Proposal, proof, simulation, comparison, extension, or later historical report     |
| Later-work boundary        | What must not be attributed to this source                                         |
| Evidence status            | Direct original, direct later, inference, contradicted, or not verifiable          |

Absence findings require the full searched page range, search terms, and a note
on whether the file had a reliable text layer or required visual inspection.

## 9. Narrow-closure decision test

Answer separately:

1. Can the unequal-size proposal lineage be closed from Kramer (1956)?
2. Can the general conservative guarantee be closed from Hayter (1984)?
3. Can the balanced mathematical construction and guarantee be supported
   narrowly by a later primary formalization even though Tukey (1953) was not
   inspected?
4. Does manuscript wording or archival fidelity remain necessary for any
   decision-bearing project claim, or only for historical attribution?
5. What is the smallest residual source requirement after this pass?

Do not use a vote across papers. A source closes only the claim it directly
establishes within its own assumptions.

## 10. Required report structure

Return one complete English Markdown report with these sections:

1. identity, input, artifact-hash, access, and independence checks;
2. executive disposition: `ADVANCE`, `NARROW`, `DEFER`, or `NO_GO`;
3. complete inspected-source register and page maps;
4. source-by-source findings with exact pinpoints;
5. reopened `S1`-`S12` claim ledger;
6. required claim matrix;
7. chronology and attribution separation;
8. comparison with the Tukey (1949) and unavailable Tukey (1953) boundaries;
9. falsification and overclaim attacks;
10. narrow-closure decision test;
11. residual holds and exact next source, if any; and
12. public-artifact and sanitization self-check.

Write the report to the steward as
`2026-09-01-all-pairs-successor-source-supplied-completion-result.md`. Do not
modify, commit, or push repository files.

## 11. Public-artifact constraints

- The supplied source PDFs are not public repository artifacts. Do not embed,
  redistribute, or commit them.
- Record citations, artifact hashes, page maps, and short pinpoints only.
- Keep quotation from each source below 25 words in the entire report.
- Use neutral, role-based attribution. Do not identify or imply the software,
  service, provider, or mechanism used to draft, investigate, or review.
- Do not claim human authorship.
- Keep fact, cross-source inference, and project disposition separate.
- Do not select a procedure, method identifier, default, tolerance, schema,
  API, implementation, or release change.
- Do not inspect or make a decision about Release 2, paired-t, or t-family
  numerical-contract work.

## 12. Disposition and final line

Report one successor-source disposition: `CLOSE`, `NARROW_AND_CLOSE`, or
`KEEP_OPEN`. A disposition may close a named subclaim while preserving a
smaller residual requirement, but the report must state unambiguously whether
the overall retained requirement is still open.

End with exactly one of:

`FND-1 ALL-PAIRS SUCCESSOR SOURCE-SUPPLIED COMPLETION PASS COMPLETE - ADVANCE - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR SOURCE-SUPPLIED COMPLETION PASS COMPLETE - NARROW - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR SOURCE-SUPPLIED COMPLETION PASS COMPLETE - DEFER - NOT PROTOCOL ADOPTION`

`FND-1 ALL-PAIRS SUCCESSOR SOURCE-SUPPLIED COMPLETION PASS COMPLETE - NO-GO - NOT PROTOCOL ADOPTION`
