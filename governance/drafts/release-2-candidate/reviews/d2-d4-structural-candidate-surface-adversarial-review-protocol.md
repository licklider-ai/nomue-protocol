# Release 2 D2-D4 structural candidate surface exact-head adversarial review protocol

## A. Review objective

Independently determine whether the exact PR head contains an internally consistent,
closed, collision-free, and fail-closed decision-preparation surface for Release 2
decisions R2-D2 through R2-D4:

- the paired-t Contract and paired two-condition Profile Requirement namespace
  candidates;
- the permanent HTTPS Protocol identifier candidates and exact legacy coexistence
  boundary; and
- the successor Record, Profile, execution-outcome, verification-report, bundle,
  fixture, exact-dispatch migration, and public-contract-surface candidates.

This review is intentionally cross-cutting because the three decisions are ordered
but structurally interdependent. Review preparation may run during the open RFC
window. A favorable verdict does not allocate a namespace, issue an identifier,
approve a schema or Public Check, register a bundle, enable verifier support, decide
R2-D2/R2-D3/R2-D4, close RFC #25, or complete Release 2.

## B. Exact identity and permitted delta

Review the exact PR head from a clean or equivalent isolated checkout. Record its
head, tree, sole parent, merge base, changed paths, and line delta. Confirm the live
head both before and after the review.

The expected base is the final R2-D5 review-result preservation merge:

`a57fb63c5fe067a4d64c57a27d5cd94ed76502ba`

The expected base tree is:

`b424447c7e1fe6ff64ab3c5646dd784ae60d4ece`

The review-preparation increment may add only this protocol. It must not alter any
candidate, authority, registry, schema, fixture, conformance, generated, spec,
reference, tooling, test, durable review, RFC, Release 1, or R2-D5 byte.

## C. Source identity and authority boundary

Do not trust paths or declared identifiers alone. Resolve each candidate and
validator blob from Git objects at the exact head and require the following baseline
bindings to remain byte-identical:

| Role                                 | Path                                                                                                      | Git blob SHA-1                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| D2 namespace candidates              | `governance/drafts/release-2-candidate/requirement-namespaces.json`                                       | `a5cf66d5e22045f7892df444cc38632b6eac3d12` |
| D3 identifier candidates             | `governance/drafts/release-2-candidate/protocol-identifiers.json`                                         | `fb1c27d919c670dc89f59e14ffea0d8d3b33da55` |
| D4 public-surface impact             | `governance/drafts/release-2-candidate/public-contract-surface-impact.json`                               | `fc3ad9396264358d9e9140ce4d7de1edbdca8ffe` |
| Dispatch migration matrix            | `governance/drafts/release-2-candidate/exact-dispatch-migration-matrix.json`                              | `35c191c03cd251a91c50aef4277686ab1cfb2e32` |
| Record fixture manifest              | `governance/drafts/release-2-candidate/fixtures/manifest.json`                                            | `10c9656fef00ff4fc6f62243565e1bf49d3d2322` |
| Report fixture manifest              | `governance/drafts/release-2-candidate/fixtures/output-manifest.json`                                     | `677a35b3a10922138d6b018911e2d5b5da5caafa` |
| Valid Record fixture                 | `governance/drafts/release-2-candidate/fixtures/valid-complete-pairs.json`                                | `a6425403fbe5d6d2af6ec5653ef020e2b04a0a0d` |
| Valid report fixture                 | `governance/drafts/release-2-candidate/fixtures/valid-verification-report.json`                           | `e1a7a46f151bceb499e3dcf168d40710e6f8c483` |
| Record schema candidate              | `governance/drafts/release-2-candidate/schemas/record-0.3.candidate.schema.json`                          | `182df932db005c4f5b8f204122fd042c80a050e3` |
| Profile schema candidate             | `governance/drafts/release-2-candidate/schemas/paired-two-condition-continuous-0.1.candidate.schema.json` | `84f80b3f076f01be9c6459ff7be1c1fce01fc64d` |
| Execution-outcome schema candidate   | `governance/drafts/release-2-candidate/schemas/execution-outcome-0.3.candidate.schema.json`               | `835d029229c46f51b3208c7a15003f896c728f1d` |
| Verification-report schema candidate | `governance/drafts/release-2-candidate/schemas/verification-report-0.3.candidate.schema.json`             | `90f47c8e024c6a9b300edcb001c2a76d6968590c` |
| HTTPS identifier validator           | `tooling/src/identifiers/https-identifier.ts`                                                             | `fd98ab3ce9e233f44596289fa9a29822e110b778` |
| Candidate-surface validator          | `tooling/src/spikes/release-2-candidate.ts`                                                               | `020fb491de6c601dafce53d7965e67086e1f007d` |
| HTTPS identifier tests               | `tooling/tests/https-identifier.test.ts`                                                                  | `45f47f02ea7cc0737a67fed8420d3db370f36e0c` |
| Candidate-surface tests              | `tooling/tests/release-2-candidate.test.ts`                                                               | `b6f7c28757a73a3d4c3d1505dcdee13d603416d1` |

Read `AGENTS.md`, `CHARTER.md`, `AUTHORITY.md`, the authority manifest, Requirement
registry, identifier policy, RFC process, stability-tier registry, interpretation-
bundle registry, public-check registry, public-contract-surface registry, and the
Release 2 Steward ratification package. Confirm that every reviewed candidate is
outside authoritative paths, absent from the authority manifest, marked
`non_authoritative_candidate` and `unissued`, and unused by the reference verifier.

Search all authoritative artifacts rather than a hand-selected subset. No candidate
namespace, Requirement ID, HTTPS identifier, candidate Public Check, bundle,
candidate surface ID, or future authoritative schema path may already be issued,
occupied, aliased, or treated as supported.

## D. R2-D2 Requirement namespace candidates

Independently reconstruct the registered namespace prefixes and Requirement IDs from
the authoritative registry. Require exactly:

- one Contract namespace: token `PT`, prefix `NRS-CONTRACT-PT`;
- one Profile namespace: token `PTCC`, prefix `NRS-PROFILE-PTCC`;
- six contiguous first candidate IDs `0001` through `0006` in each namespace;
- twelve distinct candidate IDs and anchors in total;
- every state `unissued`;
- every future anchor equal to its candidate ID;
- every future document under a safe, normalized `spec/` Markdown path; and
- non-empty, meaning-specific titles, meanings, and mnemonic rationales.

Verify the ADR-0032 token grammar independently. Prove no collision with any
registered prefix, issued/tombstoned Requirement ID, governance identifier, or the
existing `NRS-PROFILE-ITGC` namespace. Assess whether each token denotes one enduring
semantic owner: `PT` is Contract-specific, while `PTCC` remains Profile-specific and
does not silently mean paired-t only.

Require exact cross-reference coverage from the six new public-surface candidates to
the twelve D2 candidate IDs. Reject orphan IDs, unknown IDs, duplicate ownership,
non-contiguous allocation, future-anchor drift, unsafe paths, kind/token/prefix
mismatch, or an issuance claim.

## E. R2-D3 permanent identifier candidates

Independently parse all twelve candidate identifiers and re-run the HTTPS lexical
validator. Require exact canonical spelling under:

`https://nomue.ai/id/<family>/<name>/<revision>`

For each identifier, verify family, role, key, name, revision, spelling, semantic
owner, versioning policy, uniqueness, and `unissued` state. Attack scheme, host,
userinfo, port, query, fragment, percent encoding, dot segments, empty segments,
trailing slash, case, Unicode, malformed kebab case, revision grammar, and near-match
normalizations. Exact string identity, not URI normalization, governs equality.

Require the complete role set:

- one Contract;
- one Profile;
- four schemas;
- one Interpretation Bundle; and
- five ordered Public Checks.

Prove that no `method` identifier duplicates the paired-t Contract meaning. Confirm
the four exact legacy reuses retain their existing identifiers and meanings without
creating HTTPS aliases: JCS canonicalization, common identifier schema, routing
envelope, and verifier refusal. DNS, HTTP retrieval, redirects, and current web
content must have no interpretive role.

Reconstruct the bundle binding from identifier keys. Require one Contract, one
Profile, four schema bindings, the exact reused canonicalization identifier, five
ordered Public Checks, `attestation_support: none`, and both conformance and verifier
support states `candidate_not_registered`. Every future authoritative schema path
must be unoccupied; every exact legacy reuse path must exist.

## F. R2-D4 closed schema surface

Compile all four candidate schemas against their complete dependency graph using an
independent JSON Schema implementation where practical in addition to the repository
validator. Confirm that every candidate `$id`, `$ref`, const Contract/Profile/Check
identity, schema role, and bundle binding exactly matches the D3 candidate.

Require closed object shapes at every owned candidate object boundary. In particular,
verify:

- explicit dataset, observation, experimental-unit, pair, condition, and outcome
  identities;
- exactly two declared conditions with explicit order;
- explicit one-to-one pair membership, without position- or label-inferred pairing;
- design-to-dataset, analysis-to-design, and result-to-analysis integrity links;
- explicit grouping, independence, repeated-measurement, clustering, population,
  missingness, transformation, and weighting declarations;
- direct `analysis.contract_id` binding, with no duplicate `method_id` alias;
- first-condition-minus-second-condition direction, arithmetic mean paired-
  difference estimand, two-sided alternative, fixed 95 percent interval target, and
  paired-t declared result shape;
- finite-number and negative-zero handling consistent with the candidate boundary;
- an execution-outcome surface with exact ordered Public Check identities;
- a verification report with scoped results and explicit guarantee boundaries; and
- no overall `VERIFIED`, scientific-validity pass, attestation, approval, standardized
  effect-size, arbitrary extension, or Record-supplied code surface.

Confirm schema versions and candidate paths are consistent with the D3 binding and
that Release 1 schema bytes and dispatch behavior remain unchanged.

## G. Fixtures, relationships, dispatch, and public surfaces

Execute all ten Record fixture dispositions and all ten output fixture dispositions.
Recompute every mutation from its declared source; do not trust stored expected
outcomes without execution. Require strict pointer resolution and insertion-based
array addition. Each schema-negative case must fail for the pinned keyword, and each
schema-positive relationship case must produce exactly the pinned code set.

Independently enumerate every relationship classification emitted by the candidate
validator and compare its coverage with the fixtures. Add reviewer-owned negative
cases for pair duplication, missing mate, condition duplication, order reversal,
cross-dataset references, experimental-unit inconsistency, missing declarations,
analysis/result cross-binding, undeclared properties, sparse arrays, and boundary
numeric encodings.

Prove the migration matrix for all three legacy bundles and all three unsupported
exact-match probes against the current authoritative registry and router. A Release 2
shaped Record carrying a legacy bundle must not acquire Release 2 meaning. A legacy
Record carrying the unissued candidate bundle must be refused as unsupported. Near
identifiers must never select either surface.

Reconstruct public-contract-surface impact independently. Require:

- four exact registered-surface reuses with no meaning change;
- six collision-free, unissued new surface candidates `NRS-PCS-0014` through
  `NRS-PCS-0019`;
- nine explicit non-applicable preserved surfaces;
- every declared path to resolve through the named candidate schema;
- every candidate Requirement reference to resolve to D2 or an issued Requirement;
  and
- every breaking-change and silent-reinterpretation policy to remain explicit.

## H. Cross-artifact consistency

Build an independent graph of D2 Requirement IDs, D3 identifiers and bundle roles,
D4 schema identities and refs, fixture roots, check order, migration rows, and public
surface paths. Require no orphan, duplicate, cycle, alias, missing edge, or conflicting
semantic owner.

At minimum, verify these exact equalities in both directions:

- D2 IDs ↔ public-surface Requirement references;
- D3 schema keys ↔ schema `$id` values ↔ bundle schema bindings;
- D3 Contract/Profile keys ↔ schema const values;
- D3 Public Check order ↔ execution-outcome identities ↔ report prefix order;
- D3 bundle key/spelling ↔ migration matrix candidate bundle;
- D4 valid fixture identities ↔ schema consts and refs; and
- public-surface schema keys/paths ↔ resolvable schema nodes.

## I. Adversarial and fail-closed validation

Construct reviewer-owned mutations across every decision-bearing scalar, object, and
array. Include coherent multi-file substitutions that update a spelling or key in
several artifacts at once. A validator that checks only local agreement must not
accept a semantically different, colliding, issued, supported, aliased, open-schema,
or legacy-breaking surface.

Attack at least:

- D2 tokens, kinds, prefixes, sequence numbers, anchors, paths, meanings, rationales,
  states, order, counts, duplicates, and registry collisions;
- every D3 key, role, family, name, revision, spelling, owner, policy, legacy reuse,
  bundle key, ordered check, schema path, support state, and attestation state;
- every schema `$id`, `$ref`, const, required field, `additionalProperties` or
  `unevaluatedProperties` boundary, cardinality, enum, numeric constraint, relation
  identity, and check order;
- fixture source, mutation operation/path/value, expected schema judgment, keyword,
  relationship-code set, candidate key, order, and duplicate entry;
- every migration row, legacy schema path/ID, candidate bundle spelling, exact-match
  probe, expected refusal kind, and reason code;
- every reused, new, and non-applicable public surface, path, Requirement reference,
  state, stability, version impact, and change policy;
- early authority, issuance, support, registration, ratification, RFC closure, R2-D2,
  R2-D3, R2-D4, R2-D5, or Release 2 completion claims; and
- null, string, array, NaN, Infinity, negative zero, BigInt, function, hidden own
  properties, symbols, accessors, sparse or extended arrays, throwing proxies, cycles,
  non-plain prototypes, and undeclared keys at every callable validation surface.

Record accepted attacks as findings even when current production code cannot receive
that JavaScript shape directly; decision-preparation validators must not be cited as
fail-closed evidence outside the surface they actually validate. Require deterministic
results, zero caller-provided getter invocation, no exception leakage, and no mutation
of accepted inputs. Distinguish a validator defect from a missing validator claim.

## J. Regression and synthetic merge

Run at least:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm exec vitest run tooling/tests/https-identifier.test.ts tooling/tests/release-2-candidate.test.ts
```

Independently compile all candidate schemas and re-run the fixture, relationship,
dispatch, and path-resolution corpus. Confirm every authoritative path, registry,
schema, conformance artifact, generated file, spec, reference implementation, durable
review, Release 1 artifact, and R2-D5 artifact is byte-identical to the base.

If an execution-environment IPC or resource restriction blocks the wrapper, run every
underlying stage through an equivalent non-IPC entrypoint and require exact-head
hosted CI to be green. If main advances, construct a synthetic merge and repeat
typecheck, validation, and focused tests before the verdict.

## K. RFC and mandatory non-promotions

Independently inspect issue #25. It must remain open, its public review window must
remain open, and the earliest decision timestamp must remain:

`2026-09-25T20:52:54Z`

Require every reviewed artifact to remain non-authoritative and unissued. No
Requirement namespace or ID is allocated; no HTTPS identifier, schema, Public Check,
surface, or bundle is issued; no conformance or verifier support is registered; no
legacy identifier is aliased; no Release 1 byte or meaning changes; no R2-D2, R2-D3,
R2-D4, R2-D5, RFC, or Release 2 decision is made.

## L. Verdict and durable result

Return exactly `GO` or `NO-GO` and report BLOCKER, SHOULD-FIX, and NICE-TO-HAVE
counts.

`GO` means only:

> The exact head contains an internally consistent, independently revalidated,
> non-authoritative and unissued D2-D4 structural decision-preparation surface whose
> namespace, identifier, schema, fixture, dispatch, bundle, and public-surface
> bindings are suitable for later Steward consideration after the RFC window.

It does not approve or dispose R2-D2, R2-D3, or R2-D4.

Do not merge. If possible, retain the result on a neutral branch rooted at the exact
reviewed head by adding only:

`review-inputs/r2-d2-d4-structural-candidate-surface/REVIEW-RESULT.md`

Record the result commit, its sole parent, tree, result blob, changed paths, source
blob verification, fixture and mutation counts, regression and CI evidence, getter
count, exception-leak count, and every remaining non-promotion.
