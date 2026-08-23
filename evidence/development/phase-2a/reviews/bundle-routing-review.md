# Targeted Independent Review Record - Bundle-Independent Routing Repair (ADR-0017)

- Scope: the post-close Phase 2A repair that removed the reference
  verifier's first-registered-bundle fallback and introduced
  bundle-independent routing (routing envelope, routing refusals, refusal
  schema 0.2.0-draft.2, requirements NRS-VERSION-0007/0008, routing fixture
  family, registry-order invariance).
- Reviewer: independent adversarial reviewer context (AI subagent),
  separate from the implementing context; read-and-execute only. Executed
  42 adversarial routing probes against the live verifier (prototype
  pollution shapes, duplicate JSON keys, homoglyph/case/percent-encoded
  and boundary-length identifiers, non-object roots), validated every
  emitted refusal against the draft.2 schema in-process, diffed the
  draft.1 schema and fixture pins against commit a02377f, and replayed the
  suites.
- First pass result: **0 BLOCKER, 1 MAJOR, 4 MINOR.**
- Verification pass after fixes: **0 BLOCKER, 0 MAJOR, 3 residual
  documented MINORs.** Verdict: "the bundle-independent routing repair is
  correct, complete, and honestly evidenced; I have no objection to
  closing it."

## Disposition of findings

| Finding                                                                                                                                                                                                   | Severity | Disposition                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| M-1: ROUTE-008's seeded shuffle was the identity permutation for 2-4 registry entries, so the fixture compared the canonical order against itself (vacuous; ROUTE-007's reversal carried the whole proof) | MAJOR    | **Fixed and re-verified by execution.** `deterministicShuffle` rotates by one position whenever Fisher-Yates lands on identity, so the permutation always differs from the input order for length >= 2 while staying deterministic. The reviewer executed n=2..6 (all non-identity, all valid permutations) and re-ran ROUTE-008's pinned input against the genuinely permuted registry (`identical: true`, 9 probes). A new unit test asserts non-identity for n=2..6, so a future seed regression cannot silently reintroduce vacuousness. |
| m-1: dead `urn:nomue:unidentified:bundle` fallback constants survived in both bundle pipelines (unreachable, but fabrication residue)                                                                     | MINOR    | **Fixed.** Both pipelines now throw if invoked without a routed string bundle identifier (surfacing as a schema-valid `internal_error` refusal, exit 5, if ever reached); repo-wide grep finds zero remaining occurrences of the bundle sentinel; the README placeholder note now records that no bundle sentinel exists.                                                                                                                                                                                                                    |
| m-2: duplicate `interpretation_bundle_id` JSON members routed by unspecified parser semantics                                                                                                             | MINOR    | **Fixed (documented) / residual open.** The dispatch spec now states that duplicate members are not valid JSON interchange, that the reference verifier follows ECMAScript last-member-wins semantics, and that a future revision may refuse duplicates outright; the "nothing else is inspected" wording was corrected to acknowledge pre-dispatch resource-limit traversal. Residual: the semantics are informative, not normative, for independent verifiers - flagged in-repo as the eventual normative fix.                             |
| m-3: the positional-access half of the bundle-routing audit was narrow textual heuristics presented as broader coverage                                                                                   | MINOR    | **Fixed (honesty + coverage) / residual open.** The regex now also catches `entries.at(0)`; the audit comment and ADR-0017 explicitly frame the audit as a lint over named historical patterns, with the behavioral proof carried by the routing fixture suite and the registry surface structurally closed by the meta-schema (verified by the reviewer against mutated registries in memory). Residual: the lint remains evadable by construction and is labeled as such.                                                                  |
| m-4: `canonicalize`/`digest` CLI subcommands bypass routing entirely                                                                                                                                      | MINOR    | **Fixed (recorded assumption) / residual open.** Safe today because both registered bundles pin the identical canonicalization and digest scope; the README now records this deliberate assumption and that a future bundle pinning a different canonicalization requires routing first.                                                                                                                                                                                                                                                     |

## Clean dimensions (first pass, all verified by probes)

Default bundle completely gone (no reachable path from any bundle-less,
non-string, or unregistered input to any bundle pipeline across 42 probes);
no registry-order dependence in code (ROUTE-007 a real discriminator);
exact-identifier-only dispatch (trailing space, case, percent-encoding,
homoglyph, NFD variants all refused); every refusal schema-valid against
draft.2 with the `declared_bundle_id` omission discipline intact
(`isDeclarableBundleId` exactly mirrors the schema's uri constraints);
draft.1 refusal schema byte-identical to a02377f with machine-recorded
supersession; Phase 1 valid outputs unchanged (only the documented
B-002..B-006 verifier version-string pin refresh; no semantic projection
changed except the removal of S-001's own defective-fallback projection);
Phase 2A valid outputs unchanged (38 fixtures + oracle green); S-001
correction byte-preserving (input sha256 pinned and asserted) and honestly
narrated; requirements NRS-VERSION-0005/0007/0008 match the
implementation; reason codes registered consistently; no document presents
the fallback as current behavior; all suites green on both passes.

## Residual accepted MINORs at close (documented in-repo, no open defects)

1. Duplicate-key routing semantics are informative pending a future
   normative refusal (spec/versioning/multi-bundle-dispatch.md).
2. The positional-access audit is an evadable lint by design, labeled as
   such (ADR-0017, audits.ts); fixtures and the closed meta-schema carry
   the proof.
3. `canonicalize`/`digest` bypass routing under the shared-canonicalization
   invariant, recorded as a deliberate assumption
   (reference/verifier/README.md).

Blocker count at close: 0; major count at close: 0.
