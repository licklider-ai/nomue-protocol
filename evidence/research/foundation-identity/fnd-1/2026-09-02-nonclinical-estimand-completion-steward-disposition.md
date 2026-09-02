# FND-1 Non-Clinical Estimand Completion Steward Disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts the reviewed, source-bounded primary-source completion result as
research input, records the close review's two documentation corrections, and
keeps `FND1-H04` open. It does not establish cross-domain estimand vocabulary,
select a schema or method, authorize implementation, close the FND-1 Research
Gate, or affect a release.

## Recorded disposition

| Item                          | Disposition                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Research package              | `FND-1`                                                                                                                                                                        |
| Hold                          | `FND1-H04`                                                                                                                                                                     |
| Completion commission         | [`2026-09-01-nonclinical-estimand-primary-source-completion-commission.md`](2026-09-01-nonclinical-estimand-primary-source-completion-commission.md)                           |
| Completion result             | [`2026-09-01-nonclinical-estimand-primary-source-completion-result.md`](2026-09-01-nonclinical-estimand-primary-source-completion-result.md)                                   |
| Completion result commit      | `8854f8f25916459a0bb367508b60597ffc88b581`                                                                                                                                     |
| Completion result intake      | `92610983fcf8c77cdd14eeedf6e3351b3379a55f`                                                                                                                                     |
| Completion result disposition | `DEFER`; `FND1-H04: KEEP_OPEN`                                                                                                                                                 |
| Close-review commission       | [`2026-09-01-nonclinical-estimand-primary-source-completion-close-review-commission.md`](2026-09-01-nonclinical-estimand-primary-source-completion-close-review-commission.md) |
| Close-review result           | [`2026-09-01-nonclinical-estimand-primary-source-completion-close-review-result.md`](2026-09-01-nonclinical-estimand-primary-source-completion-close-review-result.md)         |
| Close-review result commit    | `c41329c7cb5ee7e58b6b785de50d78c9167d4057`                                                                                                                                     |
| Close-review result blob      | `9d089dc4cbc6d49944380e44885921f95817332a`                                                                                                                                     |
| Close-review result SHA-256   | `837105533bf838b55c0847edd9f875fe35b7d62205a5396f6107552100cf6717`                                                                                                             |
| Close-review intake           | pull request #135; head `47fc4f7feb6623f453f2692bcf08b6effe234849`                                                                                                             |
| Close-review verdict          | `GO`; no blocker; two documentation-level `SHOULD_FIX` findings; two `NICE_TO_HAVE` observations                                                                               |
| Steward disposition           | `ACCEPTED AS SOURCE-BOUNDED FND1-H04 COMPLETION EVIDENCE`                                                                                                                      |
| `FND1-H04`                    | `KEEP_OPEN`                                                                                                                                                                    |
| Other FND-1 holds             | `FND1-H05` through `FND1-H08` remain open                                                                                                                                      |
| Full FND-1 Research Gate      | Not ready; not closed                                                                                                                                                          |
| Protocol adoption             | None                                                                                                                                                                           |

The accepted result is evidence completion for a bounded subset of the hold,
not closure of the hold. The original `DEFER / KEEP_OPEN` disposition remains
the only disposition permitted by the completion result's own closure rule.

## Intake and review ruling

The completion result directly inspected one formal non-ICH target-quantity
source and one formal below-detection-limit source. It reported `H04-S1` as
partially met, `H04-S2` as met, `H04-S3` as met with a rendition caveat, and
`H04-S4` as not verifiable. It therefore refused to close `FND1-H04`.

The close review returned `GO` after directly inspecting both mandatory source
artifacts. It verified all fixed commit, ancestry, blob, content-hash, line-count,
and disposition identities. It reproduced every load-bearing source claim at
the recorded evidence grade and confirmed that `H04-S1` remains partial. No
blocker, material overclaim, unlocatable load-bearing evidence, invalid source
identity, scope breach, or disposition error was found.

The reviewer inspected these source artifacts:

| Source   | Inspected artifact                                     | SHA-256                                                            | Extent                                           |
| -------- | ------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------ |
| `SRC-05` | Kurland et al., arXiv `1001.2697v1` PDF                | `cc8a8878f767c9793aacd447eff7367eb49e6d86457e02d0f7fdd578cb06a33d` | 13 PDF pages; 302,528 bytes                      |
| `SRC-06` | Singh and Nocerino, EPA NEPIS `P1010E75` PDF rendition | `24ac1815879205e35dc6a38b3d3060825171fa3865c1bc39761010fbc63d7958` | 39 PDF pages; internal pages 1–34; 338,805 bytes |

The `SRC-06` artifact is a PDF rendition of the same stable NEPIS document,
whereas the completion result inspected the TXT rendition. The close review
keeps that rendition boundary explicit and uses the PDF to verify the complete
document content and page anchors. It does not claim byte identity between the
PDF and TXT renditions.

The close-review intake preserves the reviewer result commit as an immutable
merge parent. Its informative bookkeeping does not change the reviewed result
or any normative surface.

## Accepted bounded evidence

The following findings are accepted only within the inspected sources,
versions, artifacts, and claim grades recorded by the completion result and
close review:

1. `SRC-05` directly defines target quantities with an explicit unit set,
   group or condition index, scaled outcome, assessment-time indexing, and
   population-level summaries.
2. `SRC-06` directly defines a contrast-free target for one left-censored
   distribution. This establishes that a comparison direction is conditional,
   not a universal target-identity element.
3. `SRC-05` directly distinguishes an outcome that remains defined but is
   unobserved from a post-terminal-event outcome that is not part of the
   data-generating structure.
4. `SRC-06` directly distinguishes below-detection-limit censoring, which
   retains a bound and inequality fact, from deletion or ordinary absence.
5. `SRC-05` supports target-changing model choices; `SRC-06` supports
   procedure choices directed at one fixed distributional target. This is
   evidence for a conditional target-versus-procedure boundary, not a universal
   classification rule.
6. No inspected text supports importing ICH E9(R1) strategy names verbatim as
   general non-clinical vocabulary. This bounded absence is not a ban on
   separately justified causal or domain-specific concepts.

These findings remain research evidence. They are not Protocol fields,
registered vocabulary, supported methods, defaults, conformance rules, or
implementation behavior.

## Completion-requirement disposition

| Requirement | Steward ruling                          | Preserved boundary                                                                                                                                          |
| ----------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `H04-S1`    | Partially met; remains open             | `SRC-05` carries the principal elements, but the two-formal-text condition is unmet and the canonical potential-outcomes lineage was not directly inspected |
| `H04-S2`    | Met within the inspected `SRC-05` scope | The direct truncation-versus-nonresponse distinction is reusable; it does not close the broader hold                                                        |
| `H04-S3`    | Met with recorded rendition boundaries  | The direct censoring and retained-information distinction is reusable; the original lead papers remain uninspected                                          |
| `H04-S4`    | Not verifiable; remains open            | No inspected animal or humane-endpoint source establishes post-assignment or terminal-event handling outside ICH vocabulary                                 |

Because `H04-S1` is only partially met, `CLOSE` and `NARROW_AND_CLOSE` remain
unavailable. `KEEP_OPEN` is retained without modification.

## Resolution of close-review findings

### Finding 1 — `D14` search record

The frozen completion result remains unchanged. This disposition records the
missing per-source hit classification required by the close review:

| Search term or concept                                                | `SRC-05` arXiv v1                        | `SRC-06` PDF rendition | Ruling                                                   |
| --------------------------------------------------------------------- | ---------------------------------------- | ---------------------- | -------------------------------------------------------- |
| `ICH`, `E9`, `intercurrent`, `treatment policy`, `while-on-treatment` | no word-boundary hits                    | no word-boundary hits  | bounded absence upheld                                   |
| `estimand`                                                            | 8 general statistical uses               | no hits                | not an ICH strategy-name use; favorable non-ICH evidence |
| `hypothetical`                                                        | 15 ordinary-adjective uses               | 1 probability-plot use | not an ICH strategy-name use                             |
| `composite`                                                           | 1 composite-response use                 | no strategy-name use   | not an ICH strategy-name use                             |
| principal stratification                                              | model class in Table 2 and section 4.2.2 | no strategy-name use   | causal-literature concept; not an ICH import             |

Accordingly, `D14(a)` is accepted only in narrowed form: the ICH
strategy-name absence survives, while the raw terms and their non-ICH senses
must not be reported as absent. `D14(b)` remains appropriately bounded to the
inspected rendition. The omitted hits understate relevant evidence and do not
create an overclaim.

### Finding 2 — `SRC-06` extent

The complete PDF rendition is internally numbered through page 34. References
begin on internal page 33 and end on internal page 34. The frozen result's
statement that numbering or References end on page 33 is corrected by this
record. If a later task relies on the TXT rendition, it must separately record
whether that served rendition was truncated before internal page 34.

Neither correction changes a load-bearing claim, evidence grade, completion
requirement, or disposition.

## Resolution of review observations

1. `D11`'s statement that substitution bias leaves the target quantity
   unchanged is accepted as a cross-source interpretive frame: the compared
   procedures address the same population mean and standard deviation. It is
   not represented as a sentence stated verbatim by `SRC-06`.
2. The `SRC-05` preprint extent is now fixed at 13 PDF pages. The completion
   result's residual item requesting that page count is resolved.

These observations require no repair to the frozen result.

## Residual source requirements

`FND1-H04` remains open on the following material gaps:

1. the `H04-S1` potential-outcomes lineage, including direct inspection of the
   identified Neyman, Rubin, and Holland texts with source-anchored definitions
   of unit set, condition, outcome, time, and population summary;
2. the `H04-S4` animal or humane-endpoint gap, requiring a directly inspected
   non-clinical experimental source on post-assignment condition change or
   terminal events without assuming ICH strategy vocabulary;
3. the original Gilliom and Helsel and Helsel below-detection-limit sources,
   which remain uninspected behind the accepted `SRC-06` formal-document route;
   and
4. any remaining artifact-variant metadata that a dependent claim actually
   requires, including the `SRC-05` record-page report number.

The next source pass must be independently commissioned against these exact
residuals. Source counts, modern eponyms, abstracts, snippets, or secondary
summaries do not substitute for direct primary or formal text.

## Current FND-1 state

| Hold       | State         | Preserved unresolved question                                                                                                  |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `FND1-H01` | Narrow-closed | Holm guarantee and later independence-based variant separation                                                                 |
| `FND1-H02` | Narrow-closed | Benjamini-Hochberg original theorem and later dependence-result separation                                                     |
| `FND1-H03` | Narrow-closed | Original multiplicity attribution, with the separately bounded historical residual handled by its successor-source disposition |
| `FND1-H04` | `KEEP_OPEN`   | Direct potential-outcomes lineage and non-clinical terminal-event evidence                                                     |
| `FND1-H05` | Open          | Derived-summary relation rules on an expanded corpus                                                                           |
| `FND1-H06` | Open          | Units, timing, margins, transformations, and analysis-set design                                                               |
| `FND1-H07` | Open          | Attestation and provenance for procedure-selection assurance                                                                   |
| `FND1-H08` | Open          | Domain-specific sensitivity-link semantics                                                                                     |

The full FND-1 Research Gate remains open. No public schema, vocabulary, or
implementation proposal follows directly from this disposition.

## Explicit non-decisions

This disposition does not:

- adopt a cross-domain estimand, event, missingness, censoring, or terminal-event
  vocabulary;
- import an ICH strategy name into general scientific use;
- choose a causal, missingness, censoring, detection-limit, sensitivity, or
  terminal-event method;
- add or modify a Record field, schema, identifier, vocabulary term, reason
  code, public check, API, conformance rule, or implementation;
- close `FND1-H04` through `FND1-H08`, the full FND-1 Research Gate, or any
  release gate;
- treat the close review as a new source-completion investigation; or
- affect Release 2, paired-t, or t-family numerical-contract work.

## Reopen conditions

Re-adjudication is required if:

- direct potential-outcomes or non-clinical terminal-event evidence materially
  contradicts the accepted target-quantity or bearer boundaries;
- a supplied artifact does not match a recorded identity, version, extent, or
  content hash;
- a dependent proposal treats a scoped absence as a universal absence;
- a future design requires collapsing outcome existence, observation state,
  datum relevance, mechanism assumptions, or realized trajectories; or
- a future proposal uses this record as if it closed `FND1-H04` or adopted a
  Protocol surface.

FND1-H04 COMPLETION EVIDENCE ACCEPTED - HOLD OPEN - NOT PROTOCOL ADOPTION
