# Release 2 evidence and disposition index

Status: **Informative index; no evidence item is an adoption decision**.

## Bounded review receipts

| Decision area                 | Review receipt                                                             | Result                      | What it establishes                                                                                                          | What it does not establish                                       |
| ----------------------------- | -------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| D2-D4 structure               | `review-inputs/r2-d2-d4-structural-candidate-surface/REVIEW-RESULT.md`     | GO; 0 BLOCKER, 0 SHOULD-FIX | The exact candidate namespaces, identifiers, schemas, fixtures, dispatch matrix, and surface map are coherent review inputs. | Issuance of IDs, schemas, Checks, Bundles, or Release 2 support. |
| D5 aggregate readiness        | `review-inputs/r2-d5-final-review-readiness/REVIEW-RESULT.md`              | GO; no findings             | The exact D5 package is complete enough for a final decision review.                                                         | Final numerical selection, RFC closure, or Release 2 completion. |
| D5 Student-t tail             | `review-inputs/r2-d5-m2-tail-numerical-closure/REVIEW-RESULT.md`           | GO                          | The bounded unissued tail-numerical candidate milestone.                                                                     | Platform, runtime, final reason codes, or support selection.     |
| D5 fixed-95 interval          | `review-inputs/r2-d5-m3-confidence-interval-closure/REVIEW-RESULT.md`      | GO                          | The bounded unissued fixed-95 interval candidate milestone.                                                                  | A supported domain, tolerance, Public Check, or Bundle.          |
| D5 scope/resources            | `review-inputs/r2-d5-group-1-scope-resource-closure/REVIEW-RESULT.md`      | GO                          | The candidate scope/resource selection record.                                                                               | A supported runtime resource bound.                              |
| D5 runtime numerical contract | `review-inputs/r2-d5-group-2-runtime-numerical-contract/REVIEW-RESULT.md`  | GO                          | The candidate full-trace numerical-contract selection.                                                                       | Activation of runtime support or a final tolerance.              |
| D5 execution selection        | `review-inputs/r2-d5-group-3-supported-execution-closure/REVIEW-RESULT.md` | GO                          | The candidate supported-execution selection milestone.                                                                       | A registered supported platform or execution tuple.              |
| D5 reason inventory           | `review-inputs/r2-d5-group-4-final-reason-code-inventory/REVIEW-RESULT.md` | GO                          | Completeness of the unissued candidate reason-code inventory.                                                                | Registration of those reason codes.                              |

## Required final selection record for D5

The final D5 record must select or explicitly defer each item below. A reference to
an earlier candidate review is insufficient when the item is still unselected.

- supported input and output domain, including sample-size and degrees-of-freedom
  boundaries;
- supported execution tuple and controlled-process enforcement;
- quantity-specific numerical error and comparison tolerance policy;
- selected Student-t tail and fixed-95 critical-value table identities;
- subnormal, non-finite, nonrepresentable, and certificate-failure ordering;
- final scoped reason-code set and report propagation; and
- corpus coverage versus the supported-domain claim.

## Release 1 preservation evidence

The authoritative landing must rerun and retain the historical evidence required by
the Release 2 ratification package: Release 1 exact dispatch, historical schemas,
canonical inputs, pinned conformance outcomes, and verifier/report behavior. The
candidate migration matrix demonstrates the intended compatibility treatment; it is
not the post-landing proof.
