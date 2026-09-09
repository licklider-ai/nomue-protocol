# Release 4 opening proposal: response to PR 251 and PR 252

Status: author-side repair and reconciliation; confirmation pending.
Date: 2026-09-09. Public opening remains NOT_READY.

## Input and preservation

Both reports were read in full, including PR 251's structural counterexample.
Their original one-file commits have the same parent,
6adfc8a0080e30ce7634a5912c4dbb32e97ecd17, and the same original pathname,
review-inputs/r4-opening-rfc/REVIEW-RESULT.md. Merging both unchanged at that
path would conflict; neither is treated as replacing the other.

| Review | Commit                                     | Blob                                       | Preserved copy under review-inputs/r4-opening-rfc/ |
| ------ | ------------------------------------------ | ------------------------------------------ | -------------------------------------------------- |
| PR 251 | `e4db34eb6561286eafb5873842d8df31e30c409b` | `08879103e9311648a8d7f136624e16819d22e035` | PR-251-REVIEW.md                                   |
| PR 252 | `fdc5364a53293ce12a837f833dd23465d2fd6fcb` | `d399550380de654fe107365349568791dc5b89da` | PR-252-REVIEW.md                                   |

Copies retain exact original bytes and blob IDs, including each review's
independence disclosures, conclusions and any disputed observations.
Original commits/branches are retained. Copying is evidence intake, not
steward acceptance, merge approval or independent confirmation.

The reviewed candidate is 98187a14a48b38c9f2fb41fdd18060d53966a660; its delivery
is the parent above. Main at retrieval remains
0abdca8f822d0de3faf35f218f762a951fd75e9e. No new source, numerical algorithm,
statistical guarantee or Release 3 dependency is introduced by this repair.

## Reconciliation of review judgments

Both reports require four authoritative registry meta-schema changes and
preservation of distinct admissibility/computability checks and failed-
admissibility propagation. Both find the retained science within accepted
evidence, with no new primary-source prerequisite.

PR 252 requires additional draft-text decisions that PR 251 classifies more
leniently. This repair makes those decisions concrete instead of treating the
lower severity as permission to omit them. Their correctness remains subject
to confirmation; neither report previously reviewed these exact choices.

Two points require explicit adjudication against existing artifacts:

- PR 252 treats VERIFY-0020 as automatically governing BTF. Its owning section
  and registry note restrict it to welch-recompute 0.2.1-draft.1, as PR 251
  observes. Preserve that historical rule without extension; BTF endpoint
  projection/comparison stays explicit check-owned work. Preserve the general
  finite-statistic underflow non-zero-truth clause VERIFY-0021 while retaining
  its Welch bundle disposition and VERIFY-0026 squared-t path as specific.
- PR 251 accepts separate envelope PCS-0014 as coherent; PR 252 identifies the
  actual PCS-0001 precedent of one field-identical envelope across bundles.
  Adopt that precedent: extend PCS-0001 applicability and schema_refs, use
  PCS-0014/0015 for disjoint BTF payload portions and PCS-0016 for the report.

PR 252's omission count is internally inconsistent: Section 6 includes grouped
IDs and Section 13 labels six CORE while enumerating more. No count is used
as evidence of coverage. The repaired table names every relevant ID explicitly
and distinguishes global constraints, phase-qualified successor bindings,
historical check-specific rules and implementation precedents.

PR 251 discloses OpenAI author/provider overlap and project-summary context.
PR 252 discloses a separate Anthropic model/provider/context. This response
preserves those distinct limits and does not infer human independence from
model separation. It is written in the existing OpenAI authoring context.

## Complete finding disposition

All entries below mean AUTHOR_REPAIRED, CONFIRMATION_PENDING, not CLOSED.

| Finding                   | Concrete response in opening-rfc-candidate.md                                                                                                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 252 S-1; 251 S-1          | Authoritative registry grammar and coupling names four meta-schemas, exact field families, snapshot/version treatment, fixtures, report-local definitions, schema navigation, loader/cross-check/resources and lifecycle integration. No unused canonicalization, attestation, CI-method or scope-kind grammar is widened. |
| 252 S-2; 251 S-2; 251 N-1 | Additional existing-ID treatment adds numeric, tolerance, separation, propagation, non-claim, lifecycle, provenance and snapshot owners, with phase qualifications. New capability bindings are explicit.                                                                                                                  |
| 252 S-3                   | PROFILE-BTF-0002 now owns only BTF marginal-model/multiplicity/quantization/admission limits; VERIFY-0029 owns keyed BTF evidence scope. Generic CORE meanings retain their existing owners.                                                                                                                               |
| 252 S-4; 251 S-2          | Distinct checks and failed-admissibility blocking are fixed by VERIFY-0013/0017. Only concrete new graph edges, in-rule ordering and numeric reasons remain open.                                                                                                                                                          |
| 252 S-5; 251 N-1          | CORE-0020 explicitly prohibits Contract dereference; VERIFY-0030 binds exact targets to finite parsed binary64 inputs; no edits to existing CORE clauses.                                                                                                                                                                  |
| 252 S-6; 251 N-2          | Required boolean assertion, true/false treatment and missing/wrong-type conformance failure are stated; deliberate difference from ITGC structured declarations and inability to detect undeclared handling are disclosed.                                                                                                 |
| 252 S-7                   | Required finite result fields and strictly positive declared SSE exclude a truthful exact-zero complete result. Forged positive declarations do not bypass observation-based zero-SSE computability failure. Near-zero numerical classification stays held.                                                                |
| 252 S-8                   | PCS-0001 carries the field-identical envelope additively; 0014/0015 are disjoint payload portions; 0016 carries the new report.                                                                                                                                                                                            |
| 252 S-9; 251 N-2          | Existing result scope, local result_id, unique quantity/discriminator keys, no new scope_kind, new local report definitions and no changed historical common schema.                                                                                                                                                       |
| 252 N-1                   | Explicit A/B and 0/1 orientation; level IDs unique within each factor only.                                                                                                                                                                                                                                                |
| 252 N-2                   | Five existing report non-claim keys retained; three new constant not_asserted keys explicitly added.                                                                                                                                                                                                                       |
| 252 N-3                   | Finite/safe-integer types, exact count/df comparison, non-negative SS/F, positive declared SSE, p in [0,1], and representational count ceiling stated independently of runtime resources.                                                                                                                                  |
| 252 N-4                   | Declared-design admissibility is the sole eligibility carrier, with normative mapping proposed under CORE-0022 and reference implementation only as implementation.                                                                                                                                                        |
| 252 N-5                   | Candidate reason names and applicability stated; malformed structure uses existing conformance failure; orientation changes are valid transformations, not refusal reasons.                                                                                                                                                |
| 252 N-6                   | Optional Contract field in bundle meta-schema, required for BTF and equal to analysis.contract_id; historical entries unchanged.                                                                                                                                                                                           |

The supplied reports have 11 SHOULD-FIX entries and 8 NICE-TO-HAVE entries
across the two reviews, with overlap; the table accounts for every label.
It does not imply 19 independent defects.

## Author verification

PR 251 Appendix A was extracted and rerun against the unchanged actual
meta-schemas: four baseline registries valid, four diagnostic mutations
rejected, nine pattern errors. Output SHA-256 reproduced exactly:
`820c2d92ccb94514922b75fad2eb66f0ddf37a41bf055e3a81c726cd6d659d75`.
This confirms the existing incompatibility, not implementation of its repair.
The proposed count ceiling and df maximum were checked with integer arithmetic.

On the repaired input, repository-wide Prettier, Markdown lint (403 files,
zero issues), typecheck, direct node/tsx validate, generated-drift check
(19 files) and git diff --check passed. Source/numerical runtime suites were
not rerun because their artifacts and mathematical target formulas are unchanged.
The two copied review blobs match their originals exactly. A handoff delivered
after this repaired input is checked separately and names its extra changes.

## Scope and confirmation boundary

Changes are informative Markdown only: candidate, navigation/readiness, this
response and exact review copies. A later handoff pins the repaired input.
All authoritative files, numerical probes/results, accepted normal-model and
source-copy reviews, original handoff and Release 3 files are preserved.

Review the new representation choices as well as whether the old wording was
removed. Reassess highest tier (proposed STABLE-INTENT / at least 30 days),
P5 completeness and P6 opening separately. Reviewers need not acquire more
PDFs unless a specific newly retained scientific premise lacks evidence.
No record here starts a clock, supplies numerical support, issues an ID,
merges a PR or makes a steward decision.

Authoring assistance: OpenAI Codex in the existing authoring context.
