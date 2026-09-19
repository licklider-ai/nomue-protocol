# Release 2 evidence and disposition index

Status: **Informative index; no evidence item is an adoption decision**.

## Bounded review receipts

| Decision area                 | Review receipt                                                                     | Result                                                                                   | What it establishes                                                                                                          | What it does not establish                                       |
| ----------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| D2-D4 structure               | `review-inputs/r2-d2-d4-structural-candidate-surface/REVIEW-RESULT.md`             | GO; 0 BLOCKER, 0 SHOULD-FIX, 1 NICE-TO-HAVE (`ba7f2e1052d6b5ccd71d8f06d029c61cc854cd04`) | The exact candidate namespaces, identifiers, schemas, fixtures, dispatch matrix, and surface map are coherent review inputs. | Issuance of IDs, schemas, Checks, Bundles, or Release 2 support. |
| D5 aggregate readiness        | `review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md`                      | GO; no findings (`35ab094c9106903e6b8e87a144cfbd8cd52ae124`)                             | The exact D5 package is complete enough for a final decision review.                                                         | Final numerical selection, RFC closure, or Release 2 completion. |
| D5 Student-t tail             | `review-inputs/r2-d5-m2-tail-numerical-closure/REVIEW-RESULT.md`                   | GO (`764674bdd3f72ac7774ad456854e8e3a05183765`)                                          | The bounded unissued tail-numerical candidate milestone.                                                                     | Platform, runtime, final reason codes, or support selection.     |
| D5 fixed-95 interval          | `review-inputs/r2-d5-m3-confidence-interval-closure/REVIEW-RESULT.md`              | GO (`171f18bd79a015b0680cc9afd524b7352be1bbe5`)                                          | The bounded unissued fixed-95 interval candidate milestone.                                                                  | A supported domain, tolerance, Public Check, or Bundle.          |
| D5 scope/resources            | `review-inputs/r2-d5-group-1-scope-resource-closure/REVIEW-RESULT.md`              | GO (`897bd5b0ff0d9723fd6a319fc8c1a3b9d586b186`)                                          | The candidate scope/resource selection record.                                                                               | A supported runtime resource bound.                              |
| D5 runtime numerical contract | `review-inputs/r2-d5-group-2-runtime-numerical-contract-closure/REVIEW-RESULT.md`  | GO (`ef62d8a047026eb7226a0fa38ef27dbd1a49b017`)                                          | The candidate full-trace numerical-contract selection.                                                                       | Activation of runtime support or a final tolerance.              |
| D5 execution selection        | `review-inputs/r2-d5-group-3-supported-execution-closure/REVIEW-RESULT.md`         | GO (`32549c855a3ecbdfb8761a617b1a3753cb7caa01`)                                          | The candidate supported-execution selection milestone.                                                                       | A registered supported platform or execution tuple.              |
| D5 reason inventory           | `review-inputs/r2-d5-group-4-final-reason-code-inventory-closure/REVIEW-RESULT.md` | GO (`8909d31cce3d36303e403103f459b10127e87a1b`)                                          | Completeness of the unissued candidate reason-code inventory.                                                                | Registration of those reason codes.                              |

## Required final selection record for D5

The final D5 record must select or explicitly defer each item below. A reference to
an earlier candidate review is insufficient when the item is still unselected.

That record is prepared in [D5 final selection record](D5-FINAL-SELECTION-RECORD.md),
which states the exact candidate selection put forward for each item, its evidence
identity, and its residual gap. It records one open hold: the exact-head independent
numerical review. It is decision input, not a disposition.

- supported input and output domain, including sample-size and degrees-of-freedom
  boundaries;
- supported execution tuple and controlled-process enforcement;
- quantity-specific numerical error and comparison tolerance policy;
- selected Student-t tail and fixed-95 critical-value table identities;
- subnormal, non-finite, nonrepresentable, and certificate-failure ordering;
- final scoped reason-code set and report propagation; and
- corpus coverage versus the supported-domain claim.
- reproducible environment record for the independent oracle corpus;
- boundary and metamorphic tests;
- separate maximum-error ledgers for algebraic quantities, p-values, and
  confidence-interval endpoints; and
- numerical-review disposition independent of the implementation-authoring
  context.

## Receipt identity and later drift

The receipt heads in the table are decision inputs, not substitutes for an
exact-target confirmation. From the D2-D4 reviewed head `ba7f2e10` to `main` at
the packet-review baseline `0c7a685`, the Release 2 candidate delta was chronology
text only in `release-2-candidate/README.md` and `numerical/README.md` (+19). From
the D5 readiness head `35ab094` to that same baseline, the delta was those two
chronology files plus the D2-D4 review protocol (+322). No candidate manifest,
schema, fixture, migration matrix, public-surface impact table, or numerical
artifact changed in either comparison.

After those receipts, PR #351 (`0536b66`) changed the Release 1 reference kernel's
df=1 Cauchy center and advanced `reference/SOURCE-PIN.json`. The Release 2 candidate
does not reference that kernel, so its candidate evidence is unaffected. Any later
authoritative landing must run Release 1 compatibility evidence against the
post-#351 `main` and record the resulting exact target.

## Release 1 preservation evidence

The authoritative landing must rerun and retain the historical evidence required by
the Release 2 ratification package: Release 1 exact dispatch, historical schemas,
canonical inputs, pinned conformance outcomes, and verifier/report behavior. The
candidate migration matrix demonstrates the intended compatibility treatment; it is
not the post-landing proof.
