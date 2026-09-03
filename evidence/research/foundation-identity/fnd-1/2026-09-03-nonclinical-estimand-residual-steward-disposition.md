# FND-1 Non-Clinical Estimand Residual Steward Disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts the reviewed `H04-S1` potential-outcomes lineage evidence and
the adjudicated `H04-S4` animal-endpoint evidence, records every required
documentation correction, and narrows and closes `FND1-H04` as a bounded
research hold. It does not adopt cross-domain vocabulary, select a schema or
method, authorize implementation, close the full FND-1 Research Gate, or affect
a release.

## Recorded disposition

| Item                               | Disposition                                                                                                                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Research package                   | `FND-1`                                                                                                                                                                                                                                                                     |
| Earlier completion disposition     | [`2026-09-02-nonclinical-estimand-completion-steward-disposition.md`](2026-09-02-nonclinical-estimand-completion-steward-disposition.md): `FND1-H04: KEEP_OPEN` pending `H04-S1` and `H04-S4`                                                                               |
| `H04-S1` source result             | [`2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md`](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-result.md); blob `510e4fc6ec85f958da9ce9228ce292f411c9983f`                                                                             |
| `H04-S1` close review              | [`2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-result.md`](2026-09-02-nonclinical-estimand-potential-outcomes-lineage-close-review-result.md); blob `24203ab3c79fe7eb7e824e91211d3e4d1beb67de`; merge `6722c343c5b5d0226f800ab6153cfb53e363c0ad` |
| `H04-S1` review verdict            | `GO`; zero `BLOCKER`, three `SHOULD_FIX`, three `NICE_TO_HAVE`                                                                                                                                                                                                              |
| `H04-S1`                           | `NARROW_AND_CLOSE`                                                                                                                                                                                                                                                          |
| `H04-S4` source result             | [`2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md`](2026-09-02-nonclinical-estimand-animal-endpoint-source-result.md); blob `e70e0f1020878fc76757e895fcc85aef63acda4e`                                                                                     |
| `H04-S4` first close review        | [`2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md`](2026-09-02-nonclinical-estimand-animal-endpoint-close-review-result.md); blob `e9f47c415aa21176663ebfa895a76a3a4855a0f2`; merge `371bb85371357c982e1ab940fd34a74a1e9d7ec4`                       |
| `H04-S4` supplemental close review | [`2026-09-03-nonclinical-estimand-animal-endpoint-supplemental-close-review-result.md`](2026-09-03-nonclinical-estimand-animal-endpoint-supplemental-close-review-result.md); four documentation-level `SHOULD_FIX` findings                                                |
| `H04-S4` variance adjudication     | [`2026-09-03-nonclinical-estimand-residual-review-variance-adjudication.md`](2026-09-03-nonclinical-estimand-residual-review-variance-adjudication.md); stricter four-item correction ledger accepted                                                                       |
| `H04-S4`                           | `NARROW_AND_CLOSE`                                                                                                                                                                                                                                                          |
| `H04-S2`                           | Remains met within the inspected `SRC-05` scope                                                                                                                                                                                                                             |
| `H04-S3`                           | Remains met with the recorded `SRC-06` rendition boundaries                                                                                                                                                                                                                 |
| `FND1-H04`                         | `NARROW_AND_CLOSE` for the bounded non-clinical estimand source question                                                                                                                                                                                                    |
| Other FND-1 holds                  | `FND1-H05` through `FND1-H08` remain open                                                                                                                                                                                                                                   |
| Full FND-1 Research Gate           | Not ready; not closed                                                                                                                                                                                                                                                       |
| Protocol adoption                  | None                                                                                                                                                                                                                                                                        |

## Steward ruling

The earlier completion disposition refused closure because `H04-S1` lacked its
direct potential-outcomes lineage and `H04-S4` lacked direct animal or
humane-endpoint evidence. Those exact residuals are now filled:

1. `H04-S1` directly inspected the required Neyman, Rubin, and Holland artifacts
   and met its commissioned source and pinpoint threshold in narrowed form.
2. `H04-S4` directly inspected the OECD guidance, the justified CCAC replacement,
   and the Workman et al. article and met its endpoint-time-action threshold in
   narrowed form.
3. Both close-review tracks returned `GO`. The `H04-S4` review variance was
   resolved claim by claim, not by majority, and the stricter correction ledger
   is incorporated below.
4. `H04-S2` and `H04-S3` were already accepted as met within their recorded
   source and rendition boundaries.

No remaining uncertainty is material to the bounded source-completion question.
The uninspected lead texts and optional attack leads remain explicit reopen
conditions rather than being treated as inspected evidence. Therefore
`H04-S1`, `H04-S4`, and the containing `FND1-H04` hold are narrowed and closed.

## Accepted `H04-S1` evidence and narrowing

The following source-bounded structure is accepted as research input:

- a target unit set, condition or exposure, outcome with scale, assessment
  occasion, and population-level summary are separate identity elements;
- the assessment occasion is direct in Rubin (1974) and Holland (1986) but only
  implicit in the inspected Neyman lineage;
- Rubin's Greek lowercase `τ` and capital Latin `T` refer to different target
  unit sets and are not silently identified;
- comparison direction is conditional because the inspected lineage contains
  both contrastive and non-contrastive population quantities; and
- the inspected texts do not directly supply a between-units no-interference
  condition, a treatment-version condition, or the general modern category
  name “target quantity.” Any such extension needs its own source pass.

The material disagreements over time's relation to the bearer, contrast
constitutiveness, bearer abstraction, and covariate-condition placement remain
preserved rather than harmonized.

## Resolution of `H04-S1` close-review findings

The frozen lineage result remains unchanged. This disposition records the
review corrections that govern later reuse.

### Page and element anchors

1. Neyman N1: sequence (13) and bracket `[29]` are on printed p. 467; the field
   of `m` plots is introduced on p. 465, not the Figure 1 page 466.
2. N2's target-unit-set introduction is on p. 465, not p. 466.
3. N3 uses pp. 465 and 467; the fertilizer-extension sentence on p. 472 is in
   original-page region `[41]`, not `[40]`.
4. N6, matrix row 8, and Case 4 use Eq. (16) on p. 470; the row-8 range is
   pp. 470–471.
5. N8's `r = 1` discussion is on p. 471 in region `[40]`, not p. 472.
6. N9, matrix row 9, and the misattribution attack place the editorial
   additivity note on p. 471, not p. 472.
7. Matrix rows 1 and 3, and the row-7 range, use pp. 465 and 467 rather than the
   body-text-free p. 466.
8. Rubin's two formulations of the same-trial observability limit are on
   p. 690, not p. 689.
9. Holland H13 and Case 3 use Eq. (35) on p. 957, not p. 958.
10. Holland H11 and matrix row 8 use Eqs. (10)–(11) on p. 949, not p. 948.
11. The final disagreement uses Holland §4.5 on p. 949, not §4.3 on p. 948.

### `PO-01` register and retained-verbatim audit

- PDF p. 9 is a photograph plate, not a continuation of Rubin's Comment; the
  continuation from printed p. 473 is absent from the artifact.
- Text extraction is effectively absent for the authorial body, apart from a
  few words on PDF p. 1, rather than partially available on interior pages.
- The accepted retained-verbatim totals are `PO-01`: 6 words (`8` under the
  broader compound-phrase reading), `PO-02`: 0, and `PO-03`: 2. The omitted
  `PO-03` words are the named-assumption label counted under the result's own
  rule. Every corrected total remains below 25.

The three optional review improvements are accepted for future reuse: prefer
Holland p. 947 for the non-contrastive mean, describe Neyman's per-variety mean
as a finite-population quantity rather than merely estimator-side, and mark the
Rubin licence-assumption labels as paraphrases when used.

## Accepted `H04-S4` evidence and narrowing

The animal-source corpus directly supports separate declarations for assigned
condition, realized welfare trajectory, event and time, graded intervention,
prespecified trigger rule, and the boundary between welfare action and the
scientific objective. It does not define whether a scheduled post-event outcome
exists, and it does not supply a statistical missingness mechanism. Oncology
thresholds remain domain-specific.

The terminology disagreement is binding on later research reuse: the CCAC
artifact deliberately uses `humane intervention point`, whereas the OECD and
Workman artifacts use `humane endpoint`. This disposition does not select one
as a Protocol term and does not treat them as silent synonyms.

## Resolution of `H04-S4` review variance and findings

The frozen source result and both close reviews remain unchanged. The
[`variance adjudication`](2026-09-03-nonclinical-estimand-residual-review-variance-adjudication.md)
controls later reuse and supplies these corrections:

1. the `AE-03` Humane Endpoints section spans pp. 1569–1570; AC-14 and the
   precision statement are on p. 1569, while AC-15 is on p. 1570;
2. the frozen `AE-01` complete quotation total is 25 words, not 19, when every
   quoted search example is counted and hyphenated compounds count as one; the
   accepted corrected rendering paraphrases the dental and
   concurrent-infection examples and retains 19 words;
3. `AE-01` is internally dated 2000 and carries the later DOI/ISBN distribution
   identity used by the commission's 2002 citation; it is not an internally
   marked 2002 edition; and
4. `AE-02r` directly states a pilot-study focus rule, not a prohibition on all
   later use of pilot data. `DEFINED_DIRECTLY` is retained only for the narrower
   focus statement.

The first review's `GO` verdict and the `H04-S4: NARROW_AND_CLOSE` direction
stand. Only its zero-`SHOULD_FIX` inventory is superseded by the adjudicated
four-item ledger. All non-blocking observations remain optional and do not
change a grade or disposition.

## Residuals after narrowed closure

The following items do not keep `FND1-H04` open, but they reopen the relevant
subclaim if a later proposal depends on them:

1. a lineage-level no-interference, treatment-version, or general
   target-quantity-category claim requires an additional primary text;
2. the exact wording of CCAC (1998), Morton (2000), and Toth (2000) remains
   uninspected;
3. a claim that formal supersession, rather than same-body role coverage, links
   CCAC 1998 and 2022 requires an official CCAC record;
4. claims needing the original Gilliom and Helsel (1986) or Helsel (1990)
   wording require those texts rather than the accepted `SRC-06` formal-document
   route; and
5. a claim tied to a different artifact rendition, edition, page map, source
   scope, or terminology must re-establish that identity and scope.

## Current FND-1 state

| Hold       | State         | Preserved boundary                                                                                                            |
| ---------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `FND1-H01` | Narrow-closed | Original Holm guarantee and later variant separation                                                                          |
| `FND1-H02` | Narrow-closed | Original Benjamini–Hochberg theorem and later dependence-result separation                                                    |
| `FND1-H03` | Narrow-closed | Original multiplicity attribution; separate historical-attribution residual remains outside the closed mathematical subclaims |
| `FND1-H04` | Narrow-closed | Source-bounded non-clinical target, outcome-existence, censoring, and animal-endpoint structure; no vocabulary adoption       |
| `FND1-H05` | Open          | Derived-summary relation rules on an expanded corpus                                                                          |
| `FND1-H06` | Open          | Units, timing, margins, transformations, and analysis-set design                                                              |
| `FND1-H07` | Open          | Attestation and provenance for procedure-selection assurance                                                                  |
| `FND1-H08` | Open          | Domain-specific sensitivity-link semantics                                                                                    |

The full FND-1 Research Gate remains open on `FND1-H05` through `FND1-H08`.

## Explicit non-decisions

This disposition does not:

- adopt a cross-domain estimand, potential-outcomes, event, missingness,
  censoring, humane-endpoint, or terminal-event vocabulary;
- select a causal, missingness, censoring, detection-limit, animal-welfare, or
  terminal-event method, threshold, or default;
- add or modify a Record field, schema, identifier, vocabulary term, reason
  code, public check, API, conformance rule, or implementation;
- close `FND1-H05` through `FND1-H08`, the full FND-1 Research Gate, or any
  release gate; or
- affect Release 2, paired-t, or t-family numerical-contract work.

## Reopen conditions

Re-adjudication is required if a dependent proposal expands beyond the source,
edition, bearer, domain, or evidence-grade boundaries above; collapses a
preserved material disagreement; relies on an uninspected source as if it were
inspected; or treats this research closure as Protocol adoption.

FND1-H04 NARROWED AND CLOSED - FND1-H05 THROUGH FND1-H08 OPEN - NOT PROTOCOL ADOPTION
