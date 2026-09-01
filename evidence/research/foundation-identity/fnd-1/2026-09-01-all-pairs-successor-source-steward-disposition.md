# FND-1 All-Pairs Successor-Source Steward Disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts the reviewed, source-bounded reconciliation of the all-pairs
successor-source follow-up. It does not select an all-pairs procedure, define
Protocol meaning, authorize implementation, close the full FND-1 Research
Gate, or affect a release.

## Recorded disposition

| Item                                 | Disposition                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Research package                     | `FND-1`                                                                                                                                                      |
| Earlier hold                         | `FND1-H03`, already narrowed and closed by the multiplicity steward disposition                                                                              |
| Reconciliation                       | [`2026-09-01-all-pairs-successor-source-reconciliation.md`](2026-09-01-all-pairs-successor-source-reconciliation.md)                                         |
| Reconciliation candidate commit      | `2cb59a820ee6c5f6e5ec6f62ca2488b5e9ac3c35`                                                                                                                   |
| Close-review result                  | [`2026-09-01-all-pairs-successor-source-reconciliation-close-review-result.md`](2026-09-01-all-pairs-successor-source-reconciliation-close-review-result.md) |
| Close-review result commit           | `92588c2d6acb709b755478fee073823e26a6a785`                                                                                                                   |
| Close-review result blob             | `5cf50bf08df8bf0750f950ec29888cfa298727ad`                                                                                                                   |
| Close-review result SHA-256          | `bd70ba97987b995af8f62c98ba934c77e6647069bb618cff2391b1665485fc68`                                                                                           |
| Close-review intake commit           | `a2a31698a3bf37a6b7a8c75ae6866b69f7b7bcea`                                                                                                                   |
| Close-review verdict                 | `GO`; C-01 through C-12 passed; no blocker or should-fix finding; two non-blocking observations                                                              |
| Steward disposition                  | `ACCEPTED AS SOURCE-BOUNDED ALL-PAIRS SUCCESSOR-SOURCE RECONCILIATION`                                                                                       |
| Named successor-source subclaims     | `NARROW_AND_CLOSE`                                                                                                                                           |
| Overall successor-source requirement | `KEEP_OPEN`, narrowed to the historical-attribution residual in this record                                                                                  |
| Other FND-1 holds                    | `FND1-H04` through `FND1-H08` remain open                                                                                                                    |
| Full FND-1 Research Gate             | Not ready; not closed                                                                                                                                        |
| Protocol adoption                    | None                                                                                                                                                         |

`KEEP_OPEN` is the commissioned disposition value used for the remaining
requirement. The reconciliation's phrase `OPEN_NARROWED` is retained only as a
plain-language description of the same bounded state; it is not a new
registered status or Protocol vocabulary item.

## Intake and review ruling

The source-supplied completion inspected four acquired primary texts: Kramer
(1956), Spjøtvoll and Stoline (1973), Hayter (1984), and Dunnett (1980). Its
registered artifact hashes and page maps were checked at intake. The completed
report was recorded without its preceding working transcript and without a
scientific rewrite.

The repository-analysis pass had correctly found that no successor-source
bibliographic identity or pinned text existed in its fixed repository scope.
The later source-supplied completion filled that evidence gap; it did not make
the earlier bounded absence finding erroneous. The reconciliation preserves
both conclusions and their time order.

The independent close-only review returned `GO`. It verified the seven fixed
inputs, candidate commit and blob, intake normalization, cross-pass fidelity,
evidence-role separation, exact residual hold, repository-repair assessment,
and downstream boundaries. It reported no blocker or should-fix finding. The
four source PDFs were unavailable in the review environment, so the review
correctly recorded `SOURCE_SPOT_CHECK_NOT_AVAILABLE` and tested source-claim
fidelity only against the frozen completion result.

The close-review intake copies the completed result with the exact blob and
SHA-256 values recorded above. It does not alter the report. The intake commit
uses neutral, role-based metadata and updates only informative bookkeeping and
generated views.

## Accepted source roles

The following separations are accepted as reusable, source-bounded research
input:

1. Hayter (1984) supplies later-primary formal support for the balanced
   Studentized-range all-pairs construction and proves conservativeness of the
   unequal-size Tukey-Kramer procedure under the conditions recorded in the
   completion result.
2. Kramer (1956) proposes and illustrates an unequal-replication extension. It
   does not supply the later general proof accepted from Hayter (1984).
3. Spjøtvoll and Stoline (1973) describe a structurally distinct extended
   T-method. Its exact augmented-range result and ordinary-range approximation
   remain separate from the Tukey-Kramer construction.
4. Dunnett (1980) supplies simulation and comparison evidence, not the general
   proof.
5. No inspected source is Tukey's 1953 manuscript or the 1994 archival
   printing. Later-primary mathematical support does not verify the wording,
   pagination, or publication history of either artifact.

These statements remain limited to the inspected editions, page pinpoints,
assumptions, and claim roles recorded in the source-supplied completion. They
do not establish numerical correctness of a software implementation or select
a supported procedure.

## Subclaim dispositions

The review accepted the reconciliation's scientific direction. This record
uses only the commissioned disposition vocabulary and keeps the substantive
ruling in a separate column.

| Subclaim                                                             | Disposition        | Steward ruling                                                                                         |
| -------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| Later-primary mathematical support for the balanced all-pairs family | `NARROW_AND_CLOSE` | Accept Hayter's formalization as later-primary support; do not treat it as inspection of Tukey (1953). |
| Kramer proposal lineage                                              | `NARROW_AND_CLOSE` | Accept proposal and illustration only.                                                                 |
| Unequal-size guarantee lineage                                       | `NARROW_AND_CLOSE` | Attribute the general conservativeness proof to Hayter (1984), within the recorded conditions.         |
| Variant separation                                                   | `NARROW_AND_CLOSE` | Keep the Spjøtvoll-Stoline extension and Dunnett simulation distinct from the proof lineage.           |
| Claim that Kramer (1956) supplies the general proof                  | `NARROW_AND_CLOSE` | Reject the overclaim; the accepted source role is proposal, not proof.                                 |
| Claim that Dunnett (1980) supplies the general proof                 | `NARROW_AND_CLOSE` | Reject the overclaim; the accepted source role is simulation and comparison.                           |
| Overall successor-source requirement                                 | `KEEP_OPEN`        | Narrow to the exact historical-attribution residual below.                                             |

Closing these named subclaims does not close a Protocol-method question. It
only settles which inspected source may support which bounded historical or
mathematical statement.

## Exact residual hold

The remaining successor-source requirement is limited to historical
attribution:

1. the 1953 manuscript's own wording and printed-page identity;
2. the exact wording and location of the unequal-size conservativeness
   conjecture; and
3. fidelity of the 1994 archival printing to the manuscript.

The next acceptable artifact is an authenticated copy of Tukey, "The Problem
of Multiple Comparisons" (1953), or the relevant authenticated printing in
_The Collected Works of John W. Tukey, Volume VIII_ (1994). Until such an
artifact is inspected, no claim may attribute the later construction,
conjecture wording, or archival text directly to the 1953 manuscript.

This residual no longer reopens the accepted later-primary mathematical,
proposal-lineage, guarantee-lineage, or variant-separation subclaims. It also
does not authorize numerical implementation work.

## Resolution of review observations

The close review reported two `NICE_TO_HAVE` observations. Neither requires a
repair to the frozen reconciliation.

### Observation 1 — descriptive label outside the disposition set

The reconciliation used `CLOSE_AS_REJECTED_OVERCLAIM` as a descriptive label
and explicitly stated that it was not registered vocabulary. This disposition
removes any future ambiguity by using `NARROW_AND_CLOSE` in the disposition
column and recording "reject the overclaim" separately as the ruling. The
frozen reconciliation remains unchanged.

### Observation 2 — location of intake hashes

The source-supplied completion intake identified three normalization stages in
pull request #94. Their values are repeated here in a repository-tracked
record:

| Artifact stage                                          | SHA-256                                                            | Recorded location                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Supplied file, including the 36-line working transcript | `853c2227e41edede4def3061103a7f9a514b50775ab7bf168ad5a883fb3c9606` | Intake record for pull request #94                                                  |
| Extracted report body before repository formatting      | `7d30cc827c58eab54e6bf919c711e82dd8230c451104654ef5dfe888302686a5` | Intake record for pull request #94                                                  |
| Repository-normalized completion report                 | `026fd91dfa200d1f35ef6c3a636ea4a69db24b82763c54c1ce16d1abb9aed0e5` | Intake record for pull request #94 and independently recomputed by the close review |

The first two artifacts are outside the repository. Their hashes preserve
identity but do not make the artifacts public evidence. The committed report
remains the repository object used downstream.

## Repository-repair ruling

No repair to a live normative or public-contract surface is required. The
repository-analysis pass found no current surface that attributes the later
all-pairs construction or unequal-size guarantee to the wrong primary text.
Historical research records remain unchanged and retain their own evidence
statuses and later corrections.

This ruling does not prevent a future editorial clarification if a public
surface later introduces an overbroad eponym or source attribution. Any such
change requires its own bounded proposal and review.

## Current FND-1 state

`FND1-H01` through `FND1-H03` remain closed in narrowed form. The all-pairs
successor-source follow-up beneath `FND1-H03` now has its mathematical and
lineage subclaims narrowed and closed, with only the historical-attribution
residual above still open.

The following holds remain unchanged:

| Hold       | Preserved unresolved question                                                  | Downstream work still blocked   |
| ---------- | ------------------------------------------------------------------------------ | ------------------------------- |
| `FND1-H04` | Primary non-clinical event and missing-outcome sources                         | General estimand vocabulary     |
| `FND1-H05` | Adversarial review of derived-summary rules on an expanded corpus              | Relation vocabulary and schema  |
| `FND1-H06` | Design research for units, timing, margins, transformations, and analysis sets | Public schema and fields        |
| `FND1-H07` | Attestation and provenance research for procedure-selection assurance          | Provenance field or reason code |
| `FND1-H08` | Domain-specific sensitivity-link research                                      | Sensitivity role and link       |

Therefore, the full FND-1 Research Gate remains open. The next independent
research package may address one of these holds, but no schema or Protocol
surface follows directly from this disposition.

## Explicit non-decisions

This disposition does not:

- select or register Tukey HSD, Tukey-Kramer, or another all-pairs procedure;
- define a method identifier, family identifier, variant name, default,
  tolerance, critical-value source, or numerical contract;
- add or modify a Record field, schema, vocabulary, reason code, public check,
  API, conformance rule, or implementation;
- close the historical-attribution residual, `FND1-H04` through `FND1-H08`,
  the full FND-1 Research Gate, or a release gate;
- adopt the reconciliation's descriptive labels as Protocol vocabulary; or
- affect Release 2, paired-t, or t-family numerical-contract work.

## Reopen conditions

Re-adjudication is required if:

- an authenticated 1953 manuscript or 1994 archival printing materially
  contradicts the accepted historical boundary;
- a later proposal relies on assumptions, sidedness, member sets, or guarantee
  claims outside the inspected source scope;
- a current public or normative surface introduces an overbroad attribution;
  or
- evidence emerges that materially conflicts with the accepted separation of
  proposal, simulation, alternative extension, and proof.

FND-1 ALL-PAIRS SUCCESSOR-SOURCE SUBCLAIMS NARROWED AND CLOSED - HISTORICAL ATTRIBUTION RESIDUAL OPEN - NOT PROTOCOL ADOPTION
