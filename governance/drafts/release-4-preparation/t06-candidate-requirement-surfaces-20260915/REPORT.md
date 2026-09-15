# T06 report

Status: **UNISSUED CANDIDATE**.

## Executive assessment

T06 CANDIDATE REQUIREMENT/SURFACES — GO. T06 COMPLETE is a preparation verdict,
not issuance or production support. This is binding of closed candidates; no new
scientific/numerical decision, experiment or independent review is claimed.

## Repository convention inventory

| Convention            | Existing example                                         | Authority / evidence                                                                                                                                                                                                                                                                                                      | R4 reuse?                      | Constraint                                                             |
| --------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| Requirement IDs       | NRS-VERIFY-0025; NRS-PROFILE-ITGC-0001                   | [ID-POLICY](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/ID-POLICY.md); [REQUIREMENTS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/requirements.yaml)                                              | Grammar, single owner          | Issued meaning immutable; semantic change needs new ID, not ID version |
| Capability namespaces | R2 capability namespace candidates                       | [R2-NAMESPACES](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/requirement-namespaces.json)                                                                                                                                           | RFC BTF token                  | Register namespace before issuance; draft is not reservation           |
| Protocol identifiers  | `https://nomue.ai/id/contract/paired-t/0.1.0-draft.1`    | [ID-POLICY](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/ID-POLICY.md); [R2-IDS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/protocol-identifiers.json)                 | HTTPS family/name/revision     | Exact spelling, lowercase kebab-case, opaque revision; no dereference  |
| Check/version         | paired-t-computability and paired-t-recompute candidates | [R2-IDS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/protocol-identifiers.json); [CHECKS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/public-checks.yaml)              | Separate scoped procedures     | Comparison is check-owned, never Record-owned                          |
| Bundle                | paired-t exact candidate combination                     | [R2-IDS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/protocol-identifiers.json); [BUNDLES](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/interpretation-bundles.yaml)    | Pin exact identities           | No near-version fallback; changed binding needs successor              |
| Schemas/surfaces      | R2 closed schema candidates; PCS-0012 refusal            | [R2-IDS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/protocol-identifiers.json); [SURFACES](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/public-contract-surfaces.yaml) | New BTF schemas                | No reuse of closed ITGC result definitions                             |
| Status                | Requirement active/withdrawn; bundle EXPERIMENTAL        | [REQUIREMENTS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/requirements.yaml); [BUNDLES](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/registries/interpretation-bundles.yaml)                                 | Keep status axes separate      | Stability, implementation and task completion are not issuance         |
| Candidate distinction | R2 non_authoritative_candidate / unissued                | [R2-IDS](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-2-candidate/protocol-identifiers.json)                                                                                                                                                    | UNISSUED CANDIDATE             | A Git commit is not formal issuance                                    |
| R3                    | Unissued independent-multigroup RFC identities           | [R3](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-3-independent-multigroup-rfc.md)                                                                                                                                                              | Exact bundle/non-aliasing only | No Holm semantics imported                                             |
| Names/paths           | RFC balanced-two-factor; PCS-0014..0016                  | [RFC](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-4-preparation/opening-rfc-candidate.md)                                                                                                                                                      | Preserve BTF names             | Future paths are proposals, not current authority                      |

## Authority and issuance boundary

Authority remains with AUTHORITY.md's assigned targets and the authority manifest,
registries and bound specification anchors. R2/R3 candidate documents illustrate
preparation machinery, not R4 scientific authority. T03/T04/T05 are selected candidate
inputs and review records, not amendments to issued Protocol authority. No formal
allocation occurs here; proposed NRS IDs remain unissued and unreserved.

Check names use existing role suffixes and the RFC capability slug. This is lexical
allocation, not new meaning. BTF conformance/integrity names avoid reusing the R2
candidate identities for different surfaces. No material identity choice is open.

## Conflict and semantic-gap audit

- RFC numerical holds are historical items resolved for this candidate by T03/T04.
  The opening RFC blob remains unchanged.
- The short RFC payload summary mentions unique units; its explicit later gate table
  determines routing: repeated units are representable but inadmissible, unlike
  duplicate observation identity, which fails conformance.
- The RFC n ceiling is a safe-integer representation limit, not a standalone public
  work ceiling. J-cost controls work; old experimental ceilings do not replace it.
- The broad RFC numerical/resource placeholder is refined by T04: abstract work is
  public/check-owned; host caps are reference-only. No profile metadata is required
  in the public numerical Record.
- Positive-tail zero diagnostics are not public underflow matches. Positive subnormal
  p follows R4 rules; R2 normal-only rules are not imported.
- Generic completed indeterminate remains in the selected architecture. Eligible S-C
  normal completion has exact terminal decisions. Artificial ambiguity controls do
  not prove an unresolved S-C case. A stronger private method cannot change the same
  version's prescribed observable decision.
- RFC recomputed values apply to resolved comparisons. T04 forbids fabricated values
  for unresolved or set-based mismatch cases; conditional availability is T07 syntax.
- F-01 latched invocation failure suppresses provisional completed results even after
  successful cleanup. No completed partial pass escapes.
- Requirement meanings stay immutable on issuance; no Requirement-version mechanism
  or rewrite of existing phase-qualified requirements is introduced.

No T06 SEMANTIC GAP was found. Wire syntax, numerical reason spelling, conditional
report fields and CLI code allocation remain T07/T09 representation/interface work.
They cannot collapse refusal, error, not_run and completed indeterminate.

## Implementation gap and preservation

PR #331 controlled-execution assets are merged in pinned main. That supplies neither
issued BTF dispatch nor production S-C/all-22 integration. EC3/EC4 establishes finite
host-specific completion evidence, not whole-domain reference completion. T08 owns
limited adapter work in the shared public verifier development home; this repository
consumes pins under its contribution instructions.

Only this T06 directory is added. RFC, receipts, historical evidence, production code,
schemas, registries, Requirement anchors and bundles remain unchanged. No public
discussion post, release or automatic discussion-clock reset occurs.

## Provenance and reuse

Prepared by the task's Codex assistant from public repository inputs, 2026-09-15.
This is author coherence assessment, not independent numerical review. T05's closed
review-sufficiency disposition is reused for unchanged semantics. Exact commits,
blobs, SHA-256 values and URLs are in INPUTS.json. Historical OPEN headings retain
their original status and are interpreted alongside subsequent dispositions.

- [RFC](https://github.com/licklider-ai/nomue-protocol/blob/3880db43a64e1758494f3c78f6850daab0e3e9e9/governance/drafts/release-4-preparation/opening-rfc-candidate.md)
- [T03](https://github.com/licklider-ai/nomue-protocol/blob/cd9d780ac06a3b998ff5d4717429b0177a222fe8/governance/drafts/release-4-preparation/t03-candidate-numerical-policy-decision-20260914.md)
- [ARCH](https://github.com/licklider-ai/nomue-protocol/blob/cd9d780ac06a3b998ff5d4717429b0177a222fe8/governance/drafts/release-4-preparation/t04-candidate-execution-architecture-decision-20260914.md)
- [COST](https://github.com/licklider-ai/nomue-protocol/blob/66fa2bc201c86c62f21bb94825479427c24d8522/governance/drafts/release-4-preparation/t04-g4-budget-evidence-20260914/COST-DEFINITION.json)
- [G5](https://github.com/licklider-ai/nomue-protocol/blob/66fa2bc201c86c62f21bb94825479427c24d8522/governance/drafts/release-4-preparation/t04-g5-full-procedure-evidence-20260914/REPORT.md)
- [SUPPORT](https://github.com/licklider-ai/nomue-protocol/blob/318955dc260204328ec39acb67925e68c35d0c28/governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/SUPPORT-MAPPING.md)
- [F01](https://github.com/licklider-ai/nomue-protocol/blob/318955dc260204328ec39acb67925e68c35d0c28/governance/drafts/release-4-preparation/t04-ec3-ec4-evidence-20260914/F01-REPAIR.md)
- [T05-DECISION](https://github.com/licklider-ai/nomue-protocol/blob/cf1cbbe4cc087057302ab3144d643fa055f9e288/governance/drafts/release-4-preparation/t05-scientific-numerical-review-sufficiency-20260915/DECISION.md)
