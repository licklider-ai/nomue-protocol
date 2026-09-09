# Release 4 assembled opening review handoff

Status: author-side commission for independent pre-opening review.
This handoff is delivered after the fixed input; it supplies no verdict.

## Fixed input and retrieval

Repository: licklider-ai/nomue-protocol.
Branch locator: research/r4-opening-rfc-candidate (mutable; use pins below).
Review input: `98187a14a48b38c9f2fb41fdd18060d53966a660`.
Sole parent/main baseline: `0abdca8f822d0de3faf35f218f762a951fd75e9e`.
Input tree: `2f9286c107b64b59940269af98122d469639f0de`.
Parent-to-input changes: five Markdown files in this directory, one new
candidate and four navigation/status updates. No authoritative, numerical,
source-review or Release 3 artifact changes.

| Path relative to this directory | Input blob                                 |
| ------------------------------- | ------------------------------------------ |
| opening-rfc-candidate.md        | `68d3660f64cf299a90cb4ae19f802e7707c15412` |
| README.md                       | `b6aa21be9abea08cc99e7f80dbd0d7fc72866952` |
| public-discussion-readiness.md  | `8b2e2c84fd778a2ab212225d90c555b8c2864ffa` |
| rfc-preparation-draft.md        | `0d1dffdf17a9348ac19b63a2648bf769c3057db7` |
| rfc-impact-inventory.md         | `c262f7200c6ed650df88847597d01c97a406ed61` |

Delivery adds this file and a README link only. Review the five files at the
input commit; validate both that complete input tree and the delivery tree.
The fixed input contains no link to the later handoff. Report any pin mismatch
as INPUT_INCOMPLETE rather than silently switching inputs.

Read AGENTS.md and its ordered governance prerequisites, then RFC.md's draft,
research and public-discussion gates, stability-tiers.yaml, ID-POLICY.md,
ADR-0032, the authority manifest, requirements and public-surface registries.
Check current main for intervening changes separately from fixed-input findings.

## Accepted evidence to preserve and understand

At the parent baseline, inspect the normal-model steward acceptance record,
source result, opening-scope proposal and explicit probability derivation.
Confirm the following preserved review blobs from repository paths:

| Path                                                         | Blob                                       |
| ------------------------------------------------------------ | ------------------------------------------ |
| review-inputs/r4-opening-preparation/REVIEW-RESULT.md        | `13fb1e0fb63c96cd15efa525f3ced75c59a014c1` |
| review-inputs/r4-normal-model-source/REVIEW-RESULT.md        | `9efcc51a4978b3b539de4424d08c7a265c90e1ab` |
| review-inputs/r4-normal-model-source-repair/REVIEW-RESULT.md | `94d21ac71834043bcceb6978588a01c927f8eeea` |

Acceptance records a bounded paper/derivation evidence split, not a claim that
Tian/Styan proves the probability facts it cites. This commission asks for an
assembled opening decision, not a duplicate source review by default. If a new
retained claim exceeds accepted evidence, name it and its missing support.
Do not manufacture a requirement to obtain every historical paper.
Do not certify a supplied PDF you have not received or inspected.

Yates copies were subsequently discussed in the authoring conversation but are
not used as evidence in this candidate. The receipt/review obligation before
their use remains. S1/S2/P1/S3/S4/S6 and wider S5 are staged, not globally closed.
The accepted NIST/LAPACK provided-copy status is not reopened by this commission.

## Adversarial review questions

1. Judge whether the retained model and exact formulas match the accepted
   scientific scope. Check factor/level orientation, full interaction, sample
   versus population contrasts, nuisance-unrestricted individual nulls, shared
   denominator, finite input versus exact SSE=0, and quantization/admission
   non-claims. Identify any new statistical assertion needing source review.
2. Assess the proposed clauses as concrete draft text, not merely an inventory.
   Verify one-owner Contract/Profile/schema/check allocation and the additional
   CORE-0021 digest binding. Check every existing-ID crosswalk against its actual
   owning clause, including phase qualifiers. Find missing requirements rather
   than accepting the listed inventory as exhaustive.
3. Assess the proposed payload's local references, factor/cell uniqueness,
   declaration ownership, direct Contract binding and result scoping.
   Check ID grammar, proposed namespace and number availability, version naming,
   exact bundle treatment, and absence of automatic legacy aliases.
   The proposed schemas are not implemented: decide whether this level of exact
   artifact change satisfies the RFC draft gate or name concrete missing text.
4. Test the claim of additive compatibility: old Record/report constants and
   payloads, strict-input priority, digest coverage, canonicalization identity,
   scoped outcomes, refusal shape, bundle dispatch and historical conformance.
   Inspect actual schemas and public surfaces; do not infer compatibility from
   unchanged files alone. Identify required coupled changes or new owners.
5. Decide highest affected tier independently. The author proposes STABLE-INTENT
   and at least 30 calendar days, not an active clock. If existing CORE meaning
   changes, identify it and require the appropriate tier/window. Evaluate whether
   all proposed surface classifications have adequate justification.
6. Evaluate the explicit numerical implementation holds individually against
   opening, decision and implementation gates. An unset algorithm, projection,
   tolerance, supported domain, result-number constraint or check identity is not
   supported execution. Decide whether any is decision-bearing before opening;
   do not waive a hold merely because the candidate labels it implementation.
   Do not require finished implementation solely because opening is requested.
7. Reconcile Release 3 using the pinned main-tree README and readiness audit
   specified in the candidate, and actual shared interfaces. Do not claim all
   research branches have been audited. Report intervening main changes and any
   real dependency requiring another review.
8. Give a separate disposition for R4-P1 through P6, retained source claims,
   numerical support and public opening. Distinguish preparation GO from opening
   GO. A bounded historical GO and passing tooling do not decide this review.

## Verification and delivery

Run format, Markdown lint, typecheck, repository validate, generated-drift check
and git diff --check on the input and review delivery. Direct
node --import tsx tooling/src/validate.ts and tooling/src/generate.ts --check
are equivalent fallbacks for the tsx wrapper's IPC limitation; disclose which ran.
No numerical rerun is required unless it resolves a concrete finding about this
new proposal. Expected-value evidence cannot come from reference code alone.

Create review-inputs/r4-opening-rfc/REVIEW-RESULT.md only, on a fresh review
branch based on the delivery branch. Report date, inspected pins, actual tools,
source access, model/provider/context metadata as available, independence limits,
checks, prioritized findings and per-gate dispositions. Unknown metadata stays
unknown; model separation does not establish human-investigator independence.
Do not edit accepted reviews, specs, registries, source PDFs or numerical inputs.

Push the review and create a draft PR targeting
research/r4-opening-rfc-candidate. Keep review claims and concrete requested
repairs distinct. Do not merge, issue identifiers, ratify, start a discussion
clock or change Release 3. Return the PR URL, commit and review blob.

Author: OpenAI Codex in the existing authoring context. This handoff and its
candidate are author-side proposals, not an independent review.
