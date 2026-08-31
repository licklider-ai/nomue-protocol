# FND-1 Multiplicity Steward Disposition

**Status: informative research disposition; non-normative; not adopted.** This
record accepts the bounded primary-text investigation and its independent
close-only review as reusable FND-1 research input. It does not close the full
FND-1 Research Gate, create Protocol meaning, authorize implementation, or
affect Release 2.

## Recorded disposition

| Item                       | Disposition                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Research package           | `FND-1`                                                                                                                       |
| Reconciled result          | [`2026-08-30-independent-research-result.md`](2026-08-30-independent-research-result.md)                                      |
| Primary-text result        | [`2026-08-30-multiplicity-primary-text-closure-result.md`](2026-08-30-multiplicity-primary-text-closure-result.md)            |
| Primary-text result commit | `bf35ef43bff7101616baf72875e62a85f4b8b388`                                                                                    |
| Close-review result        | [`2026-08-30-multiplicity-close-review-result.md`](2026-08-30-multiplicity-close-review-result.md)                            |
| Close-review result commit | `a09a5aa44c9e7cbb849841a0391d0b722f287576`                                                                                    |
| Close-review intake commit | `fb437c88449b649dc80a92d4a66c8be6081e67a8`                                                                                    |
| Close-review verdict       | `GO`; C-01 through C-12 passed; no findings                                                                                   |
| Steward disposition        | `ACCEPTED AS SOURCE-BOUNDED FND-1 MULTIPLICITY CLOSURE / NARROW_AND_CLOSE`                                                    |
| Closed in narrowed form    | `FND1-H01`, `FND1-H02`, and `FND1-H03`                                                                                        |
| Preserved open holds       | `FND1-H04` through `FND1-H08`, plus the retained successor-source requirement for later all-pairs and unequal-size procedures |
| Full FND-1 Research Gate   | Not ready; not closed                                                                                                         |
| Protocol adoption          | None                                                                                                                          |

## Intake and review ruling

The primary-text result completed the commissioned full-text inspection of Holm
(1979), Benjamini and Hochberg (1995), Dunnett (1955), and Tukey (1949). It
recorded stable bibliographic identifiers, printed-page pinpoints,
printed-to-PDF mappings, and SHA-256 hashes for the four inspected attachments.

The independent close-only review was rooted directly at the recorded result
commit and changed only its assigned review-result file. It returned `GO`,
passed C-01 through C-12, reported no `BLOCKER`, `SHOULD_FIX`, or
`NICE_TO_HAVE` finding, and preserved every commissioned scope boundary.

The review environment could not reopen the four non-redistributed attachments.
The review recorded that access limit instead of reconstructing source content.
Before the primary-text result was recorded, the steward independently
recomputed all four received-file SHA-256 values and confirmed exact agreement
with the hashes in the result. The PDFs remain outside the public repository;
their absence from the repository does not broaden any accepted claim.

The close-review intake preserves commit
`a09a5aa44c9e7cbb849841a0391d0b722f287576` as a parent. The reviewer-authored
result is therefore retained as an immutable repository object rather than
copied into an unrelated history.

## Holds closed in narrowed form

### `FND1-H01` — Holm primary-text conditions

The direct-inspection requirement is closed for Holm (1979). The accepted scope
separates:

- the ordered sequentially rejective procedure and its stopping rule;
- the strong free-combinations family-wise control shown using the Boole
  inequality;
- the dependence-free scope of the main result, subject to valid marginal
  levels;
- the separate independence-based product-form threshold construction; and
- the separate weighted construction.

This closure does not select Holm as a Protocol procedure or establish that any
future implementation conforms to the paper.

### `FND1-H02` — Benjamini-Hochberg primary-text conditions

The direct-inspection requirement is closed for Benjamini and Hochberg (1995).
The accepted scope separates:

- the definitions of `V`, `R`, the no-rejection convention, and false
  discovery rate;
- the original step-up procedure;
- Theorem 1's independence condition and `(m0/m)q* ≤ q*` bound; and
- the Appendix A proof conditions.

Positive-dependence, arbitrary-dependence, adaptive, and later false-discovery
results remain attributable to their own primary sources. This closure selects
no false-discovery procedure for the Protocol.

### `FND1-H03` — Dunnett and Tukey primary-text boundaries

The direct-inspection requirement is closed in narrowed form:

- Dunnett (1955) supports the many-to-one family and its general
  multivariate-t construction at arbitrary group sizes, while its supplied
  numerical tables carry the balance, variance, sidedness, and approximation
  limits recorded in the result.
- Tukey (1949) is accepted as the three-stage gap, straggler, and upper-tail F
  procedure described in that paper.
- Tukey (1949) does not establish the later Studentized-range all-pairs
  procedure or the unequal-size extension.

The all-pairs half of the downstream question therefore remains a
successor-source requirement against the correct later primary texts. Closing
`FND1-H03` does not authorize an all-pairs procedure, a many-to-one procedure,
or a method label that silently combines later variants with the inspected
papers.

## Evidence carried forward

The following source-bounded findings are reusable as research input:

1. Multiplicity-family membership and the controlled error quantity are
   meaning-bearing parts of an inferential guarantee.
2. A procedure name alone does not communicate theorem conditions,
   dependence assumptions, family membership, sidedness, balance conditions,
   or the exact variant.
3. FWER and FDR are different controlled quantities rather than interchangeable
   names or a universal scalar ordering.
4. Many-to-one, all-pairs, omnibus, planned-contrast, fixed-sequence, and
   gatekeeping questions remain distinct by member set, claim structure, or
   procedure.
5. Later variants and extensions remain bound to their own primary evidence.

These findings remain research evidence. They are not Protocol fields,
registered vocabulary, method support, defaults, or implementation behavior.

## Holds preserved

| Hold       | Preserved unresolved question                                                  | Downstream work still blocked   |
| ---------- | ------------------------------------------------------------------------------ | ------------------------------- |
| `FND1-H04` | Primary non-clinical event and missing-outcome sources                         | General estimand vocabulary     |
| `FND1-H05` | Adversarial review of derived-summary rules on an expanded corpus              | Relation vocabulary and schema  |
| `FND1-H06` | Design research for units, timing, margins, transformations, and analysis sets | Public schema and fields        |
| `FND1-H07` | Attestation and provenance research for procedure-selection assurance          | Provenance field or reason code |
| `FND1-H08` | Domain-specific sensitivity-link research                                      | Sensitivity role and link       |

The later Studentized-range all-pairs procedure and unequal-size extension also
retain their own primary-source requirement before any dependent design or
method-support proposal advances.

## Current Research Gate state

Three of the eight recorded FND-1 holds are closed in narrowed form. Five holds
remain open, and the all-pairs successor-source requirement remains active.
Accordingly:

- the multiplicity primary-text follow-up is complete;
- the full FND-1 Research Gate remains open;
- no RFC design selection follows from this disposition; and
- any next FND-1 investigation is independently commissioned against one
  remaining hold.

## Explicit non-decisions

This disposition does not:

- add or select a Record field, schema, identifier, vocabulary, profile,
  interpretation bundle, or relation label;
- adopt the E/P/H/M/D/V decomposition as Protocol surface;
- select Holm, Benjamini-Hochberg, Dunnett, Tukey, or any later variant as a
  supported method or default;
- define a multiplicity family, error criterion, confidence procedure,
  refusal code, public check, API, or implementation contract;
- close `FND1-H04` through `FND1-H08`, the all-pairs successor-source
  requirement, the full FND-1 Research Gate, or any release gate; or
- affect Release 2, paired-t work, or t-family numerical-contract work.

## Reopen conditions

The accepted findings remain reusable only within the exact paper, variant,
theorem, assumption, attachment, and claim scopes recorded in the primary-text
result. Re-adjudication is needed if a dependent proposal uses a different
procedure variant, expands the dependence or design conditions, relies on a
later extension, or encounters primary evidence that materially conflicts with
the accepted findings.

FND-1 MULTIPLICITY HOLDS H01-H03 NARROWED AND CLOSED - FULL RESEARCH GATE OPEN - NOT PROTOCOL ADOPTION
