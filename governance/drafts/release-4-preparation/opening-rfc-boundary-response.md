# Release 4 representation boundary response

Status: author-side repair; confirmation pending; public opening NOT_READY.
Date: 2026-09-09.

PR 257 was read in full at commit
`901733a551b560aef544191d937b517f2f87c896`, tree
`e9a821ab32f79d9492a8325db6f141b5c2632ad9`, review blob
`d114c65903c97570dc157a5fc1a80314301134c5`.
Its sole parent is the candidate delivery
`40e723d30c1e235591b0795d8c4535639ff4fc32`.
The review is preserved at its original path:
review-inputs/r4-opening-rfc-repair/assessment-20260909/REVIEW-RESULT.md.

The report confirms the eleven prior SHOULD-FIX repairs and accounts for all
nineteen prior labels, while identifying C-S1 and C-N1. Its same-conversation
OpenAI confirmation limits are preserved; this response supplies no new
independent verdict or source certification.

| Finding            | Author response                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C-S1, SHOULD-FIX   | Required identity/association failures now belong to semantic conformance, reported only in conformance, with explicit structural/semantic violation location and reason. All verification checks, including integrity, are gated on complete conformance success. A false model assertion, repeated unit and unsupported actual cell counts belong to later design admissibility. |
| C-N1, NICE-TO-HAVE | The new non-numerical admissibility carrier permits completed/pass or completed/fail only. Error/not_run/absence map to not_evaluated; completed/indeterminate is outside this carrier's check/report domain, not coerced to ineligible. Other checks retain their permitted indeterminate outcomes.                                                                               |

The D1/D2 witness has one outcome: semantic conformance fail; integrity and
admissibility not_run; eligibility not_evaluated. Duplicate observation IDs
break identity, whereas distinct observations sharing a unit ID are
representable but unsupported. Proposed reasons now explicitly identify their
judgment and propagation class. The candidate adds the corresponding
conformance, propagation, report and carrier-domain fixture obligations.

PROFILE-BTF-0004 remains the new representation owner; VERIFY-0032 binds
BTF conformance gating and carrier domain, and CORE-0022 binds its lifecycle
projection. Existing VERIFY-0005/0010/0013/0017 and lifecycle meanings are not
rewritten. No state-invariant registry/meta-schema change is needed because
no new entry or BTF reference is introduced there. Proposed highest tier
remains STABLE-INTENT / at least 30 days, subject to confirmation.

Earlier response tables are historical author dispositions. This record and
the repaired candidate supersede their local-reference admissibility wording.
Prior reviews, numerical artifacts, formula fence, source evidence, original
handoffs and Release 3 files are preserved. The only changes are informative
candidate/navigation text, this response and intake of the exact PR 257 review.

The next step is a bounded confirmation of C-S1/C-N1, including regression
against the previously confirmed choices and an explicit P5/P6/opening
disposition. No additional PDF or numerical algorithm is needed.
Author repair is not closure or opening approval. No merge, identifier
issuance, discussion clock or numerical support is created here.

Authoring assistance: OpenAI Codex in the existing authoring context.
