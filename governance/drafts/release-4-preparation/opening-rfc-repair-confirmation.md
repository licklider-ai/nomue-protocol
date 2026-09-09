# Release 4 opening proposal repair confirmation

Status: author-side confirmation commission; no verdict or opening authority.

## Fixed input

Repository: licklider-ai/nomue-protocol.
Locator: research/r4-opening-rfc-candidate; PR 249.
Repaired input: `60a7caf05ebb4812e367a48c70621f092c26fedb`.
Sole parent: `6adfc8a0080e30ce7634a5912c4dbb32e97ecd17`.
Tree: `d21f634c7964581fad2bbc1f3bacc4b6eb4f8135`.
Authority/main baseline: `0abdca8f822d0de3faf35f218f762a951fd75e9e`.

Parent-to-input changes exactly six paths: three modified Markdown files,
one added response and two added byte-identical review copies.

| Input path                                                             | Blob                                       |
| ---------------------------------------------------------------------- | ------------------------------------------ |
| governance/drafts/release-4-preparation/opening-rfc-candidate.md       | `4446e910882ea65e7ab968775185ad1898784b94` |
| governance/drafts/release-4-preparation/opening-rfc-review-response.md | `f54dfecebce61af841ebd26763abe34cc1af07e9` |
| governance/drafts/release-4-preparation/README.md                      | `e2d47a5bff278ad05344b69e765cd643e1182968` |
| governance/drafts/release-4-preparation/public-discussion-readiness.md | `7c6f6eefba0c522cef24f5497687997bacce46dd` |
| review-inputs/r4-opening-rfc/PR-251-REVIEW.md                          | `08879103e9311648a8d7f136624e16819d22e035` |
| review-inputs/r4-opening-rfc/PR-252-REVIEW.md                          | `d399550380de654fe107365349568791dc5b89da` |

This later delivery adds only this handoff and its README link. The input has
no link to this later file and is a complete independently valid tree.
Check pins before judging; report mismatches as INPUT_INCOMPLETE rather than
substituting live inputs. Check live main separately for intervening changes.

## Read and reconcile

Read AGENTS.md, its ordered governance prerequisites, RFC.md, stability tiers,
ID-POLICY and ADR-0032. Read both preserved reports in full and the entire
repaired candidate/response, not only the diff. The original report path in
both review commits is review-inputs/r4-opening-rfc/REVIEW-RESULT.md:

- PR 251: e4db34eb6561286eafb5873842d8df31e30c409b,
  blob 08879103e9311648a8d7f136624e16819d22e035.
- PR 252: fdc5364a53293ce12a837f833dd23465d2fd6fcb,
  blob d399550380de654fe107365349568791dc5b89da.

Both copies are preserved because the same original pathname would collide.
Do not modify either original report or conflate their independence limits.
The response is author adjudication, not an independent correction of a reviewer.

## Confirmation questions

1. Account separately for every finding: PR 252 S-1 through S-9 and N-1 through
   N-6; PR 251 S-1/S-2 and N-1/N-2. Confirm repairs or report remaining defects,
   including newly introduced ones. Severity and opening effect are separate.
2. Verify all four authoritative meta-schema changes, concrete identity fields,
   capability-ID grammar, legacy preservation, version/snapshot treatment,
   optional/new-bundle-required Contract pin, fixtures and tooling coupling.
   Do not require unused CI, canonicalization, attestation or scope extensions.
3. Verify distinct checks and existing propagation are preserved rather than
   reopened. Reconcile VERIFY-0020's actual Welch-qualified scope, VERIFY-0021's
   general clause versus bundle disposition, and VERIFY-0026's squared-t path.
   Check successor no-dereference, parsed binary64, provenance and security
   bindings without widening an existing CORE clause by implication.
4. Assess the new choices themselves: boolean declaration and false/missing
   distinction; finite/safe count/df bounds; strict positive declared SSE with
   required F/tails; exact-zero observed SSE despite fabricated declarations;
   signed/non-negative/range rules; valid orientation changes versus refusals.
   Classification of tiny positive/uncertain SSE and actual numerical graphs
   remains held. Does any proposed reason or conformance/admissibility boundary
   conflict with an existing invariant?
5. Verify result-scoped quantity/discriminator keys are unambiguous and complete,
   no reused closed ITGC common definition is silently widened, all guarantee
   keys are explicit, and incomplete execution cannot emit a numerical success.
   Check PCS-0001 versus new disjoint payload surfaces and lifecycle carrier.
6. Reassess the one-owner allocation, all proposed IDs, highest tier and RFC draft
   completeness. New structural choices are reviewable prose, not implemented
   schemas. If remaining text is decision-bearing before opening, name it.
   Do not infer full numerical support from a repaired inventory.
7. Check source/model/formula preservation and Release 3 interface pins. No PDF
   acquisition or new numerical investigation is required unless a concrete
   new retained premise needs it; do not certify copies not received. Preserve
   accepted source/derivation split, source-copy acceptance and staged wider
   holds. Yates copies are not relied upon.
8. Return separate R4-P1 through P6, preparation, numerical-support, tier and
   public-opening dispositions. An author repair or historic GO does not close
   opening. State whether remaining independent review/decision conditions
   are met, with actual independence limitations.

## Verification

Validate fixed input and final review delivery: format, Markdown lint,
typecheck, validate, generated-drift and git diff --check. Direct node/tsx
entry points are allowed; report actual invocations and any failure.
No full numerical/runtime suite is required for preserved numerical artifacts.

Verify exact preservation of both copied reviews, all prior accepted reviews,
the mathematical formula fence and numerical probes/results, the original
opening handoff and all authoritative/Release 3 artifacts. Compare parent-to-input
paths, not just author counts. PR 251's in-memory structural probe is optional
unless needed for a remaining finding; it is not a candidate implementation test.

## Delivery

Base a fresh review branch on this handoff's delivery commit, pinning that
delivery in your record. Add one review record at a previously unused path
under review-inputs/r4-opening-rfc-repair/, with a neutral reviewer-chosen
subdirectory if another reviewer has used the same path. This avoids repeating
the two-report pathname collision. Do not overwrite or merge other reviews.

State actual reviewer/model/provider/context metadata if available, prior
involvement, source access and independence limits. Same-session repair
confirmation may be reported as such; it is not a second independent scientific
investigator. Do not infer human independence from model separation.

Push and create a draft PR targeting research/r4-opening-rfc-candidate.
Return its URL, commit, tree, review blob, checks, findings and opening
disposition. Do not edit candidate/spec/registry/numerical/source artifacts,
allocate identifiers, merge, ratify or start a public discussion clock.
An eventual opening action separately records its exact proposal, URL,
timestamp, highest tier and earliest decision time.

Authoring assistance: OpenAI Codex in the existing authoring context.
