# FND-2 source-bounded research disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts one bounded investigation as reusable research input. It does not
close the full FND-2 Research Gate, create Protocol meaning, or authorize an
implementation or release change.

## Recorded disposition

| Item                     | Disposition                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Research package         | `FND-2`                                                                                  |
| Accepted result          | [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md) |
| Result commit            | `6c356743d67f0d8c4d7ca5734b04ea90edee5652`                                               |
| Commission base          | `14039767de57f6a87fbe1b67eeef1f0e7a9385de`                                               |
| Investigator disposition | `DEFER`                                                                                  |
| Steward disposition      | `ACCEPTED AS SOURCE-BOUNDED FND-2 INPUT / DEFER`                                         |
| Full FND-2 Research Gate | Not ready; not closed                                                                    |
| Protocol adoption        | None                                                                                     |

The accepted result is the sole completed FND-2 result incorporated into this
research package. It is accepted for the claims and source scopes stated in the
result, not as a substitute for the inaccessible part of the commissioned source
basis.

## Intake and independence ruling

The accepted result was produced on a branch rooted directly at the commissioned
base and changed only the assigned result file. Its disclosed pre-assignment
exposure was limited to the FND-1 instructions and an empty FND-1 result
placeholder. Neither contained another investigator's findings, and neither was
used as evidence. This procedural exposure does not disqualify the source-bounded
result.

The earlier FND-2 result on branch `review/fnd-2-claude-20260830`, commit
`e5d8c9fa4ddf9117bd8b2e8e9277937ad80b9277`, is not incorporated. Its disclosed
authorship-level exposure to FND-1 findings and prior nomue adjudication material
prevents it from serving as the independent FND-2 pass. Repeated preflight-only
attempts that made no repository change are not research results and require no
intake.

## Evidence accepted within fixed scope

The following work is accepted as reusable research evidence, subject to every
version, file-scope, search-method, and residual-uncertainty qualifier in the
result:

- full-text, version-fixed inspection of the ARS v1.0.0 logical model, the USDM
  data dictionary and corroborating API material at DDF-RA v4.0.0, the dated
  PROV-O and PROV-CONSTRAINTS Recommendation snapshots, and the RO-Crate 1.3
  specification chapters;
- PROV-DM as context only, with no decision-bearing claim resting on it alone;
- classification of all 12 commissioned counterexamples and both
  investigator-added cases using value-independent reasoning;
- the claim-evidence ledger, standards capability matrix, identity-attribute
  necessity analysis, worked examples, and scoped absence ledger; and
- the explicit separation of verified source facts, project inference,
  candidate convention, disagreement, and unresolved evidence.

The negative findings labeled `A1` through `A6`, `U1` through `U3`, `P1`, `P2`,
`C1`, and `R1` are accepted only as scoped absence observations. They do not
generalize to uninspected files, prose deliverables, controlled-terminology
artifacts, later versions, or standards that were inaccessible to the
investigator.

## Provisional findings carried forward

The following findings may be used to frame later research or candidate design.
They remain hypotheses and design inputs rather than adopted Protocol semantics:

1. The four result-relation labels in the counterexample corpus do not adequately
   classify analysis-data identity. A data-identity relation vocabulary and an
   assurance-class axis need to be treated as separate questions.
2. Analysis-data identity cannot be inferred from equal output values or equal
   content hashes alone. The result supports continued examination of a logical
   dataset identity that includes declared canonicalization, source snapshot,
   selection, transformation structure, execution identity, and output identity.
3. `excluded` is better analyzed on a selection axis than as a cell-value state.
   `not_relevant_to_estimand` is better analyzed as a relation between a datum and
   an estimand. The remaining candidate state names and membership are not closed.
4. Missingness-mechanism assumptions and cell-value states have different bearers
   and verification questions. The content of a mechanism taxonomy remains held.
5. Within the inspected versions, USDM supplies design and estimand-side structure
   while ARS supplies analysis and result-side structure. A linking profile remains
   a candidate for later investigation; none of its links is adopted here.
6. Public recomputation, trusted local recomputation, and attestation-only evidence
   provide different assurance content. Any names, ordering, or cryptographic
   binding semantics for those classes remain open.

No future design may cite this disposition as selecting the proposed relation
names, identity tuple, state vocabulary, standards composition, linking fields, or
assurance labels.

## Holds preserved

| Hold      | Preserved unresolved question                                                       | Consequence                                                               |
| --------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `HOLD-01` | Estimand alignment against the full ICH E9(R1) text                                 | Estimand-linked identity semantics and final link wording remain open     |
| `HOLD-02` | SPIRIT 2025 Items 27b/27c declaration requirements                                  | Reporting-standard-aligned declaration completeness remains open          |
| `HOLD-03` | ADaM traceability and value-state or imputation conventions                         | State vocabulary and the ADaM limb of the standards matrix remain open    |
| `HOLD-04` | Missingness, multiple-imputation, and censoring primary-source grounding            | Mechanism taxonomy, MI representation, and censoring subtypes remain open |
| `HOLD-05` | Commitment or attestation strength and any formal PROV-to-schema.org action mapping | Assurance definitions and provenance-vocabulary selection remain open     |

No completion rerun is commissioned on the present FND-2 line. These holds remain
deferred. A later project may reopen only the hold on which a concrete proposed
design materially depends, using accessible primary sources and the normal Research
Gate discipline.

## Explicit non-decisions

This disposition does not:

- add or select a Record field, schema, identifier, vocabulary, profile, or
  interpretation bundle;
- select a data packaging, provenance transport, imputation, missing-data,
  censoring, stochastic-execution, commitment, or attestation convention;
- authorize reference implementation work or conformance expectations;
- close FND-2 or any release gate; or
- affect Release 2, paired-t work, or t-family numerical-contract work.

## Reopen conditions

The accepted source-bounded observations remain reusable while their exact source
versions and inspected scopes remain applicable. Re-adjudication is needed if a
dependent proposal expands those scopes, relies on a held question, uses a newer
standard version, or encounters primary evidence that materially conflicts with
the accepted observations.

FND-2 SOURCE-BOUNDED INPUT ACCEPTED - FULL RESEARCH GATE DEFERRED - NOT PROTOCOL ADOPTION
