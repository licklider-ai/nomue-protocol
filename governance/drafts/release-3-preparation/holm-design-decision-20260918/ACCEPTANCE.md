# Successor acceptance matrix

Status: **44 planned cases; none executed by this design packet**. These local
locators are not permanent fixture IDs or evidence of candidate.4 behavior.
S/K/D/H/I/C/A mean the results defined in [DESIGN.md](DESIGN.md). Unless varied,
inputs are valid, correctly sealed, resource-safe, and caller context matches.
Every report case asserts exact scoped execution/outcome/reasons and a valid
output schema; every non-all-pass case asserts no forwarding. Refusals contain
no result sections. Independently authored expected outputs must precede execution.

| Case   | Perturbation                                                                              | Required observation                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| R3D-01 | Valid D0, matching context                                                                | All required rows pass; original-byte forwarding after successful cleanup                                                               |
| R3D-02 | Valid D0, mismatching valid context                                                       | D/H pass, C fail, A not_run; report, not refusal                                                                                        |
| R3D-03 | Invalid D0, matching context                                                              | D fail, H/A not_run, I/C evaluated                                                                                                      |
| R3D-04 | Invalid D0, mismatching valid context                                                     | D and C fail independently; H/A not_run                                                                                                 |
| R3D-05 | Valid D0, digest mismatch                                                                 | I fail, D/H/C evaluated, A not_run; reference uses independently computed stored-projection digest, never declared digest               |
| R3D-06 | Invalid D0 and digest mismatch                                                            | D and I fail independently; H/A not_run                                                                                                 |
| R3D-07 | Schema-invalid payload, valid reference/projection                                        | S fail; all dependent rows not_run; failure report                                                                                      |
| R3D-08 | Missing Record identity                                                                   | Refusal without placeholder or expected-context identity                                                                                |
| R3D-09 | Malformed/oversized revision identity                                                     | Refusal without truncation or normalization                                                                                             |
| R3D-10 | Missing/unsupported bundle                                                                | Routing/unsupported refusal; no guessed schema or D0 judgment                                                                           |
| R3D-11 | Invalid UTF-8/JSON                                                                        | Strict ingress refusal before routing                                                                                                   |
| R3D-12 | Duplicate JSON member                                                                     | Fixed pre-routing rejection, no digest or results                                                                                       |
| R3D-13 | Invalid Unicode scalar sequence                                                           | Fixed pre-routing rejection, no schema result                                                                                           |
| R3D-14 | Noncanonical whitespace, otherwise valid                                                  | K fail, D/H/C evaluated, I/A not_run with K identity and storage reason; reference hashes raw-preserving P(B), not JCS; no forwarding   |
| R3D-15 | Trailing newline, otherwise valid                                                         | K fail, I/A not_run with blocking identity/reason; reference hashes P(B) including newline; D/H/C evaluated, no forwarding              |
| R3D-16 | Expected context absent                                                                   | C error without outcome; D/H evaluated, A not_run                                                                                       |
| R3D-17 | Expected context unreadable or malformed within safe handling                             | C error without outcome; Record-local results retained                                                                                  |
| R3D-18 | Expected context syntactically valid but violates its schema                              | C error, not mismatch/pass or Record nonconformance                                                                                     |
| R3D-19 | Unrelated declaration/order differs only in caller context                                | C fail; complete context binding is not weakened to selected IDs                                                                        |
| R3D-20 | Schema fails and expected path would trigger a read                                       | No expected-file read; S fail, C not_run                                                                                                |
| R3D-21 | Selected Holm domain invalid (including negative-zero p)                                  | H fail, A not_run; no p normalization                                                                                                   |
| R3D-22 | Exact numerator differs but displayed bits collide                                        | A fail; display equality never masks exact disagreement                                                                                 |
| R3D-23 | Boundary/tie/subnormal fixed rational targets                                             | Exact expected numerators and nearest/even display agree; reuse pinned oracle scope                                                     |
| R3D-24 | Raw Record/expected size or parsed structural bound exceeded                              | Applicable resource refusal, not partially reported passes                                                                              |
| R3D-25 | Shared checkpoint time/heap budget exceeded after local passes                            | Refusal supersedes provisional results; no forwarding                                                                                   |
| R3D-26 | Outer deadline/cgroup/cancellation after inner success                                    | Source-bound refusal or documented no-output failure; no accepted success                                                               |
| R3D-27 | Unsupported host or failed setup/cleanup                                                  | Fail-closed lifecycle; no success receipt inferred from inner rows                                                                      |
| R3D-28 | Inject A pass despite a failed/error prerequisite                                         | Output validator rejects impossible graph state                                                                                         |
| R3D-29 | Inject constant S pass into schema-failure report                                         | Semantic output validation rejects fabricated conformance                                                                               |
| R3D-30 | Swap verification/conformance rows, duplicate or omit row                                 | Schema and graph validators reject malformed output                                                                                     |
| R3D-31 | Inject outcome into error/not_run, generic-only reason, missing/unrelated blocker or code | Reject; every not_run row names blocking prerequisite identities and carries their actual codes, with transitive union in defined order |
| R3D-32 | Submit old candidate.4 or unsupported legacy shape to successor                           | Exact version dispatch; no silent alias, reinterpretation or normalization                                                              |
| R3D-33 | Run existing Phase 1/2A bundles through final dispatcher                                  | Existing report/refusal/gating regressions unchanged                                                                                    |
| R3D-34 | Pre-routing refusal with different or absent Record bundles                               | Same invocation-selected refusal protocol; no bundle-selected refusal schema                                                            |
| R3D-35 | Fabricated self-derived expected context or rewritten forwarded bytes                     | Test detects missing independent input/binding; only original-byte all-pass forward permitted                                           |
| R3D-36 | Corrupt inner output, exceed output cap, or lose trusted completion                       | Discard inner output; fail closed, no invented successful report                                                                        |
| R3D-37 | Reportable S failure plus raw/parsed resource excess or late budget overrun               | Resource refusal wins; no S-failure report or provisional result escapes                                                                |
| R3D-38 | K failure crossed with D failure                                                          | K/D fail independently, H/I/A not_run with all applicable blocking identities/reasons; C evaluated                                      |
| R3D-39 | K failure crossed with valid-but-mismatching context                                      | K/C fail independently, D/H evaluated, I/A not_run with full blocking identities/reasons                                                |
| R3D-40 | Expected Record identity differs, then expected revision identity differs                 | Both valid-identifier variants produce C fail as mismatch, not error/refusal; D/H unaffected, A not_run                                 |
| R3D-41 | Legacy Phase 1/2A bundle plus expected-context argument                                   | Invocation-level unsupported-argument refusal; no silent ignore, C row or bundle interpretation; ordinary legacy call unchanged         |
| R3D-42 | Multiple independent blockers and a transitive H-not_run to A chain                       | Exact prerequisite identities and deterministic union of actual blocking reasons; no generic-only substitute or dropped cause           |
| R3D-43 | Canonicalization/projection/digest unavailable with otherwise reportable S or K failure   | Canonicalization refusal, no partial digest, no K-unavailable report state                                                              |
| R3D-44 | Corrupt canonicalizer/projection helper so only a reserialized digest matches declaration | No I pass from the reserialized route; stored-projection disagreement refuses; raw byte/reference and forwarding invariants checked     |

Expand parameterized cases at implementation: every numeric limit at below/equal/
above threshold, missing and invalid routing, each invalid identifier, and each
owned reason/prerequisite. These 44 rows do not replace wider existing envelope,
budget, numerical, mutation or real-host suites. For R3D-14/15/44, independently
author P(B) bytes and hashes, covering first/middle/last/absent integrity members,
nested lookalikes, escaped keys, non-ASCII strings and retained whitespace. Reuse
no candidate helper to generate those targets. Test admission and
local validation directly; do not make the candidate its own expectation oracle.

Preserve exact input bytes, independent expected context, expected output, runner
commit/tree, interpreter/dependency versions, commands, raw logs, hashes and
actual-host receipts. NOT_RUN and unsupported environments are not passing
evidence. Bind final conformance manifests to their permanent requirements only
in the coordinated adopted change; no new runtime qualification is claimed here.
