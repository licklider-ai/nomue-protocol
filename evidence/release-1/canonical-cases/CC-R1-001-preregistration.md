# Release 1 Canonical Case Preregistration — CC-R1-001

**Status:** preregistered before Release 1 evaluation/generation.

**Case ID:** `CC-R1-001`

**Purpose:** provide one rights-clear synthetic wet-lab-scale Record using the exact
planned Release 1 bundle `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`, so Release 1
verification, comparison, and relying-party evidence are not based on the older 0.2.0
canonical Record.

## Fixed source material

This case is a versioned successor of the existing informative synthetic example
`examples/canonical-case-wetlab-01/`. The following source data and declarations are
fixed **before** the Release 1 successor is generated:

- the predecessor's 16 synthetic observations: 8 vehicle-control values and 8 treated
  values;
- the same independent-groups biological-replicate design;
- the same group ordering, outcome label/scale, and data-handling declarations;
- the same Welch two-sided analysis, unstandardized arithmetic mean-difference
  estimand, and 95% confidence level;
- no observation may be removed, modified, or replaced because of the resulting p
  value, confidence interval, verification outcome, or comparison result.

The predecessor is synthetic: no real subject, real compound, unpublished study, or
third-party confidential data is introduced by this successor. `Compound NM-114`
remains explicitly fictional.

## Fixed Release 1 transformation

The successor will be generated mechanically, not edited by hand:

1. retain the fixed predecessor dataset/design declarations above;
2. issue new Record/revision identifiers for the successor;
3. set `interpretation_bundle_id` exactly to
   `urn:nomue:bundle:itgc-guarantee:0.2.1-draft.1`;
4. retain the 0.2 Record schema and ITGC 0.2 Profile required by that bundle;
5. recompute every statistical result with the reference stats kernel;
6. recompute the Record content digest with the reference verifier;
7. run the reference verifier and store its normalized machine-readable report;
8. store the canonical digest projection and SHA-256 hashes of the generated Record,
   report, and canonical content;
9. preserve/copy the predecessor's WrROC and BCO representations only as comparative
   representations of the same fixed study description; they do not become nomue
   verification evidence.

## Predeclared evaluation and disclosure rule

The case is **not selected based on whether it passes**. After generation:

- if the exact 0.2.1 verifier exits `0`, retain the case and disclose that result;
- if it exits nonzero, retain the failed case and disclose the failure/reason rather
  than adjusting the data or silently substituting another case;
- if generation cannot complete because the candidate semantics changed, retain this
  preregistration and record the case as failed/abandoned with the reason under
  Release 1 evidence.

The case may be superseded only by a separately preregistered successor. It is never
silently rewritten after evaluation.

## Guarantee boundary

A passing case demonstrates only the scoped checks of the exact registered 0.2.1
bundle for this synthetic Record. It does not establish scientific truth,
declaration truth, causal validity, external reproducibility, or correctness of
research outside the declared verification scopes.

## Relationship to release gates

This preregistration is intended to support the anti-cherry-picking requirement of
R1-10 and the synthetic-rights portion of R1-06. It does **not** by itself close either
gate, and it does not substitute for candidate-scoped verifier run logs or steward
gate review after candidate C is frozen.
